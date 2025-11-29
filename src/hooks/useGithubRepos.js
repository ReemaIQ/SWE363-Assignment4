import { useEffect, useMemo, useState } from "react";
import { monthInputRange } from "../utils/date.js";

// lowercase + strip accents
const norm = (s) =>
    (s ?? "")
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .trim();

// split into alphanumeric tokens
const tokenize = (s) => norm(s).split(/[^a-z0-9]+/g).filter(Boolean);

// simple synonyms/aliases you can expand
const ALIASES = {
    js: ["js", "javascript"],
    ts: ["ts", "typescript"],
    react: ["react"],
    node: ["node", "express"],
};

export default function useGithubRepos(username) {
    const [rawRepos, setRawRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [query, setQuery] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [fromMonth, setFromMonth] = useState("");
    const [toMonth, setToMonth] = useState("");

    // --- fetch from GitHub API once ---
    useEffect(() => {
        if (!username) return;

        async function load() {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
                    {
                        headers: {
                            Accept: "application/vnd.github+json",
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error(`GitHub returned ${res.status}`);
                }

                const json = await res.json();
                setRawRepos(json || []);
            } catch (err) {
                console.error("GitHub API error:", err);
                setError(err.message || "Failed to load repositories.");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [username]);

    // --- build searchable / filterable index ---
    const index = useMemo(() => {
        return (rawRepos || [])
            // keep only “real-ish” projects: not forks/archived, has some info
            .filter(
                (r) =>
                    !r.fork &&
                    !r.archived &&
                    (r.description || r.language || r.stargazers_count > 0)
            )
            .map((r, idx) => {
                const pushed = r.pushed_at || r.updated_at || r.created_at;
                const pushedDate = pushed ? new Date(pushed) : null;
                const ts = pushedDate ? pushedDate.getTime() : NaN;

                const monthLabel = pushedDate
                    ? pushedDate.toLocaleString("en-US", {
                        month: "short",
                        year: "numeric",
                    })
                    : "Unknown date";

                const primaryLang = r.language || "Other";
                const stars = r.stargazers_count ?? 0;

                // for filtering we only care about language (keeps chips clean)
                const skills = [primaryLang];

                // for display we’ll show lang + stars
                const displayChips = [
                    primaryLang,
                    stars > 0 ? `★ ${stars}` : null,
                ].filter(Boolean);

                const bucketParts = [
                    r.name,
                    r.full_name,
                    r.description,
                    primaryLang,
                    monthLabel,
                ];

                const bucket = bucketParts
                    .map((x) => (x ?? "").toString())
                    .join(" ");

                const text = norm(bucket);
                const tokens = Array.from(new Set(tokenize(bucket)));

                return {
                    id: r.id,
                    repoName: r.name,
                    fullName: r.full_name,
                    description: r.description ?? "",
                    language: primaryLang,
                    stars,
                    htmlUrl: r.html_url,
                    updatedLabel: monthLabel,
                    ownerAvatar: r.owner?.avatar_url || "",
                    skills, // for filtering
                    displayChips, // for card UI

                    __text: text,
                    __tokens: tokens,
                    __ts: ts,
                    __idx: idx,
                };
            });
    }, [rawRepos]);

    // --- skill chips = languages ---
    const allSkills = useMemo(() => {
        const s = new Set();
        index.forEach((p) => (p.skills || []).forEach((k) => s.add(k)));
        return [...s].sort((a, b) => a.localeCompare(b));
    }, [index]);

    // --- apply filters + search + month range ---
    const filtered = useMemo(() => {
        // build query terms + aliases
        const baseTerms = tokenize(query);
        const expanded = new Set(baseTerms);
        baseTerms.forEach((t) => (ALIASES[t] || []).forEach((a) => expanded.add(a)));
        const terms = [...expanded];

        const [fromTS] = monthInputRange(fromMonth);
        const [, toTS] = monthInputRange(toMonth);

        const sorted = [...index].sort((a, b) => {
            if (Number.isFinite(a.__ts) && Number.isFinite(b.__ts)) return b.__ts - a.__ts;
            if (Number.isFinite(a.__ts)) return -1;
            if (Number.isFinite(b.__ts)) return 1;
            return a.__idx - b.__idx;
        });

        return sorted.filter((p) => {
            const textOk =
                terms.length === 0 ||
                terms.every((t) => {
                    if (p.__text.includes(t)) return true;
                    return p.__tokens.some((tok) => tok.startsWith(t));
                });

            const sset = new Set(p.skills || []);
            const skillsOk = selectedSkills.every((s) => sset.has(s));

            if (Number.isFinite(p.__ts)) {
                if (p.__ts < fromTS || p.__ts > toTS) return false;
            } else if (fromMonth || toMonth) {
                // user picked a range but this repo has no usable date
                return false;
            }

            return textOk && skillsOk;
        });
    }, [index, query, selectedSkills, fromMonth, toMonth]);

    return {
        loading,
        error,
        query,
        setQuery,
        selectedSkills,
        setSelectedSkills,
        fromMonth,
        setFromMonth,
        toMonth,
        setToMonth,
        allSkills,
        filtered,
    };
}

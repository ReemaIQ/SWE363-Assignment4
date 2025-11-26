import { useEffect, useMemo, useState } from "react";
import { parseMonthYear, monthInputRange } from "../utils/date.js";

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
    kfupm: ["kfupm", "king", "fahd", "university", "petroleum", "minerals"],
};

export default function useProjectFilters(allProjects) {
    const [query, setQuery] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [fromMonth, setFromMonth] = useState("");
    const [toMonth, setToMonth] = useState("");

    // Build a searchable index
    const index = useMemo(() => {
        return (allProjects || []).map((p, idx) => {
            const bucket = [
                p.title,
                p.institution,
                p.description,
                ...(p.skills || []),
            ]
                .map((x) => (x ?? "").toString())
                .join(" ");

            const text = norm(bucket);
            const tokens = Array.from(
                new Set(tokenize(bucket)) // unique tokens
            );

            return {
                ...p,
                __text: text,          // still used for includes fallback
                __tokens: tokens,      // used for robust matching
                __ts: parseMonthYear(p.date),
                __idx: idx,
            };
        });
    }, [allProjects]);

    const allSkills = useMemo(() => {
        const s = new Set();
        index.forEach((p) => (p.skills || []).forEach((k) => s.add(k)));
        return [...s].sort((a, b) => a.localeCompare(b));
    }, [index]);

    const filtered = useMemo(() => {
        // build query terms + aliases, deduped
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
            // text match:
            // each term must be found either as a substring in the whole text,
            // OR as a prefix of at least one token
            const textOk =
                terms.length === 0 ||
                terms.every((t) => {
                    if (p.__text.includes(t)) return true;
                    return p.__tokens.some((tok) => tok.startsWith(t));
                });

            // skills: ALL selected present
            const sset = new Set(p.skills || []);
            const skillsOk = selectedSkills.every((s) => sset.has(s));

            // date window
            if (Number.isFinite(p.__ts)) {
                if (p.__ts < fromTS || p.__ts > toTS) return false;
            } else if (fromMonth || toMonth) {
                return false;
            }

            return textOk && skillsOk;
        });
    }, [index, query, selectedSkills, fromMonth, toMonth]);

    // URL : state (once)
    useEffect(() => {
        const usp = new URLSearchParams(location.search);
        setQuery(usp.get("q") || "");
        setFromMonth(usp.get("from") || "");
        setToMonth(usp.get("to") || "");
        const skills = usp.getAll("skill");
        if (skills.length) setSelectedSkills(skills);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // state : URL (debounced)
    useEffect(() => {
        const id = setTimeout(() => {
            const usp = new URLSearchParams();
            if (query) usp.set("q", query);
            selectedSkills.forEach((s) => usp.append("skill", s));
            if (fromMonth) usp.set("from", fromMonth);
            if (toMonth) usp.set("to", toMonth);
            const next = `${location.pathname}?${usp.toString()}`;
            window.history.replaceState(null, "", next);
        }, 150);
        return () => clearTimeout(id);
    }, [query, selectedSkills, fromMonth, toMonth]);

    return {
        query, setQuery,
        selectedSkills, setSelectedSkills,
        fromMonth, setFromMonth,
        toMonth, setToMonth,
        allSkills,
        filtered,
    };
}

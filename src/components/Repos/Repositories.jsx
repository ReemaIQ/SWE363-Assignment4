import React from "react";
import useGithubRepos from "../../hooks/useGithubRepos.js";
import RepoFilters from "./RepoFilters.jsx";
import ProfileCard from "../ui/ProfileCard/ProfileCard.jsx";
import "../Projects/ProjectsGrid.css"; // reuse .rb-grid + heading spacing

export default function Repositories() {
    const username = "ReemaIQ";

    const {
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
    } = useGithubRepos(username);

    const items = Array.isArray(filtered) ? filtered : [];

    const hasFilters =
        (query && query.trim().length > 0) ||
        (selectedSkills && selectedSkills.length > 0) ||
        (fromMonth && fromMonth.length > 0) ||
        (toMonth && toMonth.length > 0);

    const clearAll = () => {
        setQuery("");
        setSelectedSkills([]);
        setFromMonth("");
        setToMonth("");
    };

    // starred for repos
    const [favoriteRepoIds, setFavoriteRepoIds] = React.useState([]);

    React.useEffect(() => {
        try {
            const raw = window.localStorage.getItem("rb-fav-repos");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) setFavoriteRepoIds(parsed);
            }
        } catch {
            // ignore
        }
    }, []);

    React.useEffect(() => {
        try {
            window.localStorage.setItem(
                "rb-fav-repos",
                JSON.stringify(favoriteRepoIds)
            );
        } catch {
            // ignore
        }
    }, [favoriteRepoIds]);

    const toggleRepoFavorite = (id) => {
        setFavoriteRepoIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const starredRepos = items.filter((r) => favoriteRepoIds.includes(r.id));
    const regularRepos = items.filter((r) => !favoriteRepoIds.includes(r.id));

    return (
        <section id="repos">
            <div className="repos__header">
                <h2>GitHub Repositories</h2>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="repos__clear"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            <RepoFilters
                query={query}
                setQuery={setQuery}
                allSkills={allSkills}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                fromMonth={fromMonth}
                setFromMonth={setFromMonth}
                toMonth={toMonth}
                setToMonth={setToMonth}
            />

            {loading && (
                <p
                    style={{
                        textAlign: "center",
                        opacity: 0.85,
                        marginTop: "1.2rem",
                        fontSize: "1.05rem",
                    }}
                >
                    Loading repositories from GitHub…
                </p>
            )}

            {error && !loading && (
                <p
                    style={{
                        textAlign: "center",
                        opacity: 0.9,
                        marginTop: "1.2rem",
                        fontSize: "1.05rem",
                    }}
                >
                    Couldn&apos;t load GitHub repositories right now. Please try
                    again later.
                </p>
            )}

            {!loading && !error && items.length === 0 && (
                <p
                    style={{
                        textAlign: "center",
                        opacity: 0.8,
                        marginTop: "1.2rem",
                        fontSize: "1.05rem",
                        animation: "fadeIn 0.25s ease-out",
                    }}
                >
                    No repositories match your filters or selected month range.
                </p>
            )}

            {!loading && !error && items.length > 0 && (
                <>
                    {/* Starred repos subsection for nav: #starred-repos */}
                    {starredRepos.length > 0 && (
                        <>
                            <h3
                                id="starred-repos"
                                className="projects__subheading"
                            >
                                ⭐ Starred repositories ({starredRepos.length})
                            </h3>
                            <div className="rb-grid rb-grid--starred">
                                {starredRepos.map((repo) => (
                                    <ProfileCard
                                        key={repo.id}
                                        avatar={repo.ownerAvatar}
                                        avatarAlt={`${repo.repoName} repository owner avatar`}
                                        name={repo.repoName}
                                        title={`Last updated: ${repo.updatedLabel}`}
                                        about={
                                            repo.description ||
                                            "This repository does not have a description yet."
                                        }
                                        skills={repo.displayChips}
                                        withTilt={true}
                                        isStarred={true}
                                        onToggleStar={() =>
                                            toggleRepoFavorite(repo.id)
                                        }
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    <h3 className="projects__subheading">All repositories</h3>
                    <div className="rb-grid">
                        {regularRepos.map((repo) => (
                            <ProfileCard
                                key={repo.id}
                                avatar={repo.ownerAvatar}
                                avatarAlt={`${repo.repoName} repository owner avatar`}
                                name={repo.repoName}
                                title={`Last updated: ${repo.updatedLabel}`}
                                about={
                                    repo.description ||
                                    "This repository does not have a description yet."
                                }
                                skills={repo.displayChips}
                                withTilt={true}
                                isStarred={favoriteRepoIds.includes(repo.id)}
                                onToggleStar={() =>
                                    toggleRepoFavorite(repo.id)
                                }
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

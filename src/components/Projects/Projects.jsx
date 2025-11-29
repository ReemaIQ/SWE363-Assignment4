import React from "react";
import data from "../../data/projects.json";

import useProjectFilters from "../../hooks/useProjectFilters.js";
import ProjectFilters from "./ProjectFilters.jsx";

import ProfileCard from "../ui/ProfileCard/ProfileCard.jsx";
import "./ProjectsGrid.css";

export default function Projects() {
    const {
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
    } = useProjectFilters(data);

    // starred for projects
    const [favoriteIds, setFavoriteIds] = React.useState([]);

    // load from localStorage once
    React.useEffect(() => {
        try {
            const raw = window.localStorage.getItem("rb-fav-projects");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) setFavoriteIds(parsed);
            }
        } catch {
            // ignore
        }
    }, []);

    // persist whenever it changes
    React.useEffect(() => {
        try {
            window.localStorage.setItem(
                "rb-fav-projects",
                JSON.stringify(favoriteIds)
            );
        } catch {
            // ignore
        }
    }, [favoriteIds]);

    const toggleFavorite = (id) => {
        setFavoriteIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

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

    const items = Array.isArray(filtered) ? filtered : [];

    const starredItems = items.filter((p) => favoriteIds.includes(p.id));
    const regularItems = items.filter((p) => !favoriteIds.includes(p.id));

    return (
        <section id="projects">
            <div className="projects__header">
                <h2>Projects</h2>

                {hasFilters && (
                    <button
                        type="button"
                        className="projects__clear"
                        onClick={clearAll}
                    >
                        Clear filters
                    </button>
                )}
            </div>

            <ProjectFilters
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

            {/* Starred subsection (for nav: #starred-projects) */}
            {starredItems.length > 0 && (
                <>
                    <h3
                        id="starred-projects"
                        className="projects__subheading"
                    >
                        ⭐ Starred projects ({starredItems.length})
                    </h3>
                    <div className="rb-grid rb-grid--starred">
                        {starredItems.map((p) => (
                            <ProfileCard
                                key={p.id}
                                avatar={p.img}
                                avatarAlt={p.alt || p.title}
                                name={p.title}
                                title={`${p.date} – ${p.institution}`}
                                about={p.description}
                                skills={p.skills}
                                withTilt={true}
                                isStarred={true}
                                onToggleStar={() => toggleFavorite(p.id)}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Empty state when nothing at all after filters */}
            {items.length === 0 ? (
                <p
                    style={{
                        textAlign: "center",
                        opacity: 0.8,
                        marginTop: "1.2rem",
                        fontSize: "1.05rem",
                        animation: "fadeIn 0.25s ease-out",
                    }}
                >
                    No projects match your filters or selected month range.
                </p>
            ) : (
                <>
                    <h3 className="projects__subheading">All projects</h3>
                    <div className="rb-grid">
                        {regularItems.map((p) => (
                            <ProfileCard
                                key={p.id}
                                avatar={p.img}
                                avatarAlt={p.alt || p.title}
                                name={p.title}
                                title={`${p.date} – ${p.institution}`}
                                about={p.description}
                                skills={p.skills}
                                withTilt={true}
                                isStarred={favoriteIds.includes(p.id)}
                                onToggleStar={() => toggleFavorite(p.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

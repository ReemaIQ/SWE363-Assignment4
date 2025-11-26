import React from "react";
import data from "../../data/projects.json";

import useProjectFilters from "../../hooks/useProjectFilters.js";
import ProjectFilters from "./ProjectFilters.jsx";

import ProfileCard from "../ui/ProfileCard/ProfileCard.jsx";
import "./ProjectsGrid.css";

export default function Projects() {
    const {
        query, setQuery,
        selectedSkills, setSelectedSkills,
        fromMonth, setFromMonth,
        toMonth, setToMonth,
        allSkills,
        filtered,
    } = useProjectFilters(data);

    // Are any filters active?
    const hasFilters =
        (query && query.trim().length > 0) ||
        (selectedSkills && selectedSkills.length > 0) ||
        (fromMonth && fromMonth.length > 0) ||
        (toMonth && toMonth.length > 0);

    // Quick reset for a clean slate
    const clearAll = () => {
        setQuery("");
        setSelectedSkills([]);
        setFromMonth("");
        setToMonth("");
    };

    const hasAnyProjects = Array.isArray(data) && data.length > 0;
    const items = Array.isArray(filtered) ? filtered : [];

    return (
        <section id="projects">
            <h2>Projects</h2>

            <ProjectFilters
                query={query} setQuery={setQuery}
                allSkills={allSkills}
                selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills}
                fromMonth={fromMonth} setFromMonth={setFromMonth}
                toMonth={toMonth} setToMonth={setToMonth}
            />

            {/* Empty state shown OUTSIDE the grid to avoid layout/CSS issues */}
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
                <div className="rb-grid">
                    {items.map((p) => (
                        <ProfileCard
                            key={p.id}
                            avatar={p.img}
                            avatarAlt={p.alt || p.title}
                            name={p.title}
                            title={`${p.date} – ${p.institution}`}
                            about={p.description}
                            skills={p.skills}
                            withTilt={true}
                        />
                    ))}
                </div>
            )}

        </section>
    );
}

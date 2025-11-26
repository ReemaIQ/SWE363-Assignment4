import React from "react";
import MonthRangePicker from "./MonthRangePicker.jsx";
import "./Filters.css";

export default function ProjectFilters({
                                           query, setQuery,
                                           allSkills, selectedSkills, setSelectedSkills,
                                           fromMonth, setFromMonth,
                                           toMonth, setToMonth,
                                       }) {
    const toggleSkill = (s) => {
        setSelectedSkills((prev) =>
            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
        );
    };

    const handleRangeChange = ({ start, end }) => {
        setFromMonth(start || "");
        setToMonth(end || "");
    };

    return (
        <div className="rb-filters">
            {/* Top toolbar: search + month range */}
            <div className="rb-toolbar">
                <div className="rb-input-shell">
                    <input
                        className="rb-input"
                        type="search"
                        placeholder="Search projects… (title, skills, text)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search projects"
                    />
                </div>

                <MonthRangePicker
                    start={fromMonth}
                    end={toMonth}
                    onChange={handleRangeChange}
                    label="Months"
                    minYear={2000}
                    maxYear={2100}
                />
            </div>

            {/* Skills */}
            <div className="rb-skillbar">
                <div className="rb-skillbar-label">Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {allSkills.map((s) => {
                        const pressed = selectedSkills.includes(s);
                        return (
                            <button
                                key={s}
                                type="button"
                                className="rb-chip"
                                aria-pressed={pressed}
                                onClick={() => toggleSkill(s)}
                                title={s}
                            >
                                {s}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

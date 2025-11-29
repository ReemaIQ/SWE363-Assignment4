import React from "react";
import "./ProfileCard.css";

export default function ProfileCard({
                                        avatar,
                                        avatarAlt = "Project image",
                                        name,
                                        title,   // e.g., "May 2025 – KFUPM"
                                        about,
                                        skills = [],
                                        withTilt = true,
                                        showAvatar = true,

                                        // NEW
                                        isStarred = false,
                                        onToggleStar, // () => void
                                    }) {
    const cardRef = React.useRef(null);

    const target = React.useRef({ rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 });
    const current = React.useRef({ rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 });
    const rafId = React.useRef(0);

    const animate = React.useCallback(() => {
        if (!cardRef.current) return;
        const damp = 0.12;
        current.current.rx += (target.current.rx - current.current.rx) * damp;
        current.current.ry += (target.current.ry - current.current.ry) * damp;
        current.current.tz += (target.current.tz - current.current.tz) * damp;
        current.current.tx += (target.current.tx - current.current.tx) * damp;
        current.current.ty += (target.current.ty - current.current.ty) * damp;

        cardRef.current.style.transform =
            `translate3d(${current.current.tx}px, ${current.current.ty}px, ${current.current.tz}px)
       rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg)`;

        rafId.current = requestAnimationFrame(animate);
    }, []);

    function handleEnter() {
        if (!withTilt) return;
        if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    }

    function handleMove(e) {
        if (!withTilt || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const rotateMax = 20;
        const translateMax = 8;

        const nx = (x - midX) / midX;
        const ny = (y - midY) / midY;

        const ry = nx * rotateMax;
        const rx = -ny * rotateMax;
        const tx = nx * translateMax;
        const ty = ny * translateMax;
        const tz = 12;

        target.current = { rx, ry, tz, tx, ty };

        if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    }

    function handleLeave() {
        target.current = { rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 };

        setTimeout(() => {
            cancelAnimationFrame(rafId.current);
            rafId.current = 0;
        }, 300);
    }

    React.useEffect(() => {
        return () => {
            cancelAnimationFrame(rafId.current);
            rafId.current = 0;
        };
    }, []);

    return (
        <article
            className="rb-card"
            ref={cardRef}
            onMouseEnter={handleEnter}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            <div className="rb-card__bg" aria-hidden="true" />

            {/* Star button – top right */}
            {typeof onToggleStar === "function" && (
                <button
                    type="button"
                    className={`rb-star-btn ${
                        isStarred ? "rb-star-btn--active" : ""
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar();
                    }}
                    aria-pressed={isStarred}
                    aria-label={
                        isStarred
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    {isStarred ? "★" : "☆"}
                </button>
            )}

            <div className="rb-card__content">
                {showAvatar && avatar && (
                    <img
                        className="rb-avatar"
                        src={avatar}
                        alt={avatarAlt}
                        loading="lazy"   // delays loading until near viewport
                    />
                )}


                <h3 className="rb-name">{name}</h3>
                <p className="rb-subtitle">{title}</p>
                <p className="rb-about">{about}</p>
            </div>

            <footer className="rb-footer">
                <ul className="rb-skills" aria-label="Skills">
                    {skills.map((s, i) => (
                        <li key={i} className="rb-skill">
                            {s}
                        </li>
                    ))}
                </ul>
            </footer>
        </article>
    );
}

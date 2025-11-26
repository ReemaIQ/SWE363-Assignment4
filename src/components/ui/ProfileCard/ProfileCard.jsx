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
                                    }) {
    const cardRef = React.useRef(null);     // the outer card (has perspective)

    // smooth tilt state
    const target = React.useRef({ rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 });
    const current = React.useRef({ rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 });
    const rafId = React.useRef(0);

    // animation loop
    const animate = React.useCallback(() => {
        if (!cardRef.current) return;
        const damp = 0.12; // <— smoothing (lower = smoother/slower)
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
        // kick the loop if it's not running
        if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    }

    function handleMove(e) {
        if (!withTilt || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;   // inside card
        const y = e.clientY - rect.top;

        const midX = rect.width / 2;
        const midY = rect.height / 2;

        // STRONGER movement
        const rotateMax = 20;     // degrees
        const translateMax = 8;   // px for subtle parallax

        // normalized -1..1
        const nx = (x - midX) / midX;
        const ny = (y - midY) / midY;

        // target rotation
        const ry = nx * rotateMax;
        const rx = -ny * rotateMax;

        // small parallax translate
        const tx = nx * translateMax;
        const ty = ny * translateMax;

        // subtle pop-out
        const tz = 12; // px towards viewer

        target.current = { rx, ry, tz, tx, ty };

        // ensure loop is running (robust per card)
        if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    }

    function handleLeave() {
        // return to rest + stop the loop cleanly
        target.current = { rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 };

        // let it ease back for ~200–300ms then cancel
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
            <div className="rb-card__content">
                <img className="rb-avatar" src={avatar} alt={avatarAlt} />
                <h3 className="rb-name">{name}</h3>
                <p className="rb-subtitle">{title}</p>
                <p className="rb-about">{about}</p>
            </div>
            <footer className="rb-footer">
                <ul className="rb-skills" aria-label="Skills">
                    {skills.map((s, i) => (
                        <li key={i} className="rb-skill">{s}</li>
                    ))}
                </ul>
            </footer>
        </article>
    );
}

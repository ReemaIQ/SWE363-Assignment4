import React from "react";
import "./ContactForm.css";

export default function ContactForm() {
    const [status, setStatus] = React.useState("");
    const [statusType, setStatusType] = React.useState(""); // "ok" | "error" | ""
    const [sending, setSending] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    // === 3D tilt (same behavior as other cards) ===
    const cardRef = React.useRef(null);
    const target = React.useRef({ rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 });
    const current = React.useRef({ rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 });
    const rafId = React.useRef(0);

    const animate = React.useCallback(() => {
        if (!cardRef.current) return;

        const k = 0.12; // smoothing factor
        current.current.rx += (target.current.rx - current.current.rx) * k;
        current.current.ry += (target.current.ry - current.current.ry) * k;
        current.current.tz += (target.current.tz - current.current.tz) * k;
        current.current.tx += (target.current.tx - current.current.tx) * k;
        current.current.ty += (target.current.ty - current.current.ty) * k;

        cardRef.current.style.transform =
            `translate3d(${current.current.tx}px, ${current.current.ty}px, ${current.current.tz}px)
             rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg)`;

        rafId.current = requestAnimationFrame(animate);
    }, []);

    function onEnter() {
        if (!rafId.current) {
            rafId.current = requestAnimationFrame(animate);
        }
    }

    function onMove(e) {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);  // -1..1
        const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2); // -1..1

        const ROT = 20;   // degrees
        const SHIFT = 8;  // px

        target.current = {
            rx: -ny * ROT,
            ry: nx * ROT,
            tz: 12,
            tx: nx * SHIFT,
            ty: ny * SHIFT,
        };

        if (!rafId.current) {
            rafId.current = requestAnimationFrame(animate);
        }
    }

    function onLeave() {
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

    // === form logic ===
    async function onSubmit(e) {
        e.preventDefault();
        setStatus("");
        setStatusType("");
        setErrors({});

        const fd = new FormData(e.currentTarget);
        const name = (fd.get("name") || "").trim();
        const email = (fd.get("email") || "").trim();
        const message = (fd.get("message") || "").trim();

        const err = {};
        if (!name) err.name = "Please enter your name.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = "Enter a valid email.";
        if (message.length < 10) err.message = "Write at least 10 characters.";

        if (Object.keys(err).length) {
            setErrors(err);
            setStatus("Please fix the highlighted fields.");
            setStatusType("error");
            return;
        }

        try {
            setSending(true);
            await new Promise((r) => setTimeout(r, 1200)); // simulate API
            setStatus(`Thanks, ${name}! Your message has been recorded.`);
            setStatusType("ok");
            e.currentTarget.reset();
        } catch {
            setStatus("Something went wrong. Please try again.");
            setStatusType("error");
        } finally {
            setSending(false);
        }
    }

    return (
        <section id="contact" className="cf">
            <div className="cf__container">
                <h2 className="cf__title">Contact</h2>

                {/* Socials */}
                <nav className="cf__socials" aria-label="Social links">
                    <a className="cf-chip" href="mailto:reeema.work@gmail.com" title="Email (Personal)">
                        {MailIcon()} <span>reeema.work@gmail.com</span>
                    </a>
                    <a className="cf-chip" href="mailto:s202244660@kfUPM.edu.sa" title="Email (KFUPM)">
                        {MailIcon()} <span>s202244660@kfupm.edu.sa</span>
                    </a>
                    <a
                        className="cf-chip"
                        href="https://www.linkedin.com/in/reema-ibrahim-53ba5236a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                    >
                        {LinkedInIcon()} <span>LinkedIn</span>
                    </a>
                </nav>

                {/* Tilt wrapper + glass card */}
                <div className="cf-tilt-wrap">
                    <form
                        id="contact-form"
                        noValidate
                        onSubmit={onSubmit}
                        className="cf-card"
                        aria-describedby="form-status"
                        ref={cardRef}
                        onMouseEnter={onEnter}
                        onMouseMove={onMove}
                        onMouseLeave={onLeave}
                    >
                        <div className="cf-inner">
                            <div className="cf-grid">

                                {/* NAME */}
                                <div className="cf-field">
                                    <label htmlFor="name" className="cf-label">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        className="cf-input"
                                        autoComplete="name"
                                        aria-invalid={!!errors.name}
                                    />
                                    {errors.name && <small className="cf-err">{errors.name}</small>}
                                </div>

                                {/* EMAIL */}
                                <div className="cf-field">
                                    <label htmlFor="email" className="cf-label">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="cf-input"
                                        autoComplete="email"
                                        aria-invalid={!!errors.email}
                                    />
                                    {errors.email && <small className="cf-err">{errors.email}</small>}
                                </div>

                                {/* MESSAGE */}
                                <div className="cf-field cf-field--full">
                                    <label htmlFor="message" className="cf-label">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="cf-input cf-textarea"
                                        aria-invalid={!!errors.message}
                                    />
                                    {errors.message && <small className="cf-err">{errors.message}</small>}
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="cf-actions">
                                <button className="cf-btn cf-btn--glass" disabled={sending} aria-busy={sending}>
                                    {sending ? Loader() : "Send"}
                                </button>

                                {/* STATUS MESSAGE (Success / Error) */}
                                <p
                                    id="form-status"
                                    className={`cf-status ${
                                        statusType === "ok"
                                            ? "cf-status--ok"
                                            : statusType === "error"
                                                ? "cf-status--error"
                                                : ""
                                    }`}
                                    aria-live="polite"
                                >
                                    {status}
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

/* ---- inline icons ---- */
function MailIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="cf-ico">
            <path
                fill="currentColor"
                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 6.01V6h16ZM4 18V8l8 7 8-7v10H4Z"
            />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="cf-ico">
            <path
                fill="currentColor"
                d="M6.94 8.67H4V20h2.94V8.67ZM5.47 4a1.72 1.72 0 1 0 0 3.44 1.72 1.72 0 0 0 0-3.44Zm6.53 6.13c-1.57 0-2.37.86-2.78 1.47V8.67H6.28V20h2.94v-5.77c0-1.53.96-2.41 2.14-2.41 1.1 0 1.7.72 1.7 2.41V20H16v-6.27c0-2.93-1.57-3.6-3.99-3.6Z"
            />
        </svg>
    );
}

function Loader() {
    return (
        <span className="cf-loader" role="status" aria-label="Sending">
            <span />
            <span />
            <span />
        </span>
    );
}

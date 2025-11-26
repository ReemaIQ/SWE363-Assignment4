import React from "react";
import "./ContactForm.css";

export default function ContactForm() {
    const [status, setStatus] = React.useState("");
    const [sending, setSending] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    async function onSubmit(e) {
        e.preventDefault();
        setStatus("");
        setErrors({});
        const fd = new FormData(e.currentTarget);
        const name = (fd.get("name") || "").trim();
        const email = (fd.get("email") || "").trim();
        const message = (fd.get("message") || "").trim();

        const err = {};
        if (!name) err.name = "Please enter your name.";
        if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) err.email = "Enter a valid email.";
        if (message.length < 10) err.message = "Write at least 10 characters.";
        if (Object.keys(err).length) { setErrors(err); return; }

        try {
            setSending(true);
            await new Promise(r => setTimeout(r, 1200)); // simulate API
            setStatus(`Thanks, ${name}! Your message has been recorded.`);
            e.currentTarget.reset();
        } catch {
            setStatus("Something went wrong. Please try again.");
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
                    <a className="cf-chip" href="mailto:s202244660@kfupm.edu.sa" title="Email (KFUPM)">
                        {MailIcon()} <span>s202244660@kfupm.edu.sa</span>
                    </a>
                    <a
                        className="cf-chip"
                        href="https://www.linkedin.com/in/reema-ibrahim-53ba5236a/"
                        target="_blank" rel="noopener noreferrer" title="LinkedIn"
                    >
                        {LinkedInIcon()} <span>LinkedIn</span>
                    </a>
                </nav>

                {/* Glass card */}
                <form id="contact-form" noValidate onSubmit={onSubmit} className="cf-card" aria-describedby="form-status">
                    <div className="cf-grid">
                        <div className="cf-field">
                            <label htmlFor="name" className="cf-label">Name</label>
                            <input id="name" name="name" className="cf-input" autoComplete="name" />
                            {errors.name && <small className="cf-err">{errors.name}</small>}
                        </div>

                        <div className="cf-field">
                            <label htmlFor="email" className="cf-label">Email</label>
                            <input id="email" name="email" type="email" className="cf-input" autoComplete="email" />
                            {errors.email && <small className="cf-err">{errors.email}</small>}
                        </div>

                        <div className="cf-field cf-field--full">
                            <label htmlFor="message" className="cf-label">Message</label>
                            <textarea id="message" name="message" rows="6" className="cf-input cf-textarea" />
                            {errors.message && <small className="cf-err">{errors.message}</small>}
                        </div>
                    </div>

                    <div className="cf-actions">
                        <button className="cf-btn cf-btn--glass" disabled={sending} aria-busy={sending}>
                            {sending ? Loader() : "Send"}
                        </button>
                        <p id="form-status" className="cf-status" aria-live="polite">{status}</p>
                    </div>
                </form>
            </div>
        </section>
    );
}

/* ---- inline icons ---- */
function MailIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="cf-ico">
            <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 6.01V6h16ZM4 18V8l8 7 8-7v10H4Z"/>
        </svg>
    );
}
function LinkedInIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="cf-ico">
            <path fill="currentColor" d="M6.94 8.67H4V20h2.94V8.67ZM5.47 4a1.72 1.72 0 1 0 0 3.44 1.72 1.72 0 0 0 0-3.44Zm6.53 6.13c-1.57 0-2.37.86-2.78 1.47V8.67H6.28V20h2.94v-5.77c0-1.53.96-2.41 2.14-2.41 1.1 0 1.7.72 1.7 2.41V20H16v-6.27c0-2.93-1.57-3.6-3.99-3.6Z"/>
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

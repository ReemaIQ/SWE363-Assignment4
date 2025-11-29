import React from "react";
import "../../index.css";
import "./Nav.css";

export default function Nav() {
    const [navMessage, setNavMessage] = React.useState("");
    const hideTimeoutRef = React.useRef(null);

    function scrollToSection(targetId, duration = 350) {
        const element = document.getElementById(targetId);
        if (!element) return;

        const navbarHeight = 72; // nav height
        const start = window.scrollY || window.pageYOffset;
        const targetY = element.getBoundingClientRect().top + start - navbarHeight;
        const distance = targetY - start;

        const startTime = performance.now();

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function step(now) {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration); // 0 → 1
            const eased = easeInOutQuad(t);

            window.scrollTo(0, start + distance * eased);

            if (t < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    function handleNavClick(e, targetId) {
        e.preventDefault();
        scrollToSection(targetId, 350);
    }

    // show temporary toast
    function showNavToast(message) {
        setNavMessage(message);

        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
        }

        hideTimeoutRef.current = setTimeout(() => {
            setNavMessage("");
        }, 3000); // auto-hide after 3s
    }

    // special handler for "Starred" links
    function handleStarredClick(e, type, targetId) {
        e.preventDefault();

        const storageKey =
            type === "projects" ? "rb-fav-projects" : "rb-fav-repos";

        let list = [];
        try {
            const raw = window.localStorage.getItem(storageKey);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) list = parsed;
            }
        } catch {
            // ignore parse errors
        }

        if (!Array.isArray(list) || list.length === 0) {
            const label =
                type === "projects" ? "projects" : "repositories";

            showNavToast(
                `You haven’t starred any ${label} yet. Tap the ☆ on a card to add one.`
            );
            return; // don't scroll
        }

        // there ARE starred items → scroll to section
        scrollToSection(targetId, 350);
    }

    React.useEffect(
        () => () => {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        },
        []
    );

    return (
        <>
            {/* small toast under navbar */}
            {navMessage && (
                <div className="nav-toast" role="status" aria-live="polite">
                    {navMessage}
                </div>
            )}

            <header className="navbar">
                <nav aria-label="Main navigation">
                    <ul>
                        <li>
                            <a
                                href="#hero"
                                className="Nav"
                                onClick={(e) => handleNavClick(e, "hero")}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#activities"
                                className="Nav"
                                onClick={(e) =>
                                    handleNavClick(e, "activities")
                                }
                            >
                                Activities
                            </a>
                        </li>
                        <li>
                            <a
                                href="#projects"
                                className="Nav"
                                onClick={(e) =>
                                    handleNavClick(e, "projects")
                                }
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="#starred-projects"
                                className="Nav"
                                onClick={(e) =>
                                    handleStarredClick(
                                        e,
                                        "projects",
                                        "starred-projects"
                                    )
                                }
                            >
                                Starred Projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="#repos"
                                onClick={(e) => handleNavClick(e, "repos")}
                            >
                                Repositories
                            </a>
                        </li>
                        <li>
                            <a
                                href="#starred-repos"
                                className="Nav"
                                onClick={(e) =>
                                    handleStarredClick(
                                        e,
                                        "repos",
                                        "starred-repos"
                                    )
                                }
                            >
                                Starred Repositories
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="Nav"
                                onClick={(e) =>
                                    handleNavClick(e, "contact")
                                }
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

import React from "react";
import "../../index.css";

export default function Nav() {
    function scrollToSection(targetId, duration = 350) {
        const element = document.getElementById(targetId);
        if (!element) return;

        const navbarHeight = 72; // nav is taller/shorter
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
        scrollToSection(targetId, 350); // 350ms = fast, very visible swipe
    }

    return (
        <header className="navbar">
            <nav aria-label="Main navigation">
                <ul>
                    <li>
                        <a href="#hero" className={"Nav"} onClick={(e) => handleNavClick(e, "hero")}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#activities" className={"Nav"} onClick={(e) => handleNavClick(e, "activities")}>
                            Activities
                        </a>
                    </li>
                    <li>
                        <a href="#projects" className={"Nav"} onClick={(e) => handleNavClick(e, "projects")}>
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className={"Nav"} onClick={(e) => handleNavClick(e, "contact")}>
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

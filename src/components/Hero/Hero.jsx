import React from "react";
import "./Hero.css";
import TriviaMCQ from "../Activities/TriviaMCQ.jsx";
import QuoteCard from "../Activities/QuoteCard.jsx";

import logo from "../../assets/images/R-logo.png";

export default function Hero() {
    const [now, setNow] = React.useState(new Date());

    React.useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const clock = `${hh}:${mm}:${ss}`;

    let greeting;
    const h = now.getHours();
    if (h < 12) greeting = "Good Morning, welcome to my portfolio!";
    else if (h < 18) greeting = "Good Afternoon, glad you're here!";
    else greeting = "Good Evening, thanks for visiting!";

    // Fast, visible scroll to Activities
    function scrollToSection(targetId, duration = 400) {
        const element = document.getElementById(targetId);
        if (!element) return;

        const navbarHeight = 72; // adjust navbar to taller/shorter
        const start = window.scrollY || window.pageYOffset;
        const targetY =
            element.getBoundingClientRect().top + start - navbarHeight;
        const distance = targetY - start;
        const startTime = performance.now();

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function step(nowTime) {
            const elapsed = nowTime - startTime;
            const t = Math.min(1, elapsed / duration);
            const eased = easeInOutQuad(t);
            window.scrollTo(0, start + distance * eased);
            if (t < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    function handleExploreClick() {
        scrollToSection("activities", 400);
    }

    return (
        <>
            <section id="hero" className="hero">
                <div className="hero__content">
                    <img src={logo} alt="Reema logo" className="hero-logo" />

                    <p id="clock" className="hero__clock">
                        {clock}
                    </p>

                    <p id="greeting" className="hero__greeting">
                        {greeting}
                    </p>

                    <h1 className="hero__title">Reema’s Portfolio</h1>

                    <p className="hero__tagline">
                        <span>Designing Systems That Work</span>
                        <span>and Stories That Inspire.</span>
                    </p>

                    <button
                        type="button"
                        className="hero__explore"
                        onClick={handleExploreClick}
                    >
                        Explore ↓
                    </button>
                </div>
            </section>

            {/* Activities section: Trivia + Quote cards under the hero */}
            <section id="activities" className="hero__trivia">
                <div className="hero__trivia-row">
                    <TriviaMCQ />
                    <QuoteCard />
                </div>
            </section>
        </>
    );
}

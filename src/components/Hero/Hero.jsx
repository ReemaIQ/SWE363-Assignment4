import React from "react";
import "./Hero.css";
import TriviaMCQ from "../TriviaMCQ/TriviaMCQ.jsx";

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

    return (
        <>
            <section id="hero" className="hero">
                <div className="hero__content">
                    <img src={logo} alt="Reema logo" className="hero-logo" />
                    <p id="clock" className="hero__clock">{clock}</p>
                    <p id="greeting" className="hero__greeting">{greeting}</p>
                    <h1 className="hero__title">Reema’s Portfolio</h1>
                    <p className="hero__tagline">
                        Designing Systems That Work &nbsp;&nbsp;&nbsp;&nbsp; and Stories That Inspire.
                    </p>
                    {/*<a className="cta" href="#projects">See My Work</a>*/}
                </div>
            </section>

            {/* Trivia sits right under the hero */}
            <div className="hero__trivia">
                <TriviaMCQ />
            </div>
        </>
    );
}

import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Repositories from "./components/Repos/Repositories.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./components/Hero/Hero.css";

export default function App() {
    return (
        <>
            <Navbar />
            <Hero />          {/* includes greeting/clock */}
            <main>
                <Projects />   {/* filter + sort + live search + empty state */}
                <Repositories />
                <ContactForm /> {/* validation + loading state + success/error */}
            </main>
            <Footer />
        </>
    );
}

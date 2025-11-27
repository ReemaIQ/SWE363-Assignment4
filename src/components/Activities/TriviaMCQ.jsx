import React from "react";
import "./ActivityCard.css";

export default function TriviaMCQ() {
    const [status, setStatus] = React.useState("loading");
    const [fact, setFact] = React.useState(null);
    const [choice, setChoice] = React.useState(null);
    const [isCorrect, setIsCorrect] = React.useState(null);

    async function fetchFact() {
        setStatus("loading");
        setChoice(null);
        setIsCorrect(null);
        try {
            const res = await fetch("https://uselessfacts.jsph.pl/random.json?language=en", { cache: "no-store" });
            if (!res.ok) throw new Error("Network");
            const data = await res.json();
            setFact({
                text: data?.text ?? "Honey never spoils.",
                permalink: data?.permalink ?? "https://uselessfacts.jsph.pl/",
            });
            setStatus("ready");
        } catch {
            setStatus("error");
        }
    }
    React.useEffect(() => { fetchFact(); }, []);

    function onSubmit(e) {
        e.preventDefault();
        if (!choice) return;
        setIsCorrect(choice === "True");
        setStatus("answered");
    }

    // === Card-level tilt (matches your ProfileCard pattern) ===
    const cardRef = React.useRef(null);
    const target = React.useRef({ rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 });
    const current = React.useRef({ rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 });
    const rafId = React.useRef(0);

    const animate = React.useCallback(() => {
        if (!cardRef.current) return;
        const k = 0.12; // smoothing
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
        if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    }
    function onMove(e) {
        const card = cardRef.current; if (!card) return;
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width/2)) / (r.width/2);   // -1..1
        const ny = (e.clientY - (r.top  + r.height/2)) / (r.height/2); // -1..1
        const ROT = 20, SHIFT = 8;
        target.current = {
            rx: -ny * ROT,
            ry:  nx * ROT,
            tz:  12,
            tx:  nx * SHIFT,
            ty:  ny * SHIFT,
        };
        if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    }
    function onLeave() {
        target.current = { rx: 0, ry: 0, tz: 0, tx: 0, ty: 0 };
        setTimeout(() => { cancelAnimationFrame(rafId.current); rafId.current = 0; }, 300);
    }
    React.useEffect(() => () => { cancelAnimationFrame(rafId.current); }, []);

    const disabled = status === "loading" || status === "answered";

    return (
        <div className="twrap">
            <section
                className="tcard tcard--wide"
                ref={cardRef}
                role="region"
                aria-labelledby="tcard-h2"
                onMouseEnter={onEnter}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
            >
                <div className="tcard__bg" aria-hidden="true" />

                <div className="tcontent">
                    {/* 1) Title + New Question button in one row */}
                    <header className="theader theader--row">
                        <h2 id="tcard-h2">Did You Know ?</h2>
                        <h2 id="tcard-h2">   </h2>
                        <button
                            type="button"
                            className="tbtn tbtn--glass"
                            disabled={status === "loading"}
                            onClick={fetchFact}
                        >
                            {status === "loading" ? "Loading…" : "New Question"}
                        </button>
                    </header>

                    {/* 2) Space (handled by layout gap) */}
                    {status === "error" && (
                        <div className="tstatus">
                            ⚠️ Couldn’t load a fact.
                            <button className="tbtn tbtn--glass" onClick={fetchFact}>Try again</button>
                        </div>
                    )}

                    {status === "loading" && (
                        <div className="tstatus" aria-live="polite">
                            <div className="tloader"><span></span><span></span><span></span></div>
                            <span style={{ marginLeft: 8 }}>Loading…</span>
                        </div>
                    )}

                    {(status === "ready" || status === "answered") && fact && (
                        <form className="tbody" onSubmit={onSubmit}>
                            {/* 3) Question */}
                            <p className="tstatement">{fact.text}</p>

                            {/* 4) True / False */}
                            <div className={`tchoices ${status === "answered" ? "is-disabled" : ""}`}>
                                <label className={`tchip tchip--true ${choice === "True" ? "is-selected" : ""}`}>
                                    <input
                                        type="radio"
                                        name="tf"
                                        value="True"
                                        checked={choice === "True"}
                                        onChange={() => setChoice("True")}
                                        disabled={disabled}
                                    />
                                    True
                                </label>

                                <label className={`tchip tchip--false ${choice === "False" ? "is-selected" : ""}`}>
                                    <input
                                        type="radio"
                                        name="tf"
                                        value="False"
                                        checked={choice === "False"}
                                        onChange={() => setChoice("False")}
                                        disabled={disabled}
                                    />
                                    False
                                </label>
                            </div>

                            {/* 5) Submit (moved below choices) */}
                            <button className="tbtn tbtn--glass" type="submit" disabled={!choice || disabled}>
                                Submit
                            </button>

                            {status === "answered" && (
                                <div className={`texpl ${isCorrect ? "ok" : "almost"}`} aria-live="polite">
                                    <strong>{isCorrect ? "you’re correct" : "almost there"}</strong>,&nbsp;
                                    <span>did you know that <em>{fact.text}</em>?</span>
                                    <div style={{ marginTop: 6 }}>
                                        <a className="tsrc" href={fact.permalink} target="_blank" rel="noreferrer">Source</a>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </section>
        </div>
    );

}

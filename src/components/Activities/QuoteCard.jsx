import React from "react";
import "./ActivityCard.css";
import { useQuote } from "../../hooks/useQuote.js";

export default function QuoteCard() {
    const {loading, error, text, author, refetch} = useQuote();

    // Card-level tilt
    const cardRef = React.useRef(null);
    const target = React.useRef({rx: 0, ry: 0, tz: 0, tx: 0, ty: 0});
    const current = React.useRef({rx: 0, ry: 0, tz: 0, tx: 0, ty: 0});
    const rafId = React.useRef(0);

    const animate = React.useCallback(() => {
        if (!cardRef.current) return;
        const k = 0.12;
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
        const card = cardRef.current;
        if (!card) return;
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);   // -1..1
        const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);  // -1..1

        const ROT = 20;
        const SHIFT = 8;
        target.current = {
            rx: -ny * ROT,
            ry: nx * ROT,
            tz: 12,
            tx: nx * SHIFT,
            ty: ny * SHIFT,
        };

        if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    }

    function onLeave() {
        target.current = {rx: 0, ry: 0, tz: 0, tx: 0, ty: 0};
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
        <div className="twrap">
            <section
                className="tcard tcard--wide"
                ref={cardRef}
                role="region"
                aria-labelledby="quote-card-title"
                onMouseEnter={onEnter}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
            >
                <div className="tcard__bg" aria-hidden="true"/>

                <div className="tcontent">
                    {/* Header row: title + button */}
                    <header className="theader theader--row">
                        <h2 id="quote-card-title">Quote of the Day</h2>
                        <button
                            type="button"
                            className="tbtn tbtn--glass"
                            onClick={refetch}
                            disabled={loading}
                        >
                            {loading ? "Loading…" : "New Quote"}
                        </button>
                    </header>

                    {/* Loading */}
                    {loading && (
                        <div className="tstatus" aria-live="polite">
                            <div className="tloader">
                                <span></span><span></span><span></span>
                            </div>
                            <span style={{marginLeft: 8}}>Fetching inspiration…</span>
                        </div>
                    )}

                    {/* Normal / fallback quote from the hook */}
                    {!loading && text && (
                        <div className="tbody">
                            <p className="tstatement">
                                {text}
                            </p>
                            <p className="tstatement">
                                {author && <span> - {author}</span>}
                            </p>
                        </div>
                    )}

                    {/* Only if nothing to show at all */}
                    {!loading && !text && error && (
                        <div className="texpl almost" aria-live="polite">
                            <strong>Couldn&apos;t load a fresh quote</strong>
                            <p style={{margin: "6px 0 0"}}>Please try again in a moment.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

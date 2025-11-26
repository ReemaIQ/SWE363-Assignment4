import React from "react";
import "./MonthRangePicker.css";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const ymKey = (y, m) => `${y}-${String(m).padStart(2,"0")}`;
const parseKey = (k) => { const [y,m] = (k||"").split("-").map(Number); return { y, m }; };
const cmp = (a,b) => a.localeCompare(b);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export default function MonthRangePicker({
                                             start, end, onChange,
                                             label = "Months",
                                             minYear = 2000, maxYear = 2100
                                         }) {
    const [open, setOpen] = React.useState(false);
    const anchorBtn = React.useRef(null);
    const popRef = React.useRef(null);

    // Initial year for viewport
    const now = new Date();
    const initYear = start ? parseKey(start).y
        : end   ? parseKey(end).y
            : now.getFullYear();
    const [viewYear, setViewYear] = React.useState(clamp(initYear, minYear, maxYear));

    // Range building aids
    const [pendingStart, setPendingStart] = React.useState("");
    const [hoverKey, setHoverKey] = React.useState("");

    React.useEffect(() => {
        function onDoc(e){
            if (!open) return;
            if (e.key === "Escape") { setOpen(false); return; }
            const t = e.target;
            if (anchorBtn.current?.contains(t) || popRef.current?.contains(t)) return;
            setOpen(false);
        }
        document.addEventListener("mousedown", onDoc);
        document.addEventListener("keydown", onDoc);
        return () => {
            document.removeEventListener("mousedown", onDoc);
            document.removeEventListener("keydown", onDoc);
        };
    }, [open]);

    const display = (() => {
        if (start && end) {
            const a = parseKey(start), b = parseKey(end);
            return `${MONTHS[(a.m||1)-1]} ${a.y} – ${MONTHS[(b.m||1)-1]} ${b.y}`;
        }
        if (start) {
            const a = parseKey(start);
            return `${MONTHS[(a.m||1)-1]} ${a.y}`;
        }
        return "Select month or range…";
    })();

    const liveStart = pendingStart || start || "";
    const liveEnd = end || (pendingStart && hoverKey && cmp(hoverKey, pendingStart) >= 0 ? hoverKey : "");

    const inRange = (k) => liveStart && liveEnd && cmp(k, liveStart) >= 0 && cmp(k, liveEnd) <= 0;
    const isStart = (k) => !!liveStart && k === liveStart;
    const isEnd   = (k) => !!liveEnd && k === liveEnd;

    function clickMonth(y, m){
        const k = ymKey(y,m);
        // no selection yet -> set start (keep open)
        if (!pendingStart && !start && !end) {
            onChange?.({ start: k, end: "" });
            setPendingStart(k);
            return;
        }
        // extend to range
        const anchor = pendingStart || start || "";
        if (anchor) {
            if (cmp(k, anchor) < 0) onChange?.({ start: k, end: anchor });
            else if (cmp(k, anchor) === 0) onChange?.({ start: k, end: "" });
            else onChange?.({ start: anchor, end: k });
            setPendingStart("");
            setOpen(false);
            return;
        }
        // already had a range : start over
        onChange?.({ start: k, end: "" });
        setPendingStart(k);
    }

    function clearAll(){
        setPendingStart("");
        setHoverKey("");
        onChange?.({ start: "", end: "" });
    }

    // Year list for quick jump
    const years = React.useMemo(() => {
        const arr = [];
        for (let y=minYear; y<=maxYear; y++) arr.push(y);
        return arr;
    }, [minYear, maxYear]);

    return (
        <div className="mrp">
            <label className="mrp__label">{label}</label>
            <button
                ref={anchorBtn}
                type="button"
                className="mrp__button"
                onClick={() => setOpen(o=>!o)}
                aria-haspopup="dialog"
                aria-expanded={open}
            >
                {display}
            </button>

            {open && (
                <div className="mrp__pop" role="dialog" aria-label="Month picker" ref={popRef}>
                    <div className="mrp__cal">
                        {/* HEADER : React-Calendar style (no days) */}
                        <div className="mrp__head">
                            <div className="mrp__head-group">
                                <button
                                    className="mrp__nav"
                                    type="button"
                                    aria-label="Previous decade"
                                    onClick={() => setViewYear(y => clamp(y-10, minYear, maxYear))}
                                    disabled={viewYear-10<minYear}
                                >«</button>
                                <button
                                    className="mrp__nav"
                                    type="button"
                                    aria-label="Previous year"
                                    onClick={() => setViewYear(y => clamp(y-1, minYear, maxYear))}
                                    disabled={viewYear-1<minYear}
                                >‹</button>
                            </div>

                            <div className="mrp__title">
                                <select
                                    className="mrp__yearSelect"
                                    value={viewYear}
                                    onChange={(e)=> setViewYear(clamp(parseInt(e.target.value,10), minYear, maxYear))}
                                    aria-label="Year"
                                >
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>

                            <div className="mrp__head-group">
                                <button
                                    className="mrp__nav"
                                    type="button"
                                    aria-label="Next year"
                                    onClick={() => setViewYear(y => clamp(y+1, minYear, maxYear))}
                                    disabled={viewYear+1>maxYear}
                                >›</button>
                                <button
                                    className="mrp__nav"
                                    type="button"
                                    aria-label="Next decade"
                                    onClick={() => setViewYear(y => clamp(y+10, minYear, maxYear))}
                                    disabled={viewYear+10>maxYear}
                                >»</button>
                            </div>
                        </div>

                        {/* MONTH GRID — 4 x 3, no weekdays/days */}
                        <div className="mrp__grid">
                            {MONTHS.map((m, i) => {
                                const k = ymKey(viewYear, i+1);
                                const cls = [
                                    "mrp__cell",
                                    inRange(k) ? "is-range" : "",
                                    isStart(k) ? "is-start" : "",
                                    isEnd(k)   ? "is-end"   : "",
                                ].join(" ");
                                return (
                                    <button
                                        key={k}
                                        type="button"
                                        className={cls}
                                        onClick={() => clickMonth(viewYear, i+1)}
                                        onMouseEnter={() => setHoverKey(k)}
                                        onMouseLeave={() => setHoverKey("")}
                                    >
                                        {m}
                                    </button>
                                );
                            })}
                        </div>

                        {/* FOOTER */}
                        <div className="mrp__foot">
                            <button className="mrp__clear" type="button" onClick={clearAll}>Clear</button>
                            <button className="mrp__done" type="button" onClick={()=>setOpen(false)}>Done</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

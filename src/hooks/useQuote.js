// src/hooks/useQuote.js
import React from "react";

// Single source of truth for the fallback quote
const FALLBACK_TEXT =
    "“The Noblest Art is that of Making Others Happy.”";
const FALLBACK_AUTHOR = "P.T. Barnum";

export function useQuote() {
    const [state, setState] = React.useState({
        loading: true,
        error: null,
        text: "",
        author: "",
    });

    const fetchQuote = React.useCallback(async () => {
        // mark as loading, keep previous text so UI doesn’t jump
        setState((s) => ({ ...s, loading: true, error: null }));

        // timeout helper in case API hangs
        const withTimeout = (p, ms = 3500) =>
            Promise.race([
                p,
                new Promise((_, rej) =>
                    setTimeout(() => rej(new Error("timeout")), ms)
                ),
            ]);

        try {
            const res = await withTimeout(
                fetch("https://motivational-spark-api.vercel.app/api/quotes/random")
            );

            if (!res.ok) {
                // HTTP error from server : show fallback quote + record error
                setState({
                    loading: false,
                    error: `Bad response (${res.status})`,
                    text: FALLBACK_TEXT,
                    author: FALLBACK_AUTHOR,
                });
                return;
            }

            const data = await res.json(); // { quote, author }

            setState({
                loading: false,
                error: null,
                text: data.quote || FALLBACK_TEXT,
                author: data.author || FALLBACK_AUTHOR,
            });
        } catch (e) {
            // Network / timeout / CORS → fallback quote + error
            setState({
                loading: false,
                error: e.message || "error",
                text: FALLBACK_TEXT,
                author: FALLBACK_AUTHOR,
            });
        }
    }, []);

    React.useEffect(() => {
        fetchQuote();
    }, [fetchQuote]);

    return { ...state, refetch: fetchQuote };
}

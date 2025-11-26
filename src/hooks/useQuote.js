import React from "react";

export function useQuote() {
    const [state, setState] = React.useState({ loading: true, error: null, text: "", author: "" });

    const fetchQuote = React.useCallback(async () => {
        setState(s => ({ ...s, loading: true, error: null }));
        const withTimeout = (p, ms = 3500) =>
            Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
        try {
            const res = await withTimeout(fetch("https://api.quotable.io/random"));
            if (!res.ok) {
                setState({ loading: false, error: "Bad response", text: "", author: "" });
                return;
            }
            const data = await res.json();
            setState({ loading: false, error: null, text: data.content, author: data.author });
        } catch (e) {
            setState({
                loading: false,
                error: e.message || "error",
                text: "“Simplicity—the art of maximizing the amount of work not done—is essential.”",
                author: "Agile Manifesto",
            });
        }
    }, []);

    React.useEffect(() => { fetchQuote(); }, [fetchQuote]);

    return { ...state, refetch: fetchQuote };
}

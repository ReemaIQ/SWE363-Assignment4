import React from "react";

export function useLocalStorage(key, initial) {
    const [value, setValue] = React.useState(() => {
        try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : initial; }
        catch { return initial; }
    });
    React.useEffect(() => {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
    }, [key, value]);
    return [value, setValue];
}

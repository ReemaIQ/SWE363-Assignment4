# Technical Documentation: Reema Al-Qahtani Final Personal Portfolio

This document provides a technical overview of the portfolio website's final architecture, key components, data flow, and implementation details, built using **React 18 + Vite** for **SWE 363 - Web Engineering**.

---

## 1. Architecture Overview

The portfolio is a highly modular **Single-Page Application (SPA)** architecture powered by **React 18** and optimized with **Vite**. All rendering, logic, and data interactions are handled client-side.

### 1.1 Key Architectural Principles
* **Modularity:** Strict separation of concerns (Components, Hooks, Utilities, Data) is enforced in the `/src` directory.
* **State-Driven:** All UI rendering is determined by React state, managing everything from filter selections to API responses and loading/error status.
* **Performance First:** Implemented image compression, lazy loading, and controlled component sizing to achieve high Lighthouse scores.
* **Technology Stack:** React 18, JSX, JavaScript ES6+, Modern CSS, Fetch API, `localStorage`.

### 1.2 Visual Theme & CSS Foundation
The aesthetic theme is a refined **"glassy interface"** (glass-morphism) on a dark, deep indigo background, building on the initial CSS foundation.

| Component | Selector | Initial A1 Implementation (Foundation) | Final A3 Implementation (Refinement) |
| :--- | :--- | :--- | :--- |
| **Base Color** | `body` | `background: #0b0716;` (Anchors glow layers) | Consistent base, prevents body reflow. |
| **Glow Motion** | `body::after` | Used `conic-gradient()` and `animation: folds` | Subtle motion retained; complexity reduced for performance. |
| **Navbar** | `.navbar` | `position: fixed;`, `backdrop-filter: blur(6px);` | Retained fixed position and **`backdrop-filter`** for the signature "frosted glass" effect. |
| **Responsive Units** | N/A | Hard-coded sizes. | Use of **`clamp()`** for scalable typography and layout. |



---

## 2. Component Deep Dive

All major sections are self-contained components located in `/src/components`.

### 2.1 Hero Section (`Hero.jsx`)
The entry point featuring live data using React Hooks.

| Feature | Implementation Details | State Hook |
| :--- | :--- | :--- |
| **Live Clock** | Uses `new Date()` object, formatted with `padStart(2, "0")`. | `useState` |
| **Update Loop** | **`useEffect`** hook initializes **`setInterval(..., 1000)`** with a crucial cleanup function (`return clearInterval(...)`) to prevent memory leaks and duplicate intervals. | `useEffect` |
| **Greeting Logic** | Conditional rendering based on `new Date().getHours()` (Morning/Afternoon/Evening). | `useState` |

### 2.2 API-Driven Activities Section
This section contains two distinct, independent components demonstrating robust data fetching and error handling.

#### A. Trivia Card (`TriviaTF.jsx`)
* **Endpoint:** `https://uselessfacts.jsph.pl/random.json?language=en`
* **Logic:** Manages a **multi-step state machine** (`loading`, `loaded`, `error`, `answered`).
* **Stability:** Uses a fixed `min-height` property on the container to prevent the card from expanding and collapsing, thus stabilizing the surrounding layout and avoiding DOM reflow.

#### B. Quote Card (`QuoteCard.jsx`)
* **Endpoint:** `https://motivational-spark-api.vercel.app/api/quotes/random`
* **Logic:** Fetches on mount and supports manual refresh via button click.
* **Fallback:** Displays a friendly UI message and retry option if the API call fails.



### 2.3 Repositories & Projects Filtering (`Projects.jsx`, `Repositories.jsx`)

Both sections rely on a complex, chained filtering system that is highly reusable.

#### **GitHub Repositories (`Repositories.jsx`)**
* **API Fetch:** Uses the custom hook `useGithubRepos()` to fetch real data from `https://api.github.com/users/ReemaIQ/repos`.
* **Filter Criteria:** Text search (name/description), Language chips (multi-select), Updated Month range.

#### **Core Filter Logic (`useProjectFilters.js`)**
The logic in the custom hook handles state management for the filters and performs the filtering operation:

1.  Input state is read from `localStorage` (persistence).
2.  **Filter Chaining:** The system applies filters sequentially (e.g., Starred List $\to$ Date Range $\to$ Language $\to$ Text Search) to the data array, ensuring all criteria are met simultaneously.

### 2.4 Contact Form (`ContactForm.jsx`)

Implements a full-featured validation and **simulated async submission flow**.

| Behavior | Implementation |
| :--- | :--- |
| **Validation** | Regex for email format; name/message length checks. Errors stored in `errors` state. |
| **Submission** | Intercepts default behavior (`e.preventDefault()`). Shows **"Sending..."** status. |
| **Async Simulation** | Uses **`setTimeout(..., 2000)`** to mimic a network delay before showing a success/error message. |
| **Personalized Feedback** | A success toast message is generated with the user's name (e.g., "Thank you, Reema!"). |

---

## 3. Data Handling and State Persistence

### 3.1 Custom Hook: `useLocalStorage.js`
This key hook abstracts the process of reading from and writing to the browser's `localStorage`.

* **Syntax:** `const [state, setState] = useLocalStorage(key, initialValue);`
* **Purpose:** Ensures state—such as the hero name, filter selections, and star status—persists across browser sessions.

### 3.2 Persistent State Keys
The application uses two keys to store the user's "Favorite" selections:

| Key | Component | Value Stored |
| :--- | :--- | :--- |
| `"rb-fav-projects"` | `Projects.jsx` | Array of starred project IDs (`[1, 5, 8]`) |
| `"rb-fav-repos"` | `Repositories.jsx` | Array of starred GitHub repository names |

---

## 4. Performance Optimization Summary

Optimization was a critical goal, leading to a major increase in Lighthouse scores.

| Metric | Technique Applied | Impact |
| :--- | :--- | :--- |
| **Image Loading** | **`loading="lazy"`** attribute on all non-critical images. | Significant improvement in LCP score (12.2 s $\to$ 1.1 s). |
| **Asset Size** | Compressed all `.png` sticker assets (e.g., 850 KB $\to$ 200 KB). | Reduced total page load time and network footprint. |
| **Layout Shift** | Fixed `min-height` on dynamic content cards. | Stabilized UI, improving both **Performance** and **Accessibility** scores. |
| **SEO** | Added a `robots.txt` file and meta descriptions. | Raised the Lighthouse SEO score. |



---

## 5. Maintenance and Future Development Notes

* **Breakpoints:** The primary mobile responsiveness breakpoints are set at **`600px`** and **`400px`** width in the modular CSS files.
* **External APIs:** Monitor API keys and rate limits. The current Trivia and Quote APIs are public and generally stable.
* **State Debugging:** Use React Developer Tools (browser extension) to track filter state flow within the custom hooks (`useProjectFilters`, `useGithubRepos`).
# Technical Documentation: Reema Al-Qahtani Portfolio (SWE363 - Assignment 3)

This document provides a technical overview of the enhanced, API-driven, responsive, and performance-optimized portfolio built using **React + Vite** for **SWE 363 - Web Engineering (Assignment 3)**.  
It explains the architecture, components, state management, API integrations, and improvements made over Assignment 2.

---

## 1. Architecture Overview

The application follows a **Single-Page Application (SPA)** pattern using **React 18**, bundled with **Vite** for fast dev and optimized builds.

### Key Architectural Principles
- Fully client-side rendering  
- Modular folder structure (`components/`, `hooks/`, `data/`, `utils/`)  
- State-driven rendering for all logic (filters, favorites, form feedback, trivia results)  
- External API integration (Trivia, Quotes, GitHub Repos)  
- Persistent state using `localStorage`  
- Improved mobile responsiveness and Lighthouse performance

### Technology Stack
- **React 18 (Vite)**
- **JavaScript ES Modules + Hooks**
- **HTML 5**
- **Modern CSS** (`clamp()`, `flex`, `grid`, `backdrop-filter`, responsive breakpoints)
- **Fetch API** (async/await)

### Visual Theme
A refined **glassy UI** using subtle gradients, shadows, blur effects, and soft motion.  
Consistency was improved using modular CSS and adjustments based on feedback/testing.

---

## 2. Component Deep Dive

### 2.1 Hero Section (`Hero.jsx` + `Hero.css`)
The Hero provides the first interactive experience: live clock + dynamic greeting.

| Feature | Description |
|--------|-------------|
| **Live Clock** | Uses `useEffect` + `setInterval` (with cleanup) to update every second. |
| **Greeting Logic** | Computes “Good Morning / Afternoon / Evening” based on hour. |
| **Responsive Layout** | Typography uses `clamp()` for scaling on small screens. |
| **CTA Behavior** | Smooth scrolls to Projects/Repos using anchor navigation. |

The clock and greeting were refactored to minimize re-renders and avoid duplicate intervals.

---

### 2.2 Projects Section & Filter System  
(`Projects.jsx`, `ProjectFilters.jsx`, `MonthRangePicker.jsx`, `useProjectFilters.js`)

This section implements a complete mini-query engine for local project data.

#### Features
- Live text search  
- Multi-select skill chips  
- Month range filtering (custom date parsing → timestamps)  
- Sorted output (newest → oldest)  
- Persistent starred projects (via localStorage)

#### Key Logic (in `useProjectFilters`)
- Converts `MMM YYYY` strings into timestamps  
- Chains filters instead of resetting arrays  
- Deduplicates selected skills  
- Returns both *filtered data* and *all available skill tags*

This was significantly improved over Assignment 2 with cleaner logic and stronger state isolation.

---

### 2.3 GitHub Repositories Section  
(`GithubRepos.jsx`, `useGithubRepos.js`, `RepoFilters.jsx`)

This new section integrates live external data using the **GitHub REST API**:
`https://api.github.com/users/ReemaIQ/repos ` 


| Capability | Implementation |
|-----------|-----------------|
| **API Fetch** | Performed via `useEffect`. Handles loading, error, and retry. |
| **Search + Filter** | Search by name/description, filter by language, or by updated-month. |
| **Card Rendering** | Each repo rendered as a card: name, description fallback, language, updated date. |
| **Error Handling** | Rate-limit/network issues trigger a friendly UI message. |
| **Starred** | Star/unstar with persistence via `localStorage`. |

The section reuses the same filtering architecture as Projects for design consistency.

---

### 2.4 Trivia Card  
(`TriviaTF.jsx` + `ActivityCard.css`)

The trivia card fetches live facts using:
`https://uselessfacts.jsph.pl/random.json?language=en`


| Feature | Description |
|--------|-------------|
| **API Fetch** | Fact fetched inside `useEffect` and when “New Question” is pressed. |
| **State Machine** | `status`, `fact`, `choice`, `isCorrect` manage the quiz cycle. |
| **Feedback** | Inline correctness messages + animated state transitions. |
| **Error Fallback** | Shows “Could not load fact” with retry button. |
| **Layout Stability** | Uses fixed `min-height` to prevent card jumping during reloads. |

This component is a central demonstration of asynchronous state + dynamic UI.

---

### 2.5 Quote Card  
(`QuoteCard.jsx`, `useQuote.js`)

A lightweight API integration that provides a refreshing motivational quote.

- Loads once on component mount
- Supports manual refresh
- Gracefully handles API failures
- Uses a stable card height to avoid layout shifts

---

### 2.6 Contact Form  
(`ContactForm.jsx` + `ContactForm.css`)

Implements a full validation + async submission workflow.

| Behavior | Implementation |
|---------|-----------------|
| **Validation Rules** | Name required, email regex, message length ≥ 10. |
| **Inline Errors** | Stored in `errors` state and shown per field. |
| **Async Simulation** | Uses `setTimeout` to simulate request sending. |
| **Status Messages** | `statusType: "ok" | "error"` displayed after send. |
| **Responsive Design** | Form card scales down on small devices without overflow. |

---

## 3. Design System & Responsiveness

### Core Principles
- Prevent layout shift (especially Trivia/Quote/GitHub cards)
- Keep all cards equal-width and similar height across breakpoints
- Scale typography with `clamp()`
- Ensure no component overflows horizontally

### CSS Techniques
| Technique | Purpose |
|----------|---------|
| `min-height` on dynamic cards | Prevent resize jumps when text length changes |
| `loading="lazy"` on images | Reduce initial load & improve LCP |
| Compressed PNGs | Lower network footprint |
| `grid-template-columns: repeat(auto-fit, minmax())` | Adaptive card grid |
| Media queries at 600px & 400px | Polished small-screen experience |
| `backdrop-filter` + gradients | Consistent glassy aesthetic |

All components now behave predictably across mobile, tablet, and desktop.

---

## 4. Data Handling & State Persistence

The portfolio uses several layers of state:

### 4.1 React State
Used for:
- project filters  
- repo filters  
- trivia status  
- quote loading  
- contact form errors  
- favorite toggles  
- hero clock  

### 4.2 Local Storage (via `useLocalStorage`)
Two persistent keys:

| Key | Purpose |
|-----|---------|
| `"rb-fav-projects"` | Stores starred project IDs |
| `"rb-fav-repos"` | Stores starred GitHub repos |

State sync follows this pattern:

```js
const [favProjects, setFavProjects] = useLocalStorage(
  "rb-fav-projects",
  []
);
```

This keeps the user experience consistent even after browser refreshes.

---

## 5. Performance Optimization

A major part of Assignment 3 involved improving **Lighthouse metrics**.

### Techniques Applied
- Image compression  
- Lazy loading for non-critical images  
- Removal of unused files, console logs, and leftover components  
- Optimized card layouts to prevent reflows  
- Added meta description for SEO  
- Improved robots.txt validity  
- Stabilized heights of dynamic cards to avoid layout shift  

### Lighthouse Results (Final Build)

| **Metric**       | **Before** | **After** |
|------------------|-----------:|----------:|
| Performance      | ~59        | **92–97** |
| Accessibility    | 100        | **100**   |
| Best Practices   | 100        | **100**   |
| SEO              | 83         | **92**    |
| FCP              | 6.5 s      | **0.8 s** |
| LCP              | 12.2 s     | **1.1 s** |

---

## 6. External APIs Summary

| **API** | **Endpoint** | **Usage** |
|---------|--------------|-----------|
| **Trivia API** | `https://uselessfacts.jsph.pl/random.json?language=en` | Random fact quiz |
| **Quote API** | `https://motivational-spark-api.vercel.app/api/quotes/random` | Daily motivational quote |
| **GitHub REST API** | `https://api.github.com/users/ReemaIQ/repos` | Real-time repo cards |

All APIs have error-state UI fallbacks and retry mechanisms.

---

## 7. Conclusion

This assignment significantly expanded the portfolio with:

- Three real external APIs  
- Complex filtering systems  
- Persistent favorites  
- Enhanced responsiveness  
- Serious performance improvements  
- Better error handling  
- Visually consistent, professional UI behavior  

The overall architecture is now **scalable**, **modular**, and **production-friendly**.


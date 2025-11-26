# Technical Documentation: Reema Al-Qahtani Portfolio (SWE363-Assignment 2)

This document provides a technical overview of the updated interactive portfolio website built using **React + Vite** for **SWE 363 - Web Engineering (Assignment 2)**.  
It explains the system structure, key components, and how interactivity, data handling, and visual polish were achieved.

---

## 1. Architecture Overview

The portfolio follows a **Single-Page Application (SPA)** model powered by **React** and compiled through **Vite**.  
All rendering, animations, and data interactions occur client-side.  
The project emphasizes modularity, each section (Hero, Projects, Contact Form, TriviaMCQ, etc.) lives in its own folder under `/src/components/`.

**Technology Stack:**  
- React 18 (Vite setup)  
- HTML 5 + JSX  
- Modern CSS with `clamp()`, `backdrop-filter`, and `color-mix()`  
- JavaScript (ES Modules + Hooks)  

**Theme & Aesthetic:**  
Unified “**glassy interface**” with soft light gradients and animated card motions.  
Design consistency was refined with brief AI consultations to balance tone, color, and blur intensity.

---

## 2. Component Deep Dive

### 2.1 Hero Section (`Hero.jsx` + `Hero.css`)
The Hero acts as the entry section with a real-time clock and contextual greeting.  
It reuses parts of previous React labs (e.g., the `useEffect` clock) with an improved render cleanup.

| Feature | Description |
|:---|:---|
| **Dynamic Clock** | Uses `useState` + `useEffect` to update every second via `setInterval`. A cleanup function clears the timer on unmount. |
| **Greeting Logic** | Adjusts message based on hour (`Good Morning`, `Afternoon`, `Evening`). |
| **Visual Layout** | Center-aligned logo, heading, and tagline using flexbox and responsive typography. |
| **Button** | Smooth scrolls to the Projects section using React’s anchor navigation. |

> *Note:* ChatGPT helped clarify how to avoid extra renders from multiple `useEffect` calls.

---

### 2.2 Projects Grid and Tilt Cards (`Projects.jsx`, `ProfileCard.jsx`)
Each project is displayed in a card with 3D tilt motion on hover, a custom effect built from scratch with `requestAnimationFrame`.

| Component | Description |
|:---|:---|
| **`ProfileCard.jsx`** | Handles tilt animation via continuous switch between target and current rotation states. |
| **`ProjectsGrid.css`** | Manages grid layout, spacing, and responsive column count using `auto-fit minmax()`. |
| **Search & Filter** | Controlled inputs update the grid in real time; logic fixed after debugging with AI feedback on array filter chaining. |

> *AI prompt example:* “Why does my filter return nothing when two criteria are selected?” led to correct filter.

---

### 2.3 Trivia Card (`TriviaMCQ.jsx` + `TriviaMCQ.css`)
A self-contained interactive feature that fetches facts from the **Useless Facts API** and lets users answer True/False.  
It illustrates API handling, error feedback, and dynamic styling.

| Feature | Implementation |
|:---|:---|
| **Data Fetch** | `fetch("https://uselessfacts.jsph.pl/random.json?language=en")` inside `useEffect`. |
| **State Control** | `status`, `fact`, `choice`, `isCorrect` handled with React state. |
| **Feedback** | Shows “you’re correct” / “almost there” messages with links to the source. |
| **Design** | Styled to match project cards, glassy border, subtle hover movement, centered layout. |

> *AI prompt example:* “How can I reach this effect on buttons (see image) and could you show sample code?”  
> : used to learn about `backdrop-filter` and `rgba()` balances before customizing the final design.

---

### 2.4 Contact Form (`ContactForm.jsx` + `ContactForm.css`)
The form validates user input client-side and shows inline messages without refreshing.

| Component | Behavior |
|:---|:---|
| **Validation** | Regex for email format; length check for message (≥ 10 chars). |
| **Feedback UI** | Errors display under each field; success message appears in status area. |
| **Glassy Button** | Unified styling with other components (`display:inline-flex; backdrop-filter: blur(16px);`). |
| **Social Buttons** | Added for direct contact (email + LinkedIn). |

---

## 3. Design System & Theming
The entire site uses a custom CSS variable system defined in `:root` for light and dark modes.  

| Variable | Purpose |
|:---|:---|
| `--rb-surface` | Base card background (blurred white layer). |
| `--rb-bg1`, `--rb-bg2` | Gradient colors used in radial backgrounds. |
| `--rb-text`, `--rb-subtext` | Text contrast and secondary color tones. |
| `--rb-stroke` | Border transparency and divider color. |

Animations (`@keyframes cfPulse`, `@keyframes triviaFade`) add micro-interactions without hurting performance.  
All units use `clamp()` for scalable typography.

---

## 4. Data Handling & Local Storage
A custom hook `useLocalStorage(key, initialValue)` stores light preferences like username.  
It keeps data persistent between sessions without any external library.

```js
const [username, setUsername] = useLocalStorage("username", "");

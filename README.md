# Assignment 3 - Advanced Functionality
### **Reema Ibrahim Al-Qahtani | SWE 363 | Term 251**

---

## Project Title: **Reema’s Advanced Interactive Portfolio (A3 update)**

This assignment builds on the previous portfolio (A1 & A2) and extends it with  
**API integrations, multi-step logic, state persistence, performance optimization, and documentation**.  
The entire application is implemented using **React + Vite**, following a clean, modular structure with reusable components, custom hooks, and responsive design.

---

## Feature Overview

| Category | Feature | Description |
|---------|---------|-------------|
| **API Integration** | **Trivia API** | Fetches live trivia questions with True/False answers + correctness logic + error fallback. |
| | **Quote API** | Shows a “Quote of the Day” with refresh + graceful error handling. |
| | **GitHub Repos API** | Loads real GitHub repositories for `ReemaIQ`, displays them in cards, supports search, language filtering & month filtering. |
| **Complex Logic** | **Project & Repo Filtering** | Text search, multi-select skill chips, date/month filtering, sorting by timestamp. |
| | **Favorites System** | Star/unstar items for Projects and Repos with persistent storage via localStorage. |
| | **Contact Form** | Full validation flow → inline errors → async “sending…” → success/error message. |
| | **Empty State Messages** | Auto-closing toast shown when “Starred Projects/Repos” are empty. |
| **State Management** | **React State + Effects** | Hero clock, filters, trivia choices, repo data, favorites, submission status. |
| | **Persistent Storage** | Favorites stored under `rb-fav-projects` and `rb-fav-repos` in localStorage. In addition filtering choices (in projects or GitHub repositories are also saved to local storage|
| **Performance** | **Image Compression** | All hero/project stickers compressed (e.g., 850 KB → 200–300 KB). |
| | **Lazy Loading** | Non-critical images use `loading="lazy"` for faster load. |
| | **CSS/JS Cleanup** | Removed unused files, console logs, and heavy assets. |
| | **Lighthouse Optimization** | Performance improved from **59 → 92–97**, Accessibility 100, Best Practices 100. |
| **Responsiveness** | **Mobile Fixes** | Cards resize properly, Trivia/Quote no longer squish, Navbar & sections no overflow. |
| **AI Innovation** | **ChatGPT** | Used for architecture discussions, debugging, styling ideas, and documentation phrasing. |

---

## Structure

```
SWE363-Assignment3/
├── .idea/
│   ├── .gitignore
│   ├── other files etc.
│
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
│
├── node_modules/
│
├── public/
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── book stkr.png
│   │       ├── club stkr.png
│   │       ├── danger stkr.png
│   │       ├── excel stkr.png
│   │       ├── kfupm stkr.png
│   │       ├── ML stkr.png
│   │       ├── R-logo.png
│   │       ├── ScreenShot 1.png
│   │       ├── ScreenShot 2.png
│   │       ├── ScreenShot 3.png
│   │       ├── soccer stkr.png
│   │       └── ticket stkr.png
│   │
│   ├── components/
│   │   ├── Activities/
│   │   │   ├── ActivityCard.css
│   │   │   ├── QuoteCard.jsx
│   │   │   └── TriviaTF.jsx
│   │   │
│   │   ├── ContactForm/
│   │   │   ├── ContactForm.css
│   │   │   └── ContactForm.jsx
│   │   │
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── Hero/
│   │   │   ├── Hero.css
│   │   │   └── Hero.jsx
│   │   │
│   │   ├── Navbar/
│   │   │   ├── Nav.css
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── Projects/
│   │   │   ├── Filters.css
│   │   │   ├── MonthRangePicker.css
│   │   │   ├── MonthRangePicker.jsx
│   │   │   ├── ProjectFilters.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── ProjectsGrid.css
│   │   │
│   │   ├── Repos/
│   │   │   ├── RepoFilters.jsx
│   │   │   └── Repositories.jsx
│   │   │
│   │   │
│   │   └── ui/
│   │       └── ProfileCard/
│   │           ├── ProfileCard.css
│   │           └── ProfileCard.jsx
│   │
│   ├── data/
│   │   └── projects.json
│   │
│   ├── hooks/
│   │   ├── useGithubRepos.js
│   │   ├── useLocalStorage.js
│   │   ├── useProjectFilters.js
│   │   └── useQuote.js
│   │
│   ├── utils/
│   │   └── date.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js


```

---

## Key Components & Logic

### **1. TriviaTF - Live API Quiz**
- Fetches a random fact from the **Useless Facts API**.
- Tracks user choice + correctness.
- Handles error, loading, retry.
- Stores question state until the user answers.

### **2. Quote of the Day**
- Fetches a daily quote with a clean UI.
- Allows manual refresh.
- Shows fallback message on failure.

### **3. GitHub Repositories Section**
- Fetches real repos using GitHub REST API.
- Renders:
  - name  
  - description  
  - main language  
  - last updated  
- Supports:
  - Search
  - Language filter
  - Month filter
  - Sorting (newest → oldest)
- Gracefully handles rate-limit and network errors.

### **4. Contact Form - Full Validation + Async Flow**
- Inline errors for name/email/message.
- Regex-based email validation.
- Simulated async API call (`setTimeout`).
- Shows “sending…”, then success/fail message.

### **5. Favorites (Projects & Repos)**
- ☆ / ★ toggle on each card.
- Starred sections appear on top.
- Stored in localStorage (persists across refresh).
- Auto-toast when no favorites exist.


---

## Technologies Used
- **React 18 + Vite**
- **HTML5 / CSS3 / JavaScript (ES6+)**
- **Glass-morphism** and responsive design
- **Fetch API** and **local storage**
- **AI assistance:** ChatGPT


---

## Performance Improvements

### Image Optimization
- Compressed heavy PNG stickers from ~850 KB → ~200–330 KB.
- Hero R-logo compressed from 146 KB → 42 KB.

### Lazy Loading
```html
<img src={avatar} alt="avatar" loading="lazy" />
```

## Lighthouse Results (Final Build)

| **Metric**       | **Before** | **After** |
|------------------|-----------:|----------:|
| Performance      | ~59        | **92-97** |
| Accessibility    | 100        | **100**   |
| Best Practices   | 100        | **100**   |
| SEO              | 83         | **92**    |
| FCP              | 6.5 s      | **0.8 s** |
| LCP              | 12.2 s     | **1.1 s** |

---


##  How to Run Locally


### 1. Clone repository
`git clone https://github.com/ReemaIQ/SWE363-Assignment3`
`cd SWE363-Assignment3`

### 2. Install dependencies
`npm install`

### 3. Start development server
`npm run dev`

Open your browser to **[http://localhost:5173/](http://localhost:5173/)**.

---

## AI Usage Summary

| Tool | Purpose | Outcome |
|------|----------|----------|
| **ChatGPT** | Helped debug mobile responsiveness, overlapping cards, unstable Trivia card height, and Lighthouse/SEO issues | Improved layout stability, performance scores, and polished UI behavior |
| **ChatGPT** | Clarified API usage (GitHub REST, Trivia API), naming (toast messages), and async patterns | Enabled cleaner API integration and consistent UI feedback components |
| **AI Assistance in Documentation** | Converted sections into Markdown, structured tables, refined README phrasing | Produced cleaner, more professional project documentation |


See **`docs/ai-usage-report.md`** for detailed examples of prompts, explanations, and takeaways.


---

## Learning Outcomes

- Building multi-step interaction flows (filtering systems, validation, persistence)
- Implementing live external APIs with robust error handling
- Deepening understanding of React hooks, async fetches, and derived state
- Applying performance optimization techniques (compression, lazy loading)
- Writing clean documentation for professional software delivery

---

## Author

**Reema Ibrahim Al-Qahtani**  
Software Engineering Student : KFUPM  
📧 [Reeema.work@kfupm.edu.sa](mailto:Reeema.work@kfupm.edu.sa)  
📧 [s202244660@kfupm.edu.sa](mailto:s202244660@kfupm.edu.sa)  
🔗 [LinkedIn](https://www.linkedin.com/in/reema-ibrahim-53ba5236a/) | [GitHub](https://github.com/ReemaIQ)

---

## License

This project is part of **SWE 363 - Web Engineering (Assignment 3)**.  
All assets and APIs are used for educational purposes only.

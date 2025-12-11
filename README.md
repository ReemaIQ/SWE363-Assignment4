# Assignment 4 - Final Personal Portfolio
### **Reema Ibrahim Al-Qahtani | SWE 363 | Term 251**



This assignment builds on the previous portfolio (Assignments 1,2, & 3).
This project is the final version of a personal portfolio website for a Software Engineering student at KFUPM.

Developed using **React 18 and Vite**, this application is a dynamic, high-performance showcase that blends professional design with advanced web engineering concepts. It serves as a professional introduction to potential collaborators and recruiters, demonstrating proficiency in modern frontend development, API integration, and performance optimization.


---

## Key Features & Functionality
This portfolio features a rich set of interactive and data-driven components:

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Data Integration** | **GitHub Repos API** | Loads live repositories from the `ReemaIQ` GitHub account with dynamic filtering and search. |
| | **Trivia & Quote APIs** | Interactive **True/False Trivia** and a refreshable **"Quote of the Day"** with robust error handling. |
| **Complex Logic** | **Project & Repo Filtering** | Full-featured filtering system by text, skills/language chips, and month range, with persistent state. |
| | **Favorites System** | Persistent **Star/Unstar** functionality for projects and repos using **`localStorage`**. |
| | **Contact Form** | Complete validation flow (inline errors, simulated async "sending..." state, success/fail feedback). |
| **Performance** | **Lighthouse Optimization** | Significant performance improvement (**92-97 score**) through image compression and lazy loading. |
| **Design/UX** | **Glass-morphism** | Unified, modern aesthetic using translucent, frosted design elements. |
| | **Dynamic Hero** | Real-time digital clock and a dynamic greeting based on the time of day. |
| | **Responsiveness** | Fully optimized for mobile and desktop, ensuring proper resizing and no overflows. |

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

* **Frontend:** **React 18** (with Hooks and functional components)
* **Build Tool:** **Vite**
* **Web Standards:** **HTML5, CSS3, JavaScript (ES6+)**
* **Data Handling:** **Fetch API** (for all external integrations), **`localStorage`** (for state persistence)
* **Design:** **Glass-morphism** principles, fully responsive CSS.
* **Assistance:** **ChatGPT** (architecture, debugging, API clarification), **GitHub Copilot** (code completion).


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
`git clone https://github.com/ReemaIQ/SWE363-Assignment4`
`cd SWE363-Assignment4`

### 2. Install dependencies
`npm install`

### 3. Start development server
`npm run dev`

Open your browser to **[http://localhost:5173/](http://localhost:5173/)**.

---

## AI Usage Summary

AI tools were leveraged as advanced learning aids and collaborators, enhancing both development and documentation.

| Tool | Purpose | Outcome |
| :--- | :--- | :--- |
| **ChatGPT** | Architecture, complex debugging (mobile layout, unstable components), API integration logic, styling ideas. | Improved layout stability, performance scores, and cleaner API handling. |
| **GitHub Copilot** | Inline code completions for JSX, CSS, and repetitive tasks. | Simplified and accelerated the coding process. |
| **Documentation** | Structuring tables, refining project descriptions, and ensuring professional Markdown format. | Produced clearer, more readable project documentation. |


See **`docs/ai-usage-report.md`** for detailed examples of prompts, explanations, and takeaways.


---

## Learning Outcomes

* Mastery of building **multi-step interaction flows** (filtering systems, persistent favorites, validation).
* Implementing **live external APIs** with robust error handling and loading states.
* Deepening understanding of **React hooks**, derived state, and asynchronous data fetching.
* Applying **performance optimization** techniques (compression, lazy loading) for a professional product.
* Practicing responsible use of AI tools for creativity and productivity.

---

## Author

**Reema Ibrahim Al-Qahtani**  
Software Engineering Student : KFUPM  
📧 [Reeema.work@kfupm.edu.sa](mailto:Reeema.work@kfupm.edu.sa)  
📧 [s202244660@kfupm.edu.sa](mailto:s202244660@kfupm.edu.sa)  
🔗 [LinkedIn](https://www.linkedin.com/in/reema-ibrahim-53ba5236a/) | [GitHub](https://github.com/ReemaIQ)

---

## License

This project is part of **SWE 363 - Web Engineering (Assignment 4)**.  
All assets and APIs are used for educational purposes only.

# Assignment 2 — Interactive Features  
### **Reema Ibrahim Al-Qahtani | SWE 363 | Term 251**

---

## Project Title: **Reema’s Interactive Portfolio**

This project builds on the Assignment 1 portfolio and focuses on adding **interactivity**, **data handling**, and **AI-assisted improvements** to create a dynamic, user-centered web experience.  
Developed with **React + Vite**, the application demonstrates real-time content, API integration, and smooth visual motion.

---

## Features Overview

| Category | Feature | Description |
|-----------|----------|-------------|
| **Dynamic Content** | Live Clock + Greeting | The Hero section greets the visitor dynamically based on the time of day. |
| | Trivia Card | Fetches random facts from a public API (`https://uselessfacts.jsph.pl/`) with a True/False quiz and animated feedback. |
| | Search & Filter | Allows users to search or filter projects by date or skill tags. |
| **Data Handling** | API Integration | TriviaMCQ uses `fetch()` to retrieve live data, with proper loading and error states. |
| | Form Handling | The Contact Form validates user input, displays inline feedback, and resets on successful submission. |
| **Animations & Transitions** | Tilt + Blur Effects | Each card features 3-D tilt animation with smooth damping and glass-morphism design. |
| | Button & Hover States | All interactive elements share unified glass buttons with subtle motion and shadows. |
| **Error Handling & Feedback** | Retry + Loading | Clear “Loading…” spinner and retry option if the API call fails. |
| | Validation | Friendly inline prompts for missing or invalid form fields. |
| **AI Enhancement** | **ChatGPT** | Clarified component logic, guided layout structure, and explained debugging steps | Improved understanding and integration confidence |
| **GitHub Copilot** | Offered inline JSX/CSS completions | Simplified repetitive coding tasks |

---

## Structure

```
SWE363-Assignment2/
├── .idea/
│   ├── .gitignore
│   ├── material_theme_project_new.xml
│   ├── modules.xml
│   ├── SWE363-Assignment2.iml
│   ├── vcs.xml
│   └── workspace.xml
│
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
│
├── node_modules/
│
├── public/
│   └── vite.svg
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
│   │       ├── ticket stkr.png
│   │       └── react.svg
│   │
│   ├── components/
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
│   │   ├── TriviaMCQ/
│   │   │   ├── TriviaMCQ.css
│   │   │   └── TriviaMCQ.jsx
│   │   │
│   │   └── ui/
│   │       └── ProfileCard/
│   │           ├── ProfileCard.css
│   │           └── ProfileCard.jsx
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   ├── data/
│   │   └── projects.json
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useProjectFilters.js
│   │   └── useQuote.js
│   │
│   ├── utils/
│   │   └── date.js
│   │
│   ├── App.css
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


## Key Components

| Component | Purpose |
|------------|----------|
| **Hero.jsx** | Displays greeting, live clock, and CTA link. |
| **TriviaMCQ.jsx** | Interactive True/False trivia card using API data. |
| **ProfileCard.jsx** | Displays project info with tilt and hover effects. |
| **ContactForm.jsx** | Handles input validation and form submission feedback. |

---

## Technologies Used
- **React 18 + Vite**
- **HTML5 / CSS3 / JavaScript (ES6+)**
- **Glass-morphism** and responsive design
- **Fetch API** and **local storage**
- **AI assistance:** ChatGPT, GitHub Copilot

---

##  How to Run Locally


### 1. Clone repository
`git clone https://github.com/<your-username>/assignment-2.git`
`cd assignment-2`

### 2. Install dependencies
`npm install`

### 3. Start development server
`npm run dev`

Open your browser to **[http://localhost:5173/](http://localhost:5173/)**.

---

## AI Usage Summary

| Tool | Purpose | Outcome |
|------|----------|----------|
| **ChatGPT** | Provided guidance on setup, visual effects, and small debugging issues | Helped clarify concepts and refine design consistency |
| **GitHub Copilot** | Suggested minor code completions while writing JSX and CSS | Improved typing flow and reduced repetitive work |
| **AI Assistance in Documentation** | Helped organize and format this README and technical docs | Ensured cleaner Markdown structure and readability |

See **`docs/ai-usage-report.md`** for detailed examples of prompts, explanations, and takeaways.


---

## Learning Outcomes

- Deepened understanding of **React hooks**, `useEffect`, and state flow  
- Practiced **asynchronous data fetching** and graceful error handling  
- Applied **UI/UX motion principles** and unified visual design  
- Learned to use **AI tools responsibly** for creativity and productivity  

---

## Author

**Reema Ibrahim Al-Qahtani**  
Software Engineering Student : KFUPM  
📧 [Reeema.work@kfupm.edu.sa](mailto:Reeema.work@kfupm.edu.sa)  
📧 [s202244660@kfupm.edu.sa](mailto:s202244660@kfupm.edu.sa)  
🔗 [LinkedIn](https://www.linkedin.com/in/reema-ibrahim-53ba5236a/) | [GitHub](https://github.com/ReemaIQ)

---

## License

This project is part of **SWE 363 - Web Engineering (Assignment 2)**.  
All assets and APIs are used for educational purposes only.

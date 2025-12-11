# AI Usage Report: Advanced Interactive Portfolio (Final Version - Assignment 4)

This report documents the use of Large Language Models (LLMs), primarily **ChatGPT** and **Gemini** (accessed via web interfaces), and **GitHub Copilot** throughout the development of the multi-phase portfolio website project (SWE 363 Assignments 1, 2, and 3).

The AI tools were instrumental as advanced learning aids, collaborators in debugging, and assistants in refining design and documentation. All final code structure, core logic, and artistic vision were verified, implemented, and owned by the author.

---

## Tools Used

| Tool | Primary Use | Access Method |
| :--- | :--- | :--- |
| **ChatGPT** | Guidance, Debugging Reasoning, Design/CSS principles, Documentation formatting. | Browser |
| **Gemini** | Guidance, Code clarification, Tagline exploration. | Browser |
| **GitHub Copilot** | Inline code completion for JSX, CSS, and repetitive tasks. | IDE (WebStorm) |

---

## 🔬 Specific Areas of AI Assistance

### 1. Architectural & Setup Guidance (A1, A2)

| Area | Description | Outcome |
| :--- | :--- | :--- |
| **Vite/React Setup** | Clarified initial steps for setting up the **Vite + React** environment and best practices for folder structure and component import resolution. | Ensured clean project setup and modular component architecture. |
| **Component Integration** | Provided tips on keeping dynamic features (like the live clock) efficient, specifically using `useEffect` with proper cleanup to prevent double-updates. | Improved performance and deepened understanding of React hooks and state flow. |
| **API Endpoints** | Confirmed correct URLs and structure for the external services used (Trivia, Quote, and GitHub REST APIs). | Enabled successful, structured integration of all external data sources. |

### 2. Design, Aesthetics, and Responsiveness (A1, A3)

| Area | Description | Outcome |
| :--- | :--- | :--- |
| **Initial Background** | Generated initial CSS for complex backgrounds (e.g., deep indigo/neon glow) using `radial-gradient` and `conic-gradient` techniques. | The generated code served as a baseline, which the author heavily customized for final colors and animations. |
| **Glass-morphism** | Explained the principles and necessary CSS properties (`backdrop-filter`, subtle shadows) to achieve a unified, consistent "glassy" feel across cards, forms, and the navigation bar. | Ensured visual consistency and modern aesthetic across the portfolio. |
| **Mobile Debugging** | Helped reason through complex responsiveness issues (e.g., card overlapping, content shifting) and suggested refining media queries, using `min-height`, and stabilizing flexbox alignment. | Improved mobile compatibility and achieved a stable, professional UI behavior on all screen sizes. |

### 3. Debugging, Logic, and Performance Optimization (A2, A3)

| Area | Description | Outcome |
| :--- | :--- | :--- |
| **Complex Filters** | Assisted in fixing the logic for multi-select project filtering, pointing out the need to chain filters instead of resetting the results array on each selection. | Corrected core logic in the filtering system. |
| **Dynamic Reflow** | Diagnosed UI instability (e.g., Trivia card expanding when content changed, forcing neighboring cards to shift) and suggested techniques like fixed `min-height` to prevent unnecessary DOM reflow. | Polished the final UI, eliminating jarring layout shifts. |
| **Lighthouse Improvement** | Provided strategies for boosting performance scores, including image compression, applying `loading="lazy"`, and optimizing Largest Contentful Paint (LCP) and First Contentful Paint (FCP). | **Directly contributed to the Performance score rising from ~59 to 92–97.** |
| **UI Feedback Elements** | Clarified the terminology and provided a minimal structure for a reusable **self-disappearing toast** notification system for empty states and form submissions. | Enabled clean, professional user feedback mechanisms. |

### 4. Documentation and Content Refinement (All Assignments)

| Area | Description | Outcome |
| :--- | :--- | :--- |
| **README Structure** | Provided guidance on the essential components of a professional technical README (Tech Stack, Structure, Setup, Usage, etc.). | Ensured the project documentation is comprehensive and industry-standard. |
| **Markdown & Formatting** | Assisted in converting long text sections and lists into clean, standardized Markdown formats (e.g., tables, code blocks, clean headings). | Produced highly organized and readable project documentation. |
| **Writing Tone** | Helped refine project summaries and the "About Me" section to ensure the language was concise, professional, and impactful. | Improved the overall quality and polish of the portfolio's textual content. |

---

## Author's Declaration

The AI tools served as powerful instructional resources and collaborative partners. The final structure, artistic vision, implementation details, and verification of all code and logic were designed, reviewed, and executed by the author, **Reema Ibrahim Al-Qahtani**. The solutions suggested by the AI were always adapted and integrated through the author's own understanding and testing.

---

## 👤 Author

**Reema Ibrahim Al-Qahtani**
* Software Engineering Student - KFUPM
* **Email:** [Reeema.work@kfupm.edu.sa](mailto:Reeema.work@kfupm.edu.sa)
* **LinkedIn:** [Reema Ibrahim](https://www.linkedin.com/in/reema-ibrahim-53ba5236a/)
* **GitHub:** [ReemaIQ](https://github.com/ReemaIQ)

---

## 📄 License
This project was completed for **SWE 363 - Web Engineering (Term 251)**. All assets, visuals, and code were created for academic use.

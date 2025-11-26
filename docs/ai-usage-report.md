# AI Usage Report: Interactive Portfolio Website (SWE363–Assignment 2)

This report reflects how AI tools, mainly **ChatGPT** and **GitHub Copilot**, supported the development of my interactive portfolio website for **SWE 363 - Web Engineering**.  
I used them mostly for quick clarifications, design feedback, and fine-tuning.


---

## Tools Used
- **ChatGPT** : accessed through a browser for guidance and debugging.  
- **GitHub Copilot** : offered minor autocompletion help in *WebStorm* while I wrote JSX and CSS.  

---

## Areas of Assistance

### 1. Project Setup & Organization
Early on, I asked ChatGPT a few small questions to confirm setup steps for a **Vite + React** environment and how folder structures typically flow.  
It clarified where to place files like `main.jsx` and how component imports get resolved.  
From there, I adjusted everything to my own preference.

> **Sample prompt:**  
> “Can you walk me through how Vite automatically connects index.html to the React entry file?”

---

### 2. Component Integration & Reuse
I reused some pieces from older React labs and small projects (like dynamic greetings and filters) and assignment1.  
When I combined them into one Hero section, I asked for tips on keeping the clock update efficient.  
ChatGPT explained how to limit intervals and cleanup effects.

> **Sample prompt:**  
> “Why does my clock keep updating twice even though I’m using useEffect? What’s the clean fix?”

The clarification given was enough to be able to refactore it and learn more about how hooks trigger.

---

### 3. Testing & Cleaning Experimental Features
I briefly experimented with a **Liquid Ether** background effect on a separate branch.  
It did't look as expected and caused performance drops when combined with the tilt motion.  
AI helped me figure out how to remove the feature cleanly and reset my repo without affecting imports or styles.

> **Sample prompt:**  
> “What’s the simplest way to remove a test component and revert my branch safely in Git?”

---

### 4. Visual Consistency & Glassy Design
AI was useful for polishing the visual side, mostly CSS tweaks.  
I wanted all cards, forms, and buttons to share the same “glassy” feel.  
ChatGPT explained how `backdrop-filter`, `color-mix()`, and light shadows could create that look.  

> **Sample prompt:**  
> “How can I reach this effect on buttons (see image) and could you show sample code?”

After seeing an example, I customized the gradients, radii, and transitions myself to match the rest of the portfolio.

---

### 5. Debugging & Logic Fixes
During testing, my search bar filtered correctly by one tag but failed when two were active.  
I asked AI for a second opinion on the logic, it pointed out that I was resetting the array each time instead of chaining filters.  
That hint was enough to spot the issue and fix it right away.

> **Sample prompt:**  
> “If multiple filters reset the results array, how should I combine them properly in JavaScript?”

---

### 6. Writing & Documentation
When the project wrapped up, I used AI mostly for small writing tasks, polishing Markdown and making sections consistent across the **README** and **AI Usage Report** files.  
I already had the content written but wanted it to look structured and clean.

> **Sample prompt:**  
> “Turn this Report (Report attached) into .md Markdown”

It helped me with layout and headings, not the content itself.

---

## Takeaways
- Improved my understanding of **React hooks**, **state flow**, and **CSS effects** through brief AI explanations.  
- Learned how to integrate older components smoothly instead of starting from scratch.  
- Used AI mostly as a quick reference, it guided reasoning.  
- Became more confident writing clear Markdown documentation and organized commits.  

---

## Author

**Reema Ibrahim Al-Qahtani**  
Software Engineering Student : KFUPM  
📧 [Reeema.work@kfupm.edu.sa](mailto:Reeema.work@kfupm.edu.sa)  
📧 [s202244660@kfupm.edu.sa](mailto:s202244660@kfupm.edu.sa)  
🔗 [LinkedIn](https://www.linkedin.com/in/reema-ibrahim-53ba5236a/) | [GitHub](https://github.com/ReemaIQ)

---

## License
This project was completed for **SWE 363 – Web Engineering** (Assignment 2).  
All assets, visuals, and code were created for academic use.

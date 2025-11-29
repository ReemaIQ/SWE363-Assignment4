# AI Usage Report: Advanced Interactive Portfolio (SWE363 - Assignment 3)

This report documents how I used **ChatGPT** as a development assistant during Assignment 3 of **SWE 363 - Web Engineering**.  
I relied on AI mainly for clarification, debugging ideas, responsiveness improvements, and polishing documentation.  
All architectural and implementation decisions were ultimately made by me.

---

## Tools Used
- **ChatGPT**: Used through the browser for guidance, debugging reasoning, and help breaking down problems.

---

## Areas of Assistance

### 1. Responsiveness & Mobile Layout Fixes
One recurring issue was that some components (Trivia card, Quote card, and the Repo/Project cards) behaved unpredictably on small screens.  
I used ChatGPT to help reason through responsive strategies, container flex rules, and preventing unwanted resizing.

> **Sample prompts:**  
> • “How do I make the web page more mobile / small-screen compatible?”  
> • “Why are my cards overlapping on small screens? What CSS causes this?”  
> • “When I press ‘New Question’, why does the trivia card change height and force the quote card to resize too?”

From these explanations, I refined my media queries, ensured consistent `.rb-card` min-heights, and stabilized the layout.

---

### 2. Bug Diagnosis & Component Behavior
Some UI behaviors did not look professional - especially the Trivia card expanding when the text length changed, causing neighboring cards to shift.  
ChatGPT helped me understand why dynamic content affects card height, and suggested techniques such as:

- fixed `min-height` for dynamic cards  
- preventing reflow by stabilizing padding/spacing  
- using flexbox alignment to isolate card changes  

This helped me polish the final UI behavior.

> **Sample prompt:**  
> “How do I stop one card from resizing the whole row when its content changes?”

---

### 3. API Integration Clarifications
I used three external APIs in Assignment 3, and occasionally needed quick clarifications about best practices, structure, and naming conventions.

> **Sample prompts:**  
> • “What API is used for GitHub repos? Can you confirm the REST endpoint?”  
> • “Is it okay to filter GitHub repos on the client side or should I use query params?”  
> • “What’s the exact trivia API URL again?”

These responses helped me confirm I was using the correct endpoints:

- Trivia API: `https://uselessfacts.jsph.pl/random.json?language=en`  
- Quote API: `https://motivational-spark-api.vercel.app/api/quotes/random`
- GitHub API: `https://api.github.com/users/ReemaIQ/repos`

---

### 4. UI Feedback Elements (Toasts, Messages, Error States)
For Assignment 3 I added a **self-disappearing toast** that informs the user when they click “Starred Projects” or “Starred Repos” with no starred items.

I asked ChatGPT to clarify UI terminology and provide a minimal structure for a reusable toast.

> **Sample prompts:**  
> • “What’s the name of a pop-up that disappears on its own after a few seconds?”  
> • “Can you show me a generic toast skeleton for React?”  
> • “How do I auto-close a toast using setTimeout?”

ChatGPT explained the concept, terminology, and timing patterns.  
I adapted the code to my own styling and timing preferences.

---

### 5. Performance & Lighthouse Improvements
Performance was a major part of Assignment 3.  
I used ChatGPT to reason about how my assets, images, and layout affected the Lighthouse score.

> **Sample prompts:**  
> • “How can I improve Lighthouse performance and SEO scores?”  
> • “Why is my LCP so high even though the page has only a hero image?”  
> • “Should I compress images or lazy-load them first?”

Based on suggested techniques, I applied:

- image compression  
- `loading="lazy"` on non-critical images  
- removing unused components  
- adding meta descriptions  
- cleaning up CSS and layouts  

These changes directly contributed to performance increasing from ~59 → 92–97.

---

### 6. Technical Writing & Documentation

When preparing Assignment 3 documentation (README, technical-documentation.md, this AI-report), I used ChatGPT for **formatting help**, such as:

- converting bullet points into clean Markdown  
- rewriting lists into tables  
- making sections uniform across the docs  

> **Sample prompt:**  
> “Turn this into a clean .md section with proper headings.”

Content was mainly written by me; ChatGPT helped make it more organized and standardized.

---

## Takeaways
- Improved understanding of **responsive design**, especially stabilizing card sizes and preventing layout shifts.  
- Learned performance best practices such as **lazy loading**, **image compression**, and **avoiding unnecessary DOM reflow**.  
- Became more confident integrating and filtering **external APIs**.  
- Strengthened debugging skills, AI helped explain *why* something breaks, but I applied and verified all solutions myself.  
- Documentation became more polished and consistent across files.

---

## Author

**Reema Ibrahim Al-Qahtani**  
Software Engineering Student - KFUPM  
📧 Reeema.work@kfupm.edu.sa  
🔗 GitHub: https://github.com/ReemaIQ  
🔗 LinkedIn: https://www.linkedin.com/in/reema-ibrahim-53ba5236a/

---

## License
This project was created for **SWE 363 - Web Engineering (Assignment 3)**.  
All code, visuals, and assets were produced for educational purposes.

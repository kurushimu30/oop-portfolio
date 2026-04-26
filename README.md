# Mel Carl A. Chacon — OOP E-Portfolio

A Next.js 15 + Tailwind CSS 4 e-portfolio for Object-Oriented Programming (Java).  
**BSIT 2-1 · Polytechnic University of the Philippines**

---

## 🚀 Quick Setup (Drop into Vercel Template)

### Option A — Replace files in your downloaded template

1. Copy everything in this folder into your downloaded Vercel template root.
2. Let it overwrite `package.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`.
3. Run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

### Option B — Fresh clone

```bash
# 1. Clone or extract this project
cd mel-carl-oop-eportfolio

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Midnight palette, grid pattern, glassmorphism utilities
│   ├── layout.tsx           # Root layout with Navbar
│   ├── page.tsx             # Home — hero, bento grid, skills, stats
│   ├── midterm/
│   │   └── page.tsx         # Quizzes, Seatworks, 5 Activities with code
│   ├── final/
│   │   └── page.tsx         # Coming soon + OOP pillars preview
│   └── contact/
│       └── page.tsx         # Student info, file upload UI, rubric tracker
│
├── components/
│   ├── Navbar.tsx           # Fixed nav with active state, mobile hamburger
│   ├── CodeBlock.tsx        # Syntax-highlighted code with copy button
│   └── SectionHeader.tsx    # Reusable section title component
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0d1117` (GitHub-dark midnight) |
| Surface | `#161b27` |
| Card | `#1c2333` with `backdrop-blur` |
| Accent | `#6366f1` (indigo-500) |
| Text primary | `#e6edf3` |
| Text muted | `#8b92a8` |
| Border | `rgba(99,120,170,0.15)` |
| Code font | JetBrains Mono / Fira Code |
| Body font | Inter |

---

## 📄 Pages

| Route | Content |
|---|---|
| `/` | Hero, stats (25/30, 3 seatworks, 5 activities), bento features, skills bars |
| `/midterm` | 2 quizzes · 3 seatworks with code · 5 activities with full Java code + reflections |
| `/final` | Placeholder + OOP 4 pillars preview |
| `/contact` | Student info cards · File upload UI · Rubric coverage tracker |

---

## ☁️ Deploy to Vercel

```bash
# Push to GitHub, then connect repo in Vercel dashboard
# OR use Vercel CLI:
npx vercel --prod
```

No environment variables needed.

---

## 📦 Adding File Uploads (Screenshots/PDFs)

Place files in `/public/uploads/` and reference them in any page:

```tsx
<img src="/uploads/quiz1-screenshot.png" alt="Quiz 1 output" className="rounded-xl border border-[rgba(99,120,170,0.15)]" />
```

Or use Next.js `<Image>`:

```tsx
import Image from 'next/image'
<Image src="/uploads/quiz1.png" alt="Quiz 1" width={800} height={450} className="rounded-xl" />
```

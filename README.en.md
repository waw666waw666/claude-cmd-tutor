<p align="center">
  <a href="README.md">🇨🇳 中文</a> &nbsp;|&nbsp; <b>🇬🇧 English</b>
</p>

<p align="center">
  <img src="screenshots/home-zh.png" alt="Claude Code Command Bootcamp" width="700">
</p>

<h1 align="center">🚀 Claude Code Command Bootcamp</h1>

<p align="center">
  <a href="https://claudelearn.top"><img src="https://img.shields.io/badge/🌐_Live_Demo-claudelearn.top-7c3aed?style=for-the-badge&logo=cloudflare"></a>
  <a href="https://github.com/waw666waw666/claude-cmd-tutor"><img src="https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github"></a>
  <br>
  <img src="https://img.shields.io/badge/Vite_8-646CFF?logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript_6-3178C6?logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare&logoColor=white">
</p>

---

**An interactive CLI learning platform for Claude Code.** Master all **118 commands** from scratch with a built-in terminal emulator, real-world scenarios, and gamified achievements.

👉 **Live Demo**: [claudelearn.top](https://claudelearn.top)

---

## Features

| Feature | Description |
|---------|-------------|
| 📚 **Commands** | 118 commands in 6 categories, search, difficulty tags, progress |
| ⌨️ **Practice** | Built-in terminal emulator: select → type → verify |
| ⚔️ **Scenarios** | 11 real-world challenges, 36 task steps |
| 📋 **Reference** | Full table with hover tooltips for quick lookup |
| 🏅 **Achievements** | 9 badges + stats + streak tracking (3/7 days) |
| 🔄 **Auto Next** | Auto-advance on correct answer |
| 🧠 **Recall Mode** | Hide command name, recall from description |
| 💡 **Hints** | Inline autocomplete suggestions |
| 🌐 **i18n** | One-click Chinese/English switch, all data translated |
| 🌙 **Dark Mode** | Light/dark theme with system preference |

---

## 📸 Screenshots

<p align="center">
  <img src="screenshots/commands-zh.png" alt="Commands page" width="700">
  <br>
  <em>Command encyclopedia — browse, search, and track progress</em>
</p>

<p align="center">
  <img src="screenshots/learning.png" alt="Learning mode" width="700">
  <br>
  <em>Learning mode — view command details, syntax, and examples</em>
</p>

<p align="center">
  <img src="screenshots/practice.png" alt="Practice mode" width="700">
  <br>
  <em>Practice mode — recall commands by description, type to verify</em>
</p>

<p align="center">
  <img src="screenshots/scenarios.png" alt="Scenarios" width="700">
  <br>
  <em>Scenarios — solve real-world problems step by step</em>
</p>

<p align="center">
  <img src="screenshots/progress.png" alt="Progress and achievements" width="700">
  <br>
  <em>Achievements — track learning progress and daily streaks</em>
</p>

<p align="center">
  <img src="screenshots/reference.png" alt="Reference guide" width="700">
  <br>
  <em>Reference — command relations with hover tooltips</em>
</p>

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Vite 8 + React 19 + TypeScript 6 |
| Styling | Tailwind CSS v4 + CSS Variables |
| Routing | React Router v7 (8 routes) |
| State | Zustand + localStorage |
| Animation | Framer Motion |
| Icons | Lucide React |
| i18n | Custom React Context |
| Hosting | Cloudflare Pages |

---

## Project Structure

```
src/
├── i18n/              # Translations (zh/en)
├── data/              # 118 commands, 11 scenarios, 9 achievements
├── hooks/             # Localized data hooks
├── store/             # Zustand progress store
├── components/        # Layout, Sidebar, Terminal
├── pages/             # 8 pages (Home, Commands, Practice...)
├── App.tsx            # Router
└── main.tsx           # Entry
```

---

## License

MIT

<p align="center">
  <a href="README.md"><b>🇨🇳 查看中文版本</b></a>
</p>

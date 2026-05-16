# Claude Code 命令训练营

从零开始，循序渐进地学习 Claude Code 所有命令。交互式命令行学习平台。

## Tech Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4
- React Router v7
- Zustand (state management + localStorage)
- Lucide React (icons)
- Framer Motion (animations)

## Quick Start

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # Production build
npm run preview # Preview production build
```

## Project Structure

```
src/
├── types/index.ts          # Type definitions
├── data/{commands,scenarios,achievements}.ts
├── store/useProgress.ts    # Zustand store
├── components/
│   ├── Layout.tsx          # Main layout (sidebar + content + terminal)
│   ├── Sidebar.tsx         # Collapsible nav with drag-to-resize
│   ├── Terminal.tsx        # Interactive terminal emulator
│   └── AchievementBadge.tsx
├── pages/
│   ├── Home.tsx            # Dashboard with stats
│   ├── Commands.tsx        # Command encyclopedia
│   ├── CommandDetail.tsx   # Command detail view
│   ├── Practice.tsx        # Interactive practice mode
│   ├── Scenarios.tsx       # Challenge scenarios
│   ├── Reference.tsx       # Quick reference table
│   └── Progress.tsx        # Achievements & progress
├── App.tsx                 # Router
└── main.tsx                # Entry point
```

## Features

- 6 大类 20+ 命令的交互学习
- 情景挑战（6 个实战场景）
- 成就系统（9 个徽章）
- 亮色/暗色双主题
- 拖动调整侧边栏宽度
- 学习进度持久化

## Dev Server

Dev server runs on port **5173** by default (configured in `vite.config.ts`).

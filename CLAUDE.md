# Claude Code 命令训练营

> 从零开始，循序渐进地学习 Claude Code 所有命令

## Tech Stack
- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4
- React Router v7
- Zustand (state management + localStorage persistence)
- Lucide React (icons)
- Framer Motion (animations)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Project Structure
```
src/
├── types/index.ts        # Type definitions
├── data/
│   ├── commands.ts       # 20 Claude Code commands (categorized)
│   ├── scenarios.ts      # 6 real-world challenge scenarios
│   └── achievements.ts   # 9 achievement badges
├── store/
│   └── useProgress.ts    # Zustand store with localStorage + streak tracking
├── components/
│   ├── Layout.tsx        # Main layout (sidebar + content + terminal)
│   ├── Sidebar.tsx       # Collapsible navigation sidebar
│   ├── Terminal.tsx      # Interactive terminal emulator
│   └── AchievementBadge.tsx
├── pages/
│   ├── Home.tsx          # Dashboard with stats and progress
│   ├── Commands.tsx      # Command encyclopedia with search/skip
│   ├── CommandDetail.tsx # Individual command detail view
│   ├── Practice.tsx      # Interactive practice mode
│   ├── Scenarios.tsx     # Scenario challenges
│   ├── Reference.tsx     # Quick reference cheat sheet
│   └── Progress.tsx     # Progress tracking and achievements
├── App.tsx               # Router
└── main.tsx              # Entry point
```

## Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Dashboard, stats, progress |
| `/commands` | Commands | Browse all commands by category |
| `/commands/:id` | CommandDetail | Command details, usage, examples |
| `/practice` | Practice | Click a command → type in terminal |
| `/scenarios` | Scenarios | Real-world challenge scenarios |
| `/reference` | Reference | Quick reference table |
| `/progress` | Progress | Achievements and detailed progress |

## Layout Component (Layout.tsx)
- 管理终端显示/隐藏状态 (`showTerminal`)
- 通过 Outlet context 传递 `practiceState`, `setPracticeState`, `showTerminal`, `setShowTerminal`
- **自动打开终端**: 当 `practiceState.mode` 变为 `practice` 或 `scenario` 时，自动显示终端
- 终端控制按钮集成在终端面板头部，隐藏时显示悬浮按钮

## Terminal Component (Terminal.tsx)
- Props: `practiceState`, `showHints`, `onToggleHints`, `onPracticeUpdate`, `onClose`
- 三种模式: normal / practice / scenario
- 练习/挑战模式下终端边框高亮 + 青色辉光效果
- 支持命令自动补全（Tab/ArrowDown）、历史遍历（ArrowUp/ArrowDown）
- 底部输入区在活动模式下有青色背景强调

## Command Categories
1. **会话管理** (/help, /clear, /exit, /restart, /model, /models)
2. **诊断与信息** (/compact, /context, /cost, /doctor, /stats)
3. **编辑工具** (/copy, /vim, /diff, /review)
4. **搜索与外部** (/search, /summarize)
5. **CLI 模式** (claude -c, claude --resume, claude -p)
6. **高级功能** (/mcp, /agents, /memory, /install-github-app)

## 6 Scenarios
1. **上下文快满了** — 学习 /context, /compact, /clear
2. **选错模型了** — 学习 /model, /models
3. **环境出问题了** — 学习 /doctor, /restart
4. **每日晨检** — 学习晨检流程
5. **提交前的代码审查** — 学习 /diff, /review, /search
6. **插件扩展大师** — 学习 /mcp

## Features
- 命令分类学习（6 大类，20+ 命令）
- 交互练习模式（点击启动，终端输入验证）
- 情景挑战（多步骤闯关，支持断点续传）
- 速查手册（表格化展示，一目了然）
- 成就系统（9 个成就徽章）
- 跳过/恢复机制（可跳过不熟悉的命令）
- 提示模式开关（Sidebar 底部控制）
- **连续学习天数追踪**（🔥坚持3天、🔥🔥坚持7天成就）
- 主题切换（亮色/暗色双主题）
- 进度数据 localStorage 持久化

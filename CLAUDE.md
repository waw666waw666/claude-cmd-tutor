# Claude Code 命令训练营

> 互动式 Claude Code 命令学习平台 — 浏览、练习、实战，一站式掌握

## Tech Stack
- Vite 8 + React 19 + TypeScript 6
- Tailwind CSS v4
- React Router v7
- Zustand (state + localStorage persistence)
- Lucide React (icons)
- Framer Motion (animations)

## Commands
- `npm run dev` — Dev server (port 5173)
- `npm run build` — `tsc -b && vite build` (typecheck + build)
- `npm run preview` — Preview production build
- `npx serve dist` — Alt local preview

## Routes (8 total)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Dashboard, stats, progress |
| `/commands` | Commands | Browse all commands by category |
| `/commands/:id` | CommandDetail | Command details, usage, examples |
| `/practice` | Practice | Click a command → type in terminal |
| `/scenarios` | Scenarios | Real-world challenge scenarios |
| `/reference` | Reference | Quick reference table |
| `/progress` | Progress | Achievements and detailed progress |
| `*` | NotFound | 404 page |

## Project Structure
```
src/
├── types/index.ts        # Type definitions (Command, Scenario, etc.)
├── data/
│   ├── commands.ts       # 118 commands (6 categories)
│   ├── scenarios.ts      # 11 scenarios, 36 steps
│   └── achievements.ts   # 9 achievement badges
├── store/
│   └── useProgress.ts    # Zustand store + localStorage + streak tracking
├── components/
│   ├── Layout.tsx        # Main layout (sidebar + content + terminal)
│   ├── Sidebar.tsx       # Collapsible navigation sidebar
│   ├── Terminal.tsx      # Interactive terminal emulator
│   └── AchievementBadge.tsx
├── pages/
│   ├── Home.tsx
│   ├── Commands.tsx
│   ├── CommandDetail.tsx
│   ├── Practice.tsx
│   ├── Scenarios.tsx
│   ├── Reference.tsx
│   ├── Progress.tsx
│   └── NotFound.tsx
├── index.css             # Tailwind v4 + dark mode variables
├── App.tsx               # BrowserRouter + routes
└── main.tsx              # Entry point
```

## Key Components

### Layout.tsx
- Manages terminal show/hide state via `showTerminalUser`
- Passes context through Outlet: `practiceState`, `showTerminal`, etc.
- Auto-shows terminal when practice/scenario mode activates
- `showTerminalUser` default: `false` (hidden on load)

### Terminal.tsx
- Three modes: `normal` / `practice` / `scenario`
- Two-step Enter: ↑↓ highlights suggestion → Enter fills → Enter again executes
- `pendingFill` ref tracks Enter state; reset on input change, Escape, or history nav
- Suggestion dropdown: all matches shown (`max-h-64`), no 8-item limit
- Navigate suggestions → history at boundary (↑ at top → history, ↓ at bottom → history)
- Colored dots + Lucide symbols for terminal category icons

### Sidebar.tsx
- Collapsible, draggable width resize
- Absolute positioned expand button for collapsed state
- Collapsed header `h-10` matches nav item alignment

## Command Categories (118 total)
| Category | ID | Count | Examples |
|----------|-----|-------|---------|
| 会话管理 | basic | 11 | /help, /clear, /exit, /model |
| 诊断与信息 | diagnostics | 10 | /compact, /context, /doctor, /stats |
| 编辑工具 | editing | 7 | /copy, /vim, /diff |
| 搜索与外部 | search | 2 | /search, /summarize |
| CLI 模式 | cli | 51 | claude -c, --resume, -p, agents |
| 高级功能 | opencode | 37 | /mcp, /agents, background, plan |

## Scenarios (11 total, 36 steps)
| # | Title | Difficulty | Steps |
|---|-------|------------|-------|
| 1 | 上下文快满了 | easy | 3 |
| 2 | 选错模型了 | easy | 3 |
| 3 | 环境出问题了 | easy | 3 |
| 4 | 新手上路 | easy | 4 |
| 5 | 每日晨检 | medium | 4 |
| 6 | 提交前的代码审查 | medium | 3 |
| 7 | 安全审计 | medium | 3 |
| 8 | 成本管控 | medium | 4 |
| 9 | 插件扩展大师 | hard | 3 |
| 10 | 批量重构 | hard | 3 |
| 11 | 后台监控 | hard | 3 |

## Achievements (9)
第一步、勤学者、命令达人、命令大师、初次挑战、情景大师、练习达人、坚持3天🔥、坚持7天🔥🔥

## Deployment & Domains

### Current Production
- **Platform**: Cloudflare Pages
- **URL**: https://claude-cmd-tutor.pages.dev
- **Account ID**: `49781d91c8e42458d1d2adcd84997585`
- **Build**: CSS 31KB + JS 505KB, passes clean
- **Deploy**: Manual via `npx wrangler pages deploy dist --project-name claude-cmd-tutor`

### Custom Domain

#### claudelearn.top (⏳ 配置中)
- **Registrar**: Spaceship
- **Price**: ¥8.51 (~$1.18) first year, renews ¥26.22/yr
- **Status**:
  - [x] Domain registered (2026-05-16)
  - [x] Auto-renew turned off
  - [x] CNAME record: `@` → `claude-cmd-tutor.pages.dev`
  - [ ] DNS propagation (pending)
  - [ ] SSL certificate (pending)
  - [ ] Active in Cloudflare Pages
- **Nameservers**: `launch1.spaceship.net` / `launch2.spaceship.net`
- Cloudflare Pages domain API: `POST /accounts/{id}/pages/projects/claude-cmd-tutor/domains`
- Domain ID in Pages: `9de7c758-1589-4f01-a339-e791b865ed92`

#### claudecmd.xyz (❌ 未购买)
- Added to Pages API but never bought; "CNAME record not set" due to no DNS zone
- Cloudflare price: $4.13/yr (at-cost)
- Domain ID in Pages: `b145168a-bfbb-4999-8c2e-7b73a459a865`
- Should be removed from Pages if not used

### Previous Deployment Attempts
- **Zeabur**: Abandoned due to CLI bug on Windows ("Incorrect function" terminal error)
- **Cloudflare**: Working via wrangler CLI with API token (GitHub OAuth blocked by GFW)
- GitHub Actions workflow (`.github/workflows/deploy-zeabur.yml`) exists but untested

### GitHub
- Repo: `https://github.com/waw666waw666/claude-cmd-tutor`
- Branch: `master`

## Build Output
```
dist/
├── index.html
└── assets/
    ├── index-DOO638HW.css  (~31KB)
    └── index-DdvRUUQr.js   (~505KB)
```

## Key Implementation Details
- `index.html`: `lang="zh-CN"`, SEO/OG meta tags, favicon.svg
- `src/index.css`: Dark mode `.dark` section, shadow overrides
- Terminal arrow key handler: custom logic in Terminal.tsx
- `pendingFill` ref: two-step Enter state management
- Suggestion dropdown: no slice limit, `max-h-64` overflow-y-auto
- Completed commands re-clickable (no `disabled`)

## Pitfalls
- GFW blocks GitHub OAuth → Cloudflare login via email only
- Zeabur CLI "Incorrect function" on Windows → cannot deploy from local
- DNS check tools blocked on this network (Google DNS, ICANN RDAP)
- Cloudflare API token only has Pages scope (no Zone:Edit)
- `.top` renewal at Spaceship is ~$3/yr
- CNAME validation uses HTTP method on Cloudflare Pages

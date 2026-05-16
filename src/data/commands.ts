import type { Command, CommandCategory } from '../types'

const categoryLabels: Record<CommandCategory, string> = {
  basic: '会话管理',
  diagnostics: '诊断与信息',
  editing: '编辑工具',
  search: '搜索与外部',
  cli: 'CLI 模式',
  opencode: '高级功能',
}

export { categoryLabels }

export const commands: Command[] = [
  // ========== 会话管理 ==========
  {
    id: 'help',
    name: '/help',
    category: 'basic',
    summary: '查看所有可用命令及其用法',
    description:
      '显示 Claude Code 支持的所有命令列表和简要说明。是初学者的第一个命令，也是日常最常用的参考命令。',
    usage: '/help',
    example: '/help',
    exampleOutput: `可用命令：
  /help        - 显示此帮助信息
  /clear       - 清除当前对话
  /exit        - 退出 Claude Code
  /model       - 切换 AI 模型
  /compact     - 压缩对话释放上下文
  /doctor      - 运行环境诊断
  /cost        - 显示 Tokens 使用统计
  /review      - 请求代码审查`,
    tips: [
      '任何时候忘记命令都可以使用 /help',
      '/help 会显示当前环境支持的所有命令',
      '不同版本可能命令有所不同，以 /help 输出为准',
    ],
    difficulty: 1,
  },
  {
    id: 'clear',
    name: '/clear',
    category: 'basic',
    summary: '清除当前对话，从头开始',
    description:
      '完全清除当前对话历史，释放所有 tokens。与 /compact 不同，/clear 不保留任何上下文，适用于需要完全重新开始的场景。',
    usage: '/clear',
    example: '/clear',
    exampleOutput: `✓ 对话已清除。
你现在可以开始一个新话题。`,
    tips: [
      '/clear 不可撤销，使用前确保保存了重要信息',
      '如果需要保留部分上下文，使用 /compact 而非 /clear',
      '适合切换完全不同的话题时使用',
    ],
    difficulty: 1,
  },
  {
    id: 'exit',
    name: '/exit',
    category: 'basic',
    summary: '退出 Claude Code',
    description:
      '退出当前的 Claude Code 会话。如果有未保存的工作，系统会提醒你先保存。',
    usage: '/exit',
    example: '/exit',
    exampleOutput: `再见！有需要随时召唤我。
 Claude Code 会话已结束。`,
    tips: [
      '退出前确保重要工作已保存',
      '可以使用 /restart 代替 /exit 来重置会话',
      '退出后对话历史不会被保留',
    ],
    difficulty: 1,
  },
  {
    id: 'restart',
    name: '/restart',
    category: 'basic',
    summary: '重启 Claude Code 会话',
    description:
      '重启当前会话，保留项目上下文但清除对话历史。适合在遇到问题后尝试恢复。',
    usage: '/restart',
    example: '/restart',
    exampleOutput: `↻ 正在重启会话...
✓ 会话已重启，项目上下文已保留。`,
    tips: [
      '/restart 相比 /exit 会保留更多上下文',
      '适合在会话出现异常时尝试恢复',
      '项目文件和工作目录不会受影响',
    ],
    difficulty: 1,
  },
  {
    id: 'model',
    name: '/model',
    category: 'basic',
    summary: '切换 AI 模型（Haiku/Sonnet/Opus）',
    description:
      '在不同的 Claude 模型之间切换。Haiku 快速经济，Sonnet 平衡性好，Opus 最强但最慢最贵。',
    usage: '/model <模型名>',
    example: '/model haiku',
    exampleOutput: `✓ 已切换到 Haiku 模型

当前模型: claude-3-haiku-20240307
特点: 快速、经济，适合简单任务`,
    tips: [
      '简单任务用 Haiku 更快更省',
      '复杂推理用 Sonnet，最关键任务用 Opus',
      '/model 不带参数会显示当前模型',
      '/models 可查看所有可用模型',
    ],
    difficulty: 1,
  },
  {
    id: 'models',
    name: '/models',
    category: 'basic',
    summary: '列出所有可用的 AI 模型',
    description:
      '显示账户可用的所有 Claude 模型及其特点，帮助你选择最适合当前任务的模型。',
    usage: '/models',
    example: '/models',
    exampleOutput: `📋 可用模型：

1. haiku      - 快速、经济 (~$0.25/1M tokens)
2. sonnet     - 平衡之选 (~$3/1M tokens)
3. opus       - 最强推理 (~$15/1M tokens)

当前: sonnet`,
    tips: [
      '/models 显示账户实际可用的模型',
      '不同订阅级别可用的模型不同',
      '可以根据任务难度选择合适模型',
    ],
    difficulty: 1,
  },
  {
    id: 'status',
    name: '/status',
    category: 'basic',
    summary: '查看当前会话状态信息',
    description:
      '显示当前会话的详细信息，包括使用的模型、token 用量、运行时长等。快速了解会话整体状况。',
    usage: '/status',
    example: '/status',
    exampleOutput: `📋 会话状态
模型: claude-sonnet-4-6
Token 使用: 42.5k / 200k
运行时长: 1小时 23分钟
工具调用: 47 次`,
    tips: [
      '/status 提供比 /cost 更全面的会话概览',
      '适合在开始复杂任务前先检查状态',
      '可以看到当前模型和版本信息',
    ],
    difficulty: 1,
  },
  {
    id: 'init',
    name: '/init',
    category: 'basic',
    summary: '初始化项目 CLAUDE.md 配置文件',
    description:
      '在项目根目录创建或更新 CLAUDE.md 文件。CLAUDE.md 用于记录项目配置、技术栈、规范等重要上下文。',
    usage: '/init',
    example: '/init',
    exampleOutput: `📝 正在创建 CLAUDE.md...
✓ CLAUDE.md 已创建
下一步: 编辑文件添加项目描述、技术栈、规范等`,
    tips: [
      '新项目建议先运行 /init 创建配置',
      'CLAUDE.md 中的内容会自动注入到每次对话的上下文中',
      '可以手动编辑 CLAUDE.md 添加更多细节',
    ],
    difficulty: 1,
  },
  {
    id: 'plan',
    name: '/plan',
    category: 'basic',
    summary: '进入计划模式，先规划再执行',
    description:
      '启用计划模式后，Claude 会先提出变更方案，你在批准后再执行。适合复杂重构或不确定如何下手时使用。',
    usage: '/plan <描述>',
    example: '/plan 重构用户认证模块',
    exampleOutput: `📋 重构计划: 用户认证模块
1. 提取认证逻辑到 useAuth hook
2. 添加 token 刷新机制
3. 统一错误处理
4. 添加测试用例
是否执行此计划？(y/n)`,
    tips: [
      '适合大范围重构或风险较高的变更',
      '计划模式下 Claude 不会直接修改文件',
      '批准后自动切换到执行模式',
    ],
    difficulty: 2,
  },
  {
    id: 'rename',
    name: '/rename',
    category: 'basic',
    summary: '为当前会话命名',
    description:
      '给当前会话设置一个自定义名称，方便后续通过 --resume 恢复时识别。',
    usage: '/rename <会话名>',
    example: '/rename auth-refactor',
    exampleOutput: `✓ 会话已重命名为: auth-refactor
可通过 claude -r "auth-refactor" 恢复`,
    tips: [
      '好记的命名能大幅提升 --resume 的效率',
      '建议按功能命名，如 "feature-login"、"hotfix-crash"',
      '不命名的话会话会以默认名称保存',
    ],
    difficulty: 1,
  },
  {
    id: 'color',
    name: '/color',
    category: 'basic',
    summary: '设置输入提示栏颜色',
    description:
      '自定义 Claude Code 输入提示栏的颜色，让不同会话一目了然。适合同时管理多个会话时区分使用。',
    usage: '/color <颜色>',
    example: '/color #ff6b6b',
    exampleOutput: `🎨 提示栏颜色已更新
输入 /color default 恢复默认颜色`,
    tips: [
      '支持十六进制颜色码和颜色名称',
      '适合不同项目使用不同颜色区分',
      '/color default 恢复默认',
    ],
    difficulty: 1,
  },

  // ========== 上下文与记忆 ==========
  {
    id: 'compact',
    name: '/compact',
    category: 'diagnostics',
    summary: '压缩对话历史，释放上下文窗口',
    description:
      '当对话变长、context 接近上限时，/compact 压缩对话历史，保留关键信息释放 tokens。建议定期使用保持流畅。',
    usage: '/compact',
    example: '/compact',
    exampleOutput: `▸ 压缩前: 45.2k tokens
▸ 压缩后: 8.3k tokens
▸ 节省: 36.9k tokens (81.6%)
✓ 对话已压缩，关键信息已保留`,
    tips: [
      '当感觉 Claude 回复变慢时，先试试 /compact',
      '建议每 100-150 条消息压缩一次',
      '可以带参数: /compact --aggressive 或 /compact --keep-keys',
      '重要信息建议在 CLAUDE.md 中记录',
    ],
    difficulty: 1,
  },
  {
    id: 'context',
    name: '/context',
    category: 'diagnostics',
    summary: '查看当前上下文使用情况',
    description:
      '可视化当前 context 使用量，显示消息、文件内容、工具输出各占多少空间。帮助判断何时需要压缩。',
    usage: '/context',
    example: '/context',
    exampleOutput: `📊 上下文使用情况:

▸ 当前: 42.5k / 200k tokens (21%)
▸ 消息: 15.2k
▸ 文件: 22.1k
▸ 工具: 5.2k

状态: 良好 — 可以继续使用`,
    tips: [
      '超过 80% 时建议 /compact',
      '可以直观看到哪类内容占用最多',
      '帮助优化使用习惯',
    ],
    difficulty: 1,
  },
  {
    id: 'cost',
    name: '/cost',
    category: 'diagnostics',
    summary: '查看当前会话的 Tokens 和费用',
    description:
      '显示当前会话的 token 使用量和估算费用。帮助你了解每次对话的成本，合理规划使用。',
    usage: '/cost',
    example: '/cost',
    exampleOutput: `📊 会话统计

输入 tokens:  12,345
输出 tokens:  8,901
合计:        21,246
估算费用:    $0.42

自上次 /cost:  3,210 tokens`,
    tips: [
      '定期检查 /cost 可以控制预算',
      '切换不同模型时费用差异很大',
      '/compact 后 tokens 会显著减少',
    ],
    difficulty: 1,
  },

  // ========== 诊断与信息 ==========
  {
    id: 'doctor',
    name: '/doctor',
    category: 'diagnostics',
    summary: '运行环境诊断，排查问题',
    description:
      '检查 Claude Code 的运行环境是否正常，包括网络连接、API 密钥、文件权限、依赖版本等。遇到异常首先运行。',
    usage: '/doctor',
    example: '/doctor',
    exampleOutput: `🔍 环境诊断报告

✓ Node.js: v22.22.1
✓ 网络连接: 正常
✓ API 密钥: 已配置
✓ 文件权限: 正常
✓ Git: 已初始化

系统状态: 正常 ✓`,
    tips: [
      '遇到任何异常先试 /doctor',
      '/doctor 不会修改任何文件，可放心执行',
      '如果 /doctor 报错，截图发给技术支持',
    ],
    difficulty: 1,
  },
  {
    id: 'stats',
    name: '/stats',
    category: 'diagnostics',
    summary: '显示会话统计信息',
    description:
      '显示当前会话的详细统计信息，包括消息数、运行时长、工具使用情况等。',
    usage: '/stats',
    example: '/stats',
    exampleOutput: `📈 会话统计

运行时长: 2小时 34分钟
消息数:   156 条
工具调用: 89 次
平均响应: 1.2 秒`,
    tips: [
      '/stats 提供比 /cost 更详细的会话信息',
      '适合评估工作效率',
      '工具调用次数反映任务复杂度',
    ],
    difficulty: 1,
  },
  {
    id: 'fast',
    name: '/fast',
    category: 'diagnostics',
    summary: '切换快速输出模式',
    description:
      '开启快速输出模式，在相同模型下加快生成速度（可能略微降低质量）。适合需要快速迭代或简单任务的场景。',
    usage: '/fast',
    example: '/fast',
    exampleOutput: `⚡ 快速模式: 已启用
相同模型，更快的输出速度`,
    tips: [
      '快速模式使用相同模型，只是生成策略更激进',
      '适合批量处理或简单重构',
      '再次输入 /fast 可关闭',
    ],
    difficulty: 1,
  },
  {
    id: 'bug',
    name: '/bug',
    category: 'diagnostics',
    summary: '向 Anthropic 报告 Bug',
    description:
      '向 Anthropic 提交当前会话中遇到的 Bug 报告。会自动附加相关上下文信息，帮助团队快速定位问题。',
    usage: '/bug',
    example: '/bug',
    exampleOutput: `🐛 Bug 报告已提交
感谢反馈！Anthropic 团队会尽快处理`,
    tips: [
      '报告会自动附带会话上下文，无需手动描述',
      '适合遇到异常行为或崩溃时使用',
      '非紧急问题建议用此命令反馈',
    ],
    difficulty: 1,
  },
  {
    id: 'release-notes',
    name: '/release-notes',
    category: 'diagnostics',
    summary: '查看 Claude Code 版本更新日志',
    description:
      '交互式浏览 Claude Code 各版本的更新日志，了解新功能、改进和 Bug 修复。支持按版本筛选。',
    usage: '/release-notes',
    example: '/release-notes',
    exampleOutput: `📋 更新日志 (v2.1.92+)
2.1.118 - 新增 /buddy 终端宠物
2.1.121 - 新增 /skills 命令
2.1.90  - 新增 /powerup 功能教程
选择版本查看详情...`,
    tips: [
      '可以查看任意版本的变更内容',
      '新版本通常包含性能优化和新功能',
      '建议每周查看一次更新日志',
    ],
    difficulty: 1,
  },
  {
    id: 'terminal-setup',
    name: '/terminal-setup',
    category: 'diagnostics',
    summary: '配置终端快捷键绑定',
    description:
      '交互式配置终端键位绑定，包括复制、粘贴、清屏等快捷键。支持自定义键位映射。',
    usage: '/terminal-setup',
    example: '/terminal-setup',
    exampleOutput: `⌨️ 终端键位设置
当前绑定:
Enter     - 发送消息
Ctrl+C    - 中断执行
Tab       - 自动补全
↑/↓       - 历史命令
是否修改？(y/n)`,
    tips: [
      '支持所有常用终端快捷键自定义',
      '修改后立即生效，无需重启',
      '可以随时重置为默认配置',
    ],
    difficulty: 1,
  },
  {
    id: 'config',
    name: '/config',
    category: 'diagnostics',
    summary: '打开 Claude Code 完整设置界面',
    description:
      '交互式浏览和修改所有 Claude Code 配置项，包括主题、权限、模型偏好、行为设置等。',
    usage: '/config',
    example: '/config',
    exampleOutput: `⚙️ 设置中心
1. 外观 - 主题、颜色、字体
2. 行为 - 自动补全、确认提示
3. 权限 - 工具访问控制
4. 模型 - 默认模型选择
选择要修改的类别...`,
    tips: [
      '比直接编辑 JSON 配置更友好',
      '所有修改即时生效',
      '支持搜索配置项',
    ],
    difficulty: 2,
  },

  // ========== 编辑工具 ==========
  {
    id: 'copy',
    name: '/copy',
    category: 'editing',
    summary: '复制 Claude 最后一条回复',
    description:
      '快速复制 Claude 的最后一次完整回复到系统剪贴板，包括代码块、格式化文本等。',
    usage: '/copy',
    example: '/copy',
    exampleOutput: `✓ 已复制到剪贴板`,
    tips: [
      '比手动框选复制更快更准确',
      '复制的是完整回复，包括所有代码块',
      '如果上次回复很大，复制可能稍慢',
    ],
    difficulty: 1,
  },
  {
    id: 'vim',
    name: '/vim',
    category: 'editing',
    summary: '编辑模式切换（v2.1.92+ 中移除，改用 /config）',
    description:
      '在 Vim 键位和普通编辑模式之间切换。⚠️ v2.1.92 起已移除，请使用 /config → Editor mode 替代。',
    usage: '/vim',
    example: '/vim',
    exampleOutput: `✓ Vim 模式: 已启用
  - j/k: 下/上移动
  - l/h: 右/左移动
  - Esc: 退出编辑
  - i: 进入插入模式`,
    tips: [
      '⚠️ v2.1.92+ 已移除，改用 /config 设置 Editor mode',
      'Vim 模式下仍支持基本编辑',
      '适合有 Vim 使用经验的开发者',
    ],
    difficulty: 2,
  },
  {
    id: 'diff',
    name: '/diff',
    category: 'editing',
    summary: '显示代码变更的结构化差异',
    description:
      '以紧凑、结构化的方式显示文件的增删改变化。比标准 git diff 更易读，聚焦于有意义的变更。',
    usage: '/diff',
    example: '/diff',
    exampleOutput: `📝 src/components/Header.tsx

  function Header() {
-   return <div>Old Title</div>
+   return <h1>New Title</h1>
  }

📝 src/styles.css

-  .old-class { color: red }
+  .new-class { color: blue }`,
    tips: [
      '/diff 默认比较最后修改的文件',
      '比 git diff 更简洁，聚焦逻辑变更',
      '可以在提交前快速 review 改动',
    ],
    difficulty: 2,
  },
  {
    id: 'review',
    name: '/review',
    category: 'editing',
    summary: '请求代码审查',
    description:
      '让 Claude 审查你最近的代码变更，检查潜在 bug、安全问题、代码质量等。',
    usage: '/review',
    example: '/review',
    exampleOutput: `🔍 代码审查报告

文件: src/api/user.ts
问题数: 2

⚠️ [中等] 缺少输入验证
   建议在 handleLogin 中添加参数校验

⚠️ [低]  未使用的导入
   Line 3: 'crypto' 已导入但未使用`,
    tips: [
      '适合提交代码前的自检',
      '可以指定文件: /review src/auth.ts',
      '结合 /diff 查看具体变更',
    ],
    difficulty: 2,
  },
  {
    id: 'rewind',
    name: '/rewind',
    category: 'editing',
    summary: '回退到对话中的某个检查点',
    description:
      '将对话回退到之前的某个状态，撤销之后的所有变更。相当于对话中的"时光机"，适合探索性开发后回退。',
    usage: '/rewind',
    example: '/rewind',
    exampleOutput: `⏪ 已回退到上一个检查点
后续的 7 条消息和变更已撤销`,
    tips: [
      '配合 /branch 使用效果更佳：分支探索，不满意就回退',
      '也可以通过按 Esc 两次快速触发',
      '回退后不可恢复，操作前请确认',
    ],
    difficulty: 2,
  },
  {
    id: 'simplify',
    name: '/simplify',
    category: 'editing',
    summary: '审查代码并提出简化建议',
    description:
      '分析当前代码变更，找出可以简化的地方。包括冗余逻辑、过度抽象、不必要的复杂性等，让代码更简洁。',
    usage: '/simplify',
    example: '/simplify',
    exampleOutput: `🔍 简化分析
src/utils/format.ts:23-45
- 冗余条件判断: if/else 可合并为三元表达式
- 过度抽象: formatDate 函数可内联
- 建议精简代码量 ~30%`,
    tips: [
      '适合重构前先运行，找出简化方向',
      '不会自动修改代码，只提供建议',
      '与 /review 互补：/review 找问题，/simplify 找冗余',
    ],
    difficulty: 2,
  },
  {
    id: 'security-review',
    name: '/security-review',
    category: 'editing',
    summary: '全面审查代码安全漏洞',
    description:
      '对项目进行深度安全审查，检测常见安全漏洞：XSS、SQL 注入、敏感信息泄露、依赖安全问题等。',
    usage: '/security-review',
    example: '/security-review',
    exampleOutput: `🔒 安全审查报告
高危: 2  中危: 4  低危: 7

🚨 [高危] src/api/auth.ts:88
  明文存储 token 在 localStorage
  建议: 使用 httpOnly cookie

⚠️ [中危] src/api/user.ts:156
  缺少输入校验
  建议: 添加参数白名单验证`,
    tips: [
      '建议在发布前运行一次全面安全审查',
      '审查结果按严重程度分级',
      '每个问题都附带修复建议',
    ],
    difficulty: 3,
  },

  // ========== 搜索与外部 ==========
  {
    id: 'search',
    name: '/search',
    category: 'search',
    summary: '搜索网络获取最新信息',
    description:
      '让 Claude Code 搜索互联网获取实时信息。适用于需要最新数据、文档或新闻的场景。',
    usage: '/search <搜索关键词>',
    example: '/search Claude 3.5 新特性',
    exampleOutput: `🔍 搜索结果: Claude 3.5 新特性

1. Claude 3.5 Sonnet 发布，性能大幅提升
2. 新增计算机使用功能
3. 改进的长上下文理解

📖 来源: anthropic.com, 2024-10`,
    tips: [
      '搜索结果会作为上下文供 Claude 参考',
      '搜索后可以追问更详细的信息',
      '/search 适用于训练数据截止日期之后的信息',
    ],
    difficulty: 2,
  },
  {
    id: 'summarize',
    name: '/summarize',
    category: 'search',
    summary: '总结指定 URL 的内容',
    description:
      '读取并总结一个网页、文档或文章的内容。无需手动复制粘贴，直接给出 URL 即可获得摘要。',
    usage: '/summarize <URL>',
    example: '/summarize https://docs.anthropic.com',
    exampleOutput: `📄 Anthropic 文档摘要

▸ 核心内容: Claude API 使用指南
▸ 关键章节: 快速入门、模型调用、最佳实践
▸ 适用场景: 开发集成

💡 需要深入了解某个方面？可以直接提问。`,
    tips: [
      '适合快速了解一篇长文章的核心内容',
      '总结后可以针对感兴趣的部分深入追问',
      '支持大多数公开网页',
    ],
    difficulty: 2,
  },

  // ========== CLI 模式 ==========
  {
    id: 'claude-continue',
    name: 'claude -c',
    category: 'cli',
    summary: '继续上一次的对话会话',
    description:
      '恢复并继续上次中断的 Claude Code 会话。所有历史上下文和对话状态都会被保留。',
    usage: 'claude -c',
    example: 'claude -c',
    exampleOutput: `↻ 正在恢复上次会话...
✓ 已加载 156 条消息 (32.1k tokens)

上次会话: 2小时前
继续上次的话题...`,
    tips: [
      '比 --resume 更快，自动选择最近的会话',
      '-c 是 --continue 的简写',
      '适合日常继续工作流',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-resume',
    name: 'claude --resume',
    category: 'cli',
    summary: '选择并恢复指定的历史会话',
    description:
      '列出所有历史会话，让你选择恢复哪一个。与 -c 不同，--resume 提供选择界面。',
    usage: 'claude --resume',
    example: 'claude --resume',
    exampleOutput: `📋 历史会话列表:

1. 项目重构 (2小时前) - 45.2k tokens
2. Bug 修复 (昨天) - 12.8k tokens
3. 新功能开发 (3天前) - 89.1k tokens

选择要恢复的会话 (1-3):`,
    tips: [
      '需要选择特定会话时用 --resume',
      '每天开始工作前可用 --resume 查看昨天进度',
      '会话列表按时间倒序排列',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-pipe',
    name: 'claude -p',
    category: 'cli',
    summary: '管道模式，非交互执行指令',
    description:
      '通过管道将内容传递给 Claude Code 处理，适用于脚本化、CI/CD 和自动化场景。',
    usage: 'echo "内容" | claude -p "指令"',
    example: 'cat error.log | claude -p "分析这些错误日志"',
    exampleOutput: `📊 错误日志分析结果:

1. TypeError (23次) - 空指针异常
2. ReferenceError (8次) - 未定义变量
3. 根本原因: 异步加载顺序问题

💡 建议: 在组件挂载后添加 loading 状态`,
    tips: [
      '适合集成到 CI/CD 或脚本中使用',
      '-p 后面跟指令描述',
      '管道输入的内容会成为上下文的一部分',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-update',
    name: 'claude update',
    category: 'cli',
    summary: '更新 Claude Code 到最新版本',
    description:
      '检查并安装 Claude Code 的最新版本。建议每周执行一次，以获取新功能、性能优化和 bug 修复。',
    usage: 'claude update',
    example: 'claude update',
    exampleOutput: `🔄 正在检查更新...
当前版本: 2.1.92
最新版本: 2.1.118
正在更新... ✓ 已更新到 2.1.118`,
    tips: [
      '建议每周检查一次更新',
      '更新前会检查版本兼容性',
      '新版本通常包含新功能和性能优化',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-version',
    name: 'claude --version',
    category: 'cli',
    summary: '查看 Claude Code 当前版本',
    description:
      '快速查看当前安装的 Claude Code 版本号。适合在报告问题或检查更新前确认版本。',
    usage: 'claude --version',
    aliases: ['claude -v'],
    example: 'claude --version',
    exampleOutput: `claude-code version 2.1.118`,
    tips: [
      '报告问题前先确认版本号',
      '旧版本可能缺少某些功能',
      'claude -v 是 --version 的简写',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-config',
    name: 'claude config',
    category: 'cli',
    summary: '管理 Claude Code 配置',
    description:
      '查看和修改 Claude Code 的配置选项。支持 list/get/set/add/remove 子命令，管理主题、权限等设置。',
    usage: 'claude config <子命令>',
    example: 'claude config set theme dark',
    exampleOutput: `✓ 配置已更新
theme = dark

使用 claude config list 查看所有配置`,
    tips: [
      'claude config list 查看当前所有配置',
      'claude config set <key> <value> 修改配置',
      '常用配置：theme, permissions, model',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-worktree',
    name: 'claude --worktree',
    category: 'cli',
    summary: '在隔离的 git Worktree 中启动',
    description:
      '创建一个隔离的 git worktree 并在其中启动会话。适合并行开发多个特性，互不干扰。',
    usage: 'claude --worktree',
    aliases: ['claude -w'],
    example: 'claude -w',
    exampleOutput: `🌳 正在创建工作树: feature-xyz
✓ 工作树就绪，已切换到新目录
提示: 工作树与主分支文件隔离`,
    tips: [
      '适合并行开发互不干扰的多个特性',
      '-w 是 --worktree 的简写',
      '工作树有独立的文件系统和 git 状态',
    ],
    difficulty: 3,
  },
  {
    id: 'claude',
    name: 'claude',
    category: 'cli',
    summary: '启动 Claude Code 交互式会话',
    description:
      '最基本的启动命令，不带任何参数时进入交互式模式。可以直接附带问题开始对话，或通过管道传递内容。',
    usage: 'claude [问题]',
    example: 'claude 解释这个项目的架构',
    exampleOutput: `🤖 欢迎使用 Claude Code
输入你的问题开始对话。
当前目录: my-project
模型: claude-sonnet-4-6`,
    tips: [
      '直接输入问题可跳过欢迎界面',
      '通过管道传递内容: cat file | claude "分析"',
      '首次使用会自动引导登录',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-name',
    name: 'claude --name',
    category: 'cli',
    summary: '启动时指定会话名称',
    description:
      '在启动时给会话命名，方便后续通过 --resume 恢复。比启动后再用 /rename 更高效。',
    usage: 'claude --name <会话名>',
    aliases: ['claude -n'],
    example: 'claude --name "auth-refactor"',
    exampleOutput: `✓ 会话已命名: auth-refactor
可通过 claude -r "auth-refactor" 恢复`,
    tips: [
      '提前命名便于 --resume 时快速定位',
      '-n 是 --name 的简写',
      '适合为每个任务单独命名的开发者',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-model',
    name: 'claude --model',
    category: 'cli',
    summary: '启动时指定使用的模型',
    description:
      '在会话启动前指定使用的 Claude 模型，覆盖默认配置。支持 opus/sonnet/haiku 及具体版本号。',
    usage: 'claude --model <模型名>',
    aliases: ['claude -m'],
    example: 'claude --model claude-opus-4-6',
    exampleOutput: `✓ 使用模型: claude-opus-4-6
会话已启动`,
    tips: [
      '复杂任务推荐 opus，日常用 sonnet，简单任务用 haiku',
      '可以指定版本号: --model claude-haiku-4-5',
      '会话中可通过 /model 切换',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-plan',
    name: 'claude --plan',
    category: 'cli',
    summary: '以计划模式启动',
    description:
      '启动时直接进入计划模式，Claude 会先提方案再执行。适合需要谨慎操作的大型重构。',
    usage: 'claude --plan',
    example: 'claude --plan',
    exampleOutput: `📋 计划模式已启用
Claude 将在修改前提出完整方案，
待你批准后再执行。`,
    tips: [
      '启动时就用 --plan 避免误操作',
      '计划模式下所有修改需你确认',
      '适合生产环境或关键代码的重构',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-max-turns',
    name: 'claude --max-turns',
    category: 'cli',
    summary: '限制自动执行的最大轮次',
    description:
      '限制 Claude 自动执行工具调用的最大轮数。防止长时间运行的任务失控，适合 CI/CD 和自动化脚本。',
    usage: 'claude --max-turns <数量>',
    example: 'claude -p "修复 lint 错误" --max-turns 10',
    exampleOutput: `⚙️ 已限制为 10 轮自动执行
到达上限后自动停止`,
    tips: [
      '适合 CI/CD 和自动化脚本中控制预算',
      '到达上限后会话不会退出，会等待进一步指令',
      '-p 模式下效果最明显',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-output-format',
    name: 'claude --output-format',
    category: 'cli',
    summary: '设置输出格式',
    description:
      '指定 -p 模式的输出格式。支持 text（默认）、json、stream-json。json 格式适合脚本解析。',
    usage: 'claude --output-format <格式>',
    example: 'claude -p "列出 API 端点" --output-format json',
    exampleOutput: `{"endpoints":["GET /users","POST /users","GET /users/:id"],"count":3}`,
    tips: [
      'json 输出可直接用 jq 处理',
      'stream-json 适合流式处理大响应',
      '仅在 -p 模式下生效',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-system-prompt',
    name: 'claude --system-prompt',
    category: 'cli',
    summary: '注入自定义系统提示词',
    description:
      '启动时注入额外的系统提示词，覆盖或补充 CLAUDE.md 中的配置。适合临时改变 Claude 的行为角色。',
    usage: 'claude --system-prompt <提示词>',
    aliases: ['claude -s'],
    example: 'claude --system-prompt "你是一个安全审计专家"',
    exampleOutput: `✓ 系统提示词已注入
Claude 将以安全审计专家的角色工作`,
    tips: [
      '注入的提示词会覆盖 CLAUDE.md 中的配置',
      '-s 是 --system-prompt 的简写',
      '适合切换不同角色或专业领域',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-debug',
    name: 'claude --debug',
    category: 'cli',
    summary: '以调试模式启动',
    description:
      '启动时启用详细调试日志，显示工具调用、内部状态变更等信息。适合排查问题或了解 Claude 内部工作方式。',
    usage: 'claude --debug',
    example: 'claude --debug',
    exampleOutput: `🔧 调试模式已启用
[Debug] 加载配置: ~/.claude.json
[Debug] 初始化 MCP 服务器: 3
[Debug] 检测工具: 24 个可用`,
    tips: [
      '调试日志会显示详细的执行步骤',
      '适合排查配置或工具调用问题',
      '调试信息也会显示在终端中',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-install',
    name: 'claude install',
    category: 'cli',
    summary: '安装或重装指定版本的 Claude Code',
    description:
      '安装指定版本的 Claude Code 原生二进制文件。支持版本号如 2.1.118，或 stable/latest。',
    usage: 'claude install [版本]',
    example: 'claude install 2.1.118',
    exampleOutput: `📦 正在安装 Claude Code v2.1.118...
✓ 安装完成
当前版本: 2.1.118`,
    tips: [
      '不指定版本时安装最新的稳定版',
      '可以在不同版本间切换测试',
      '安装后需要重启终端生效',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-bare',
    name: 'claude --bare',
    category: 'cli',
    summary: '以极简模式启动',
    description:
      '跳过所有外部配置和插件，以最精简的方式启动。不加载 CLAUDE.md、MCP 服务器、插件等，启动速度最快。',
    usage: 'claude --bare',
    example: 'claude --bare',
    exampleOutput: `🪶 极简模式
未加载: CLAUDE.md, MCP, 插件
启动完成: 0.3s`,
    tips: [
      '启动速度最快，适合简单查询',
      '适合排除外部插件导致的兼容性问题',
      '极简模式下功能受限，复杂任务不推荐',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-allowed-tools',
    name: 'claude --allowedTools',
    category: 'cli',
    summary: '限制 Claude 可用的工具',
    description:
      '指定 Claude 在会话中允许使用的工具列表，不在列表中的工具将被禁用。增强安全性的关键手段。',
    usage: 'claude --allowedTools <工具列表>',
    example: 'claude -p "审查代码" --allowedTools "Read,Grep"',
    exampleOutput: `🔒 已限制工具: Read, Grep
Claude 只能使用指定的工具`,
    tips: [
      '多个工具用逗号分隔',
      '限制 Write 可以防止文件被修改',
      '限制 Bash 可以防止执行命令',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-skip-permissions',
    name: 'claude --dangerously-skip-permissions',
    category: 'cli',
    summary: '跳过所有权限确认提示',
    description:
      '自动批准所有工具的权限请求，不在每次操作前询问确认。⚠️ 仅在沙箱或完全信任的环境中使用。',
    usage: 'claude --dangerously-skip-permissions',
    example: 'claude --dangerously-skip-permissions',
    exampleOutput: `⚠️ 权限检查已跳过
Claude 将自动执行所有工具调用
请在可信环境中使用`,
    tips: [
      '仅在沙箱、CI/CD 或完全信任的环境中使用',
      '结合 --allowedTools 使用更安全',
      '在日常开发中不推荐使用',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-auth-login',
    name: 'claude auth login',
    category: 'cli',
    summary: '登录 Anthropic 账号',
    description:
      '使用浏览器或控制台登录 Anthropic 账号。支持 --email 预填邮箱、--sso 强制 SSO、--console 使用 API 计费模式。',
    usage: 'claude auth login',
    example: 'claude auth login',
    exampleOutput: `🔑 正在打开浏览器...
请完成 Anthropic 账号授权
✓ 登录成功`,
    tips: [
      '首次使用需要登录',
      '--console 使用 API 密钥计费而非订阅',
      '--sso 适合企业 SSO 登录',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-mcp',
    name: 'claude mcp',
    category: 'cli',
    summary: '管理 MCP 服务器（CLI 方式）',
    description:
      '通过 CLI 管理 MCP 服务器配置。支持 add/remove/list/logs/get 子命令，与会话内的 /mcp 功能互补。',
    usage: 'claude mcp <子命令>',
    example: 'claude mcp add my-server -- npx -y @example/mcp-server',
    exampleOutput: `✓ MCP 服务器已添加: my-server
使用 claude mcp list 查看所有服务器`,
    tips: [
      '适合在脚本中批量配置 MCP',
      'claude mcp list 查看所有已注册服务器',
      'claude mcp logs <name> 查看服务器日志',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-help',
    name: 'claude --help',
    category: 'cli',
    summary: '显示帮助信息',
    description:
      '显示 Claude Code 的命令行帮助信息，包括所有可用 flag、子命令和使用示例。',
    usage: 'claude --help',
    aliases: ['claude -h'],
    example: 'claude --help',
    exampleOutput: `📖 Claude Code CLI
Usage: claude [options] [prompt]

常用选项:
  -p, --print         单次查询模式
  -c, --continue      继续最近会话
  -m, --model <name>  指定模型
  -w, --worktree      隔离工作树
  -n, --name <name>   会话名称

运行 claude --help 查看完整列表`,
    tips: [
      '任何 flag 记不清时先用 --help',
      '-h 是 --help 的简写',
      '会显示当前版本支持的所有选项',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-verbose',
    name: 'claude --verbose',
    category: 'cli',
    summary: '启用详细日志输出',
    description:
      '显示详细的工具调用信息和内部状态变更，包括每一步的输入输出、耗时等。适合调试和性能分析。',
    usage: 'claude --verbose',
    example: 'claude --verbose',
    exampleOutput: `[Verbose] 载入 CLAUDE.md
[Verbose]   - key: project/name
[Verbose]   - key: stack/react
[Verbose] MCP servers: 3 connected
[Verbose] Tools: 24 available`,
    tips: [
      '比 --debug 更简洁，聚焦工具调用',
      '适合排查 Claude 的行为是否符合预期',
      '不会影响正常功能',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-no-color',
    name: 'claude --no-color',
    category: 'cli',
    summary: '禁用彩色输出',
    description:
      '以纯文本模式运行，禁用所有 ANSI 颜色转义码。适合日志记录、CI/CD 管道或终端不支持彩色的场景。',
    usage: 'claude --no-color',
    example: 'claude --no-color',
    exampleOutput: `[NoColor] Session started
Model: claude-sonnet-4-6
CWD: /home/user/project`,
    tips: [
      '输出重定向到文件时建议使用',
      'CI/CD 环境中推荐使用',
      '配合 --output-format json 效果更佳',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-auth-logout',
    name: 'claude auth logout',
    category: 'cli',
    summary: '登出 Anthropic 账号',
    description:
      '登出当前 Anthropic 账号，清除本地凭据。切换账号前需要先执行此命令。',
    usage: 'claude auth logout',
    example: 'claude auth logout',
    exampleOutput: `👋 已登出 Anthropic 账号
使用 claude auth login 重新登录`,
    tips: [
      '登出后需要重新登录才能使用',
      '不影响其他终端中的活跃会话',
      '切换账号前记得先登出',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-no-cache',
    name: 'claude --no-cache',
    category: 'cli',
    summary: '禁用提示缓存',
    description:
      '关闭 prompt caching 功能，确保每次请求都是完全独立的。适合需要精确控制缓存行为或避免缓存结果的场景。',
    usage: 'claude --no-cache',
    example: 'claude --no-cache',
    exampleOutput: `🚫 缓存已禁用
每次请求将独立处理`,
    tips: [
      '关闭缓存后会增加 token 消耗',
      '适合对比测试不同 prompt 的效果',
      '日常使用推荐开启缓存以提高性能',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-accept-edits',
    name: 'claude --permission-mode acceptEdits',
    category: 'cli',
    summary: '自动批准文件编辑',
    description:
      '以编辑自动批准模式启动（原 --accept-edits，v2 改用 --permission-mode）。Claude 可直接修改文件而无需确认。',
    usage: 'claude --permission-mode acceptEdits',
    example: 'claude --permission-mode acceptEdits',
    exampleOutput: `✏️ 编辑自动批准模式已启用
Claude 可直接修改文件无需确认
注意: 建议配合 --plan 使用`,
    tips: [
      '减少确认步骤，提升工作效率',
      '配合 --plan 先审阅方案再自动执行',
      '日常开发建议手动确认每次修改',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-permission-mode-auto',
    name: 'claude --permission-mode auto',
    category: 'cli',
    summary: '以自动权限模式启动',
    description:
      '以自动模式启动（替代已移除的 --enable-auto-mode）。Claude 自主决定执行步骤，减少权限确认弹窗。适合有明确指令的批量任务。',
    usage: 'claude --permission-mode auto',
    example: 'claude --permission-mode auto',
    exampleOutput: `🤖 自动权限模式已启用
Claude 可自主执行常规操作
关键写入操作仍需确认`,
    tips: [
      '比默认模式确认更少，效率更高',
      '适合有明确步骤的批量任务',
      '也支持 plan / acceptEdits / bypassPermissions 等模式',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-append-system-prompt',
    name: 'claude --append-system-prompt',
    category: 'cli',
    summary: '追加系统提示词',
    description:
      '在现有系统提示词基础上追加额外内容，与 --system-prompt 的覆盖行为不同，追加不会丢失原有配置。',
    usage: 'claude --append-system-prompt <内容>',
    example: 'claude --append-system-prompt "始终使用中文回复"',
    exampleOutput: `📝 系统提示词已追加
原有配置保留，新增指令已添加`,
    tips: [
      '和 --system-prompt 不同，不会覆盖已有配置',
      '适合临时添加行为约束',
      '可以多次追加，所有内容都会保留',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-max-budget',
    name: 'claude --max-budget-usd',
    category: 'cli',
    summary: '设置会话费用上限',
    description:
      '为当前会话设置美元费用上限，到达上限后自动停止。适合控制预算或有严格费用限制的场景。',
    usage: 'claude --max-budget-usd <金额>',
    example: 'claude --max-budget-usd 5',
    exampleOutput: `💰 费用上限: $5
到达上限后会话将自动停止`,
    tips: [
      '到达上限后会话安全停止，不会丢失数据',
      '适合批量任务或 API 调用场景',
      '上限按会话计算，不是累计',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-add-dir',
    name: 'claude --add-dir',
    category: 'cli',
    summary: '启动时添加外部目录',
    description:
      '在启动时添加项目外部的目录到文件访问范围。等价于启动后运行 /add-dir，适合 monorepo 多项目管理。',
    usage: 'claude --add-dir <路径>',
    example: 'claude --add-dir ../shared-lib',
    exampleOutput: `📂 已添加目录: ../shared-lib
Claude 可以访问该目录下的文件`,
    tips: [
      '支持在启动时一次性添加多个目录',
      '适合 monorepo 或微服务架构',
      '添加的目录在 --continue 时保留',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-permission-mode',
    name: 'claude --permission-mode',
    category: 'cli',
    summary: '设置权限确认模式',
    description:
      '设置权限确认级别：default（每次确认）或 bypassPermissions（自动批准）。适合自动化环境。',
    usage: 'claude --permission-mode <模式>',
    example: 'claude --permission-mode bypassPermissions',
    exampleOutput: `🔓 权限模式: bypassPermissions
工具调用将自动获得批准`,
    tips: [
      'bypassPermissions 相当于跳过确认弹窗',
      '比 --dangerously-skip-permissions 更安全',
      'default 模式每次操作前都会询问',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-disallowed-tools',
    name: 'claude --disallowedTools',
    category: 'cli',
    summary: '禁止特定工具',
    description:
      '指定会话中禁止使用的工具列表。与 --allowedTools 互补，可以快速禁用少量高风险工具。',
    usage: 'claude --disallowedTools <工具列表>',
    example: 'claude --disallowedTools "Bash,Write"',
    exampleOutput: `🚫 已禁用工具: Bash, Write
这些工具在会话中不可用`,
    tips: [
      '禁用高风险工具提升安全性',
      '与 --allowedTools 互斥，同时使用效果不可控',
      '按需启用最小权限原则',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-agent',
    name: 'claude --agent',
    category: 'cli',
    summary: '使用自定义 Agent',
    description:
      '从 .claude/agents/ 目录加载自定义 Agent 作为系统提示。Agent 是一组预定义的指令和工具约束。',
    usage: 'claude --agent <agent名>',
    example: 'claude --agent code-reviewer',
    exampleOutput: `🤖 使用 Agent: code-reviewer
已加载专用系统提示和工具配置`,
    tips: [
      'Agent 文件存放在 .claude/agents/ 目录',
      '每个 Agent 有独立的工具权限和提示词',
      '可以创建团队共享的专用 Agent',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-fork-session',
    name: 'claude --fork-session',
    category: 'cli',
    summary: '从恢复的会话创建分支',
    description:
      '在通过 --resume 恢复会话时创建分支，保留原始会话不变。适合从某一点尝试不同方向。',
    usage: 'claude --resume <id> --fork-session',
    example: 'claude -r auth-refactor --fork-session',
    exampleOutput: `🌿 已创建会话分支
原始会话: auth-refactor
新分支: auth-refactor-fork-1
两个会话互不影响`,
    tips: [
      '必须和 --resume 配合使用',
      '每个分支完全独立',
      '适合尝试不同的解决方案',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-teleport',
    name: 'claude --teleport',
    category: 'cli',
    summary: '将 Web 会话拉取到本地终端',
    description:
      '将在 claude.ai/code 上启动的 Web 会话拉取到本地终端中继续。实现 Web 和终端的无缝切换。',
    usage: 'claude --teleport',
    example: 'claude --teleport',
    exampleOutput: `🔄 正在拉取 Web 会话...
会话已从 claude.ai/code 同步到本地终端
所有上下文已完整保留`,
    tips: [
      '需要先在 claude.ai/code 启动会话',
      '拉取后所有上下文完整保留',
      '适合在 Web 预览设计后在终端继续开发',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-from-pr',
    name: 'claude --from-pr',
    category: 'cli',
    summary: '从 PR 启动审查会话',
    description:
      '基于指定的 PR 启动审查会话，自动获取 PR diff 和上下文。支持 GitHub、GitLab、Bitbucket。',
    usage: 'claude --from-pr <PR编号>',
    example: 'claude --from-pr 123',
    exampleOutput: `📋 已加载 PR #123
仓库: owner/repo
变更文件: 12
自动审查已就绪`,
    tips: [
      '自动检测 PR 的变更内容',
      '支持 GitHub/GitLab/Bitbucket',
      '可以直接分析 diff 并给出审查意见',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-channels',
    name: 'claude --channels',
    category: 'cli',
    summary: '将审批消息转发到即时通讯',
    description:
      '将工具权限的审批请求通过 Telegram、Discord 等渠道转发，实现远程审批。适合在 CI/CD 或远程环境中使用。',
    usage: 'claude --channels',
    example: 'claude --channels',
    exampleOutput: `📨 审批通道已配置
权限请求将通过 Telegram/Discord 转发
请在其他设备上确认操作`,
    tips: [
      '需要先配置 IM 集成',
      '审批请求会附带完整上下文',
      '适合远程 CI/CD 审批场景',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-ultrareview',
    name: 'claude ultrareview',
    category: 'cli',
    summary: '非交互式深度代码审查',
    description:
      '以非交互模式运行深度代码审查，输出审查结果到 stdout。支持 --json 输出和 --timeout 控制。',
    usage: 'claude ultrareview <PR编号>',
    example: 'claude ultrareview 1234 --json',
    exampleOutput: `{
  "severity": "medium",
  "issues": [
    {"file": "src/auth.ts", "line": 88, "type": "security"},
    {"file": "src/api.ts", "line": 156, "type": "performance"}
  ]
}`,
    tips: [
      '完美适配 CI/CD 管道',
      '--json 输出可直接被脚本解析',
      '退出码 0=通过 1=发现问题',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-agents',
    name: 'claude agents',
    category: 'cli',
    summary: '管理后台代理和子代理',
    description:
      '查看和管理所有后台运行的任务及子代理。列表显示每个后台会话的状态、ID 和当前进度。',
    usage: 'claude agents',
    example: 'claude agents',
    exampleOutput: `🤖 后台代理列表:
  1. 性能优化 (7c5dcf5d) - 运行中
  2. 日志分析 (a3f8b2e1) - 已完成
  3. 代码审查 (d9e1c4a7) - 等待中
  
  使用 claude agents <id> 查看详情`,
    tips: [
      '结合 /background 使用的必备命令',
      '后台任务不会随终端关闭而丢失',
      'claude agents <id> 查看单个任务详情',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-attach',
    name: 'claude attach',
    category: 'cli',
    summary: '附加到后台代理会话',
    description:
      '附加到指定的后台代理会话，实时查看其输出。使用 claude agents 找到要附加的会话 ID。',
    usage: 'claude attach <会话ID>',
    example: 'claude attach 7c5dcf5d',
    exampleOutput: `🔗 正在附加到会话 7c5dcf5d...
✓ 已连接
查看实时输出中...
按 Ctrl+C 分离（会话继续后台运行）`,
    tips: [
      '分离后会话继续在后台运行',
      '通过 claude agents 获取会话 ID',
      '/exit 从附加模式返回终端',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-logs',
    name: 'claude logs',
    category: 'cli',
    summary: '查看后台会话的最新输出',
    description:
      '打印指定后台会话的最近输出日志。无需附加到会话即可快速查看进度。',
    usage: 'claude logs <会话ID>',
    example: 'claude logs 7c5dcf5d',
    exampleOutput: `📋 会话 7c5dcf5d 最新输出:
[2026-05-16 14:23:01] 开始分析性能瓶颈
[2026-05-16 14:23:45] 发现数据库查询优化机会
[2026-05-16 14:24:12] 生成优化方案...

状态: 运行中 (12分钟)`,
    tips: [
      '只读查看，不干扰会话运行',
      '日志自动截断最新内容',
      '适合在 CI 中监控后台任务',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-stop',
    name: 'claude stop',
    category: 'cli',
    summary: '停止后台代理会话',
    description:
      '停止一个正在运行的后台代理会话。会话的对话记录和工作树会保留。别名 claude kill。',
    usage: 'claude stop <会话ID>',
    example: 'claude stop 7c5dcf5d',
    exampleOutput: `⏹ 正在停止会话 7c5dcf5d...
✓ 已停止
对话记录和工作树已保留
使用 claude respawn 重启`,
    tips: [
      '停止后可用 claude respawn 重启',
      '不会删除对话记录',
      'claude kill 同样可用',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-rm',
    name: 'claude rm',
    category: 'cli',
    summary: '删除后台会话记录',
    description:
      '从后台会话列表中删除指定会话的记录。不会删除工作树或文件，只移除管理列表中的记录。',
    usage: 'claude rm <会话ID>',
    example: 'claude rm 7c5dcf5d',
    exampleOutput: `🗑️ 已删除会话 7c5dcf5d
工作树和文件未受影响`,
    tips: [
      '只删除记录，不删除文件',
      '对已完成的会话进行清理',
      '谨慎操作，删除后无法恢复',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-respawn',
    name: 'claude respawn',
    category: 'cli',
    summary: '重启已停止的后台会话',
    description:
      '用相同的对话内容重启一个已停止的后台会话。支持 --all 重启所有已停止的会话。',
    usage: 'claude respawn <会话ID>',
    example: 'claude respawn 7c5dcf5d',
    exampleOutput: `🔄 正在重启会话 7c5dcf5d...
✓ 已重启，对话记录完整保留`,
    tips: [
      '使用 --all 重启所有已停止的会话',
      '对话历史完整保留',
      '适合修复错误后重新执行',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-remote-control',
    name: 'claude remote-control',
    category: 'cli',
    summary: '启动远程控制服务器',
    description:
      '启动远程控制服务器，允许从 claude.ai 或桌面应用远程控制本地的 Claude Code 会话。支持 --name 指定名称。',
    usage: 'claude remote-control [--name <名称>]',
    example: 'claude remote-control --name "My Server"',
    exampleOutput: `🌐 远程控制已启动
名称: My Server
状态: 等待连接中...
通过 claude.ai/code 连接到此会话`,
    tips: [
      '从 claude.ai/code 或桌面应用远程控制',
      '服务器模式，无本地交互',
      '适合在服务器上运行，远程操作',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-project-purge',
    name: 'claude project purge',
    category: 'cli',
    summary: '删除项目的本地状态数据',
    description:
      '删除项目的所有本地 Claude Code 状态：对话记录、任务列表、调试日志、文件编辑历史和提示历史。支持 --dry-run 预览。',
    usage: 'claude project purge [路径]',
    example: 'claude project purge ~/work/repo --dry-run',
    exampleOutput: `🗑️ 项目清理预览 (--dry-run)
将删除:
 • 对话记录: 12 个会话
 • 任务列表: 8 个任务
 • 调试日志: 3.2 MB
 • 编辑历史: 47 条记录

总释放空间: ~4.1 MB`,
    tips: [
      '--dry-run 预览会删除的内容',
      '-y 跳过确认直接删除',
      '--all 清理所有项目',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-setup-token',
    name: 'claude setup-token',
    category: 'cli',
    summary: '生成 CI/CD 长期 OAuth Token',
    description:
      '生成长期有效的 OAuth Token 用于 CI/CD 和脚本场景。Token 直接打印到终端不会保存到文件。需要 Claude 订阅。',
    usage: 'claude setup-token',
    example: 'claude setup-token',
    exampleOutput: `🔑 长期 Token 已生成:
claude-xxxxxxxxxxxxxxxxxxxxxxx

请将此 Token 安全保存到 CI/CD 环境变量中
Token 不会自动保存到本地文件`,
    tips: [
      'Token 仅显示一次，请立即保存',
      '适合 GitHub Actions 等 CI 环境',
      '需要 Claude 订阅账号',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-plugin',
    name: 'claude plugin',
    category: 'cli',
    summary: '以 CLI 方式管理插件',
    description:
      '通过命令行管理 Claude Code 插件。支持 install/uninstall/list 子命令。与会话内 /plugin 互补。',
    usage: 'claude plugin <子命令>',
    aliases: ['claude plugins'],
    example: 'claude plugin install code-review@claude-plugins-official',
    exampleOutput: `📦 正在安装插件...
✓ code-review@claude-plugins-official 已安装
使用 claude plugin list 查看已安装插件`,
    tips: [
      '可用于脚本中批量安装',
      'claude plugin list 查看已安装',
      'claude plugin uninstall <名称> 卸载',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-auto-mode',
    name: 'claude auto-mode',
    category: 'cli',
    summary: '查看或配置自动模式规则',
    description:
      '打印内置的自动模式分类规则（defaults）或当前生效的配置（config）。自动模式让 Claude 自主决策执行步骤。',
    usage: 'claude auto-mode <defaults|config>',
    example: 'claude auto-mode defaults > rules.json',
    exampleOutput: `📋 自动模式规则已导出到 rules.json
包含所有内置分类规则`,
    tips: [
      'defaults 输出内置规则 JSON',
      'config 输出当前生效的配置',
      '可导出后自定义规则再导入',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-mcp-serve',
    name: 'claude mcp serve',
    category: 'cli',
    summary: '将 Claude Code 本身作为 MCP 服务器启动',
    description:
      '将 Claude Code 作为 MCP 服务器启动，允许其他 MCP 客户端（如 Claude Desktop）通过 MCP 协议调用 Claude Code 的功能。',
    usage: 'claude mcp serve',
    example: 'claude mcp serve',
    exampleOutput: `🔌 MCP 服务器已启动
Claude Code 现在可作为 MCP 工具使用
监听 Stdio 传输...`,
    tips: [
      '其他 MCP 客户端可通过此接口调用 Claude Code',
      '适合嵌入到自定义工具链中',
      '需要先登录 Anthropic 账号',
    ],
    difficulty: 3,
  },

  // ========== 高级功能 ==========
  {
    id: 'mcp',
    name: '/mcp',
    category: 'opencode',
    summary: '管理 MCP 插件（安装/卸载/列表）',
    description:
      '安装、卸载、列出 MCP (Model Context Protocol) 插件。MCP 插件扩展 Claude Code 的能力，如文件操作、网络请求等。',
    usage: '/mcp list',
    example: '/mcp list',
    exampleOutput: `📦 已安装 MCP 插件:

✓ filesystem  - 本地文件操作
✓ github      - GitHub API 集成
✓ sequential-thinking - 思考工具

运行 /mcp install <name> 安装更多`,
    tips: [
      '/mcp list 查看已安装插件',
      '/mcp add <name> 安装新插件',
      '/mcp remove <name> 卸载插件',
      '插件配置在 ~/.claude/settings.json',
    ],
    difficulty: 3,
  },
  {
    id: 'agents',
    name: '/agents',
    category: 'opencode',
    summary: '管理 AI 子代理团队',
    description:
      '创建和管理专门的 AI 子代理，每个子代理有独立的上下文和工具权限，适合复杂项目的分工协作。',
    usage: '/agents',
    example: '/agents',
    exampleOutput: `🤖 子代理管理

可用子代理:
• @code-reviewer - 代码审查专家
• @architect    - 架构设计专家
• @tester      - 测试工程师

使用 @agent-name 任务 调用`,
    tips: [
      '适合复杂项目的多角色协作',
      '每个子代理有独立的上下文窗口',
      '可以指定工具权限: /agents new --tools Edit,Read',
    ],
    difficulty: 3,
  },
  {
    id: 'memory',
    name: '/memory',
    category: 'opencode',
    summary: '管理 CLAUDE.md 记忆文件',
    description:
      '编辑和管理 CLAUDE.md 文件中的项目记忆，包括项目配置、工作流程规范、上下文信息等。',
    usage: '/memory edit',
    example: '/memory edit',
    exampleOutput: `📝 正在编辑项目记忆...

当前 CLAUDE.md 内容:
- 项目: React Dashboard
- 技术栈: React + Tailwind
- 代码规范: 函数组件 + Hooks

输入要添加的记忆内容...`,
    tips: [
      '/memory edit 交互式编辑记忆',
      '/memory load 重新加载记忆文件',
      '重要项目规范建议写入 CLAUDE.md',
    ],
    difficulty: 2,
  },
  {
    id: 'install-github-app',
    name: '/install-github-app',
    category: 'opencode',
    summary: '安装 GitHub App 自动审查 PR',
    description:
      '设置 Claude Code GitHub App，配置后 Claude 可以自动审查你的 Pull Request，检查 bug、安全问题和代码质量。',
    usage: '/install-github-app',
    example: '/install-github-app',
    exampleOutput: `🔗 GitHub App 安装

1. 访问: https://github.com/apps/claude-code
2. 选择要授权的仓库
3. 完成 OAuth 授权

安装后，Claude 将自动审查所有新 PR。`,
    tips: [
      '适合团队协作的代码审查流程',
      '可以设置只审查特定仓库',
      '审查结果会自动评论到 PR',
    ],
    difficulty: 3,
  },
  {
    id: 'batch',
    name: '/batch',
    category: 'opencode',
    summary: '并行批量执行大规模变更',
    description:
      '将大型重构任务拆解为 5-30 个独立单元，并行在隔离 git worktree 中执行。每个单元独立测试并创建 PR。',
    usage: '/batch <描述>',
    example: '/batch 将 src/utils 迁移到 TypeScript',
    exampleOutput: `📋 批量计划: 迁移到 TypeScript
共 12 个独立单元，将在 12 个 worktree 中并行执行

✓ 单元 1/12: utils/date.ts 已完成
✓ 单元 2/12: utils/format.ts 已完成
...`,
    tips: [
      '适合大规模重构，自动拆分并行执行',
      '每个单元在独立 worktree 中互不干扰',
      '完成后自动创建 PR，可逐个审查合并',
    ],
    difficulty: 3,
  },
  {
    id: 'loop',
    name: '/loop',
    category: 'opencode',
    summary: '定时循环执行任务',
    description:
      '让 Claude 按指定间隔反复执行某个任务。适合监控、维护检查等周期性工作。不指定间隔时 Claude 自动调整节奏。',
    usage: '/loop <间隔> <提示>',
    example: '/loop 5m 检查部署是否完成',
    exampleOutput: `🔄 循环任务已启动
每 5 分钟执行: 检查部署是否完成

[第1次] 正在检查... 部署进行中
[第2次] 正在检查... 部署已完成 ✓`,
    tips: [
      '间隔支持: 5m(分钟), 1h(小时), 1d(天)',
      '不指定间隔时 Claude 自我调节节奏',
      '适合 CI/CD 监控、数据爬取等场景',
    ],
    difficulty: 3,
  },
  {
    id: 'export',
    name: '/export',
    category: 'opencode',
    summary: '导出对话记录',
    description:
      '将当前会话完整导出为 Markdown 格式，包括所有消息、代码和工具输出。适合归档或分享。',
    usage: '/export',
    example: '/export',
    exampleOutput: `📄 对话已导出
文件: claude-session-export-2026-05-15.md
格式: Markdown
包含: 全部消息、代码块、工具输出`,
    tips: [
      '导出的 Markdown 可直接用于文档或分享',
      '包含完整的对话上下文',
      '适合记录复杂问题的排查过程',
    ],
    difficulty: 2,
  },
  {
    id: 'add-dir',
    name: '/add-dir',
    category: 'opencode',
    summary: '添加外部目录到文件访问范围',
    description:
      '临时添加额外的工作目录，让 Claude 可以访问当前项目之外的文件。适合处理 monorepo 或多项目依赖场景。',
    usage: '/add-dir <路径>',
    example: '/add-dir ../shared-lib',
    exampleOutput: `📂 已添加目录: ../shared-lib
现在可以访问该目录下的文件
可通过 --continue 或 --resume 保留`,
    tips: [
      '适合 monorepo 或跨项目引用的场景',
      '添加的目录在 --continue/--resume 时保留',
      '每次会话添加的目录独立生效',
    ],
    difficulty: 2,
  },
  {
    id: 'branch',
    name: '/branch',
    category: 'opencode',
    summary: '分支当前对话进行探索',
    description:
      '从当前对话的某个点创建分支，保留原对话不变。适合尝试不同的解决方案方向，不满意可回退。',
    usage: '/branch [名称]',
    example: '/branch try-zustand',
    exampleOutput: `🌿 已创建分支: try-zustand
原对话已保存，可通过 /resume 恢复`,
    tips: [
      '适合对比不同的技术方案',
      '分支后原对话完整保留',
      '通过 /resume 切换回原始分支',
    ],
    difficulty: 3,
  },
  {
    id: 'background',
    name: '/background',
    category: 'opencode',
    summary: '将会话转后台异步执行',
    description:
      '将当前会话转为后台代理执行，释放当前终端。可通过 claude agents 查看和管理后台会话。',
    usage: '/background [提示]',
    aliases: ['/bg'],
    example: '/background 继续优化性能',
    exampleOutput: `⏳ 正在转入后台...
会话 ID: 7c5dcf5d
使用 claude agents 查看状态
终端已释放`,
    tips: [
      '后台会话不占用当前终端',
      '通过 claude agents 查看和管理',
      '适合长时间运行的任务',
    ],
    difficulty: 3,
  },
  {
    id: 'permissions',
    name: '/permissions',
    category: 'opencode',
    summary: '管理工具权限设置',
    description:
      '查看和修改 Claude 的工具使用权限。可以随时开启或限制 Claude 对文件系统、终端等的访问能力。',
    usage: '/permissions',
    example: '/permissions',
    exampleOutput: `🔒 当前权限设置:
✓ Bash     - 允许
✓ Read     - 允许
✓ Write    - 允许
✗ Web      - 已限制

输入 /permissions 交互式修改`,
    tips: [
      '限制权限可以增加安全性',
      '支持按工具类型细粒度控制',
      '修改立即生效，无需重启会话',
    ],
    difficulty: 2,
  },
  {
    id: 'btw',
    name: '/btw',
    category: 'opencode',
    summary: '插入一个不打断对话的旁注问题',
    description:
      '在不影响当前上下文的前提下问一个快速问题。回答不会污染对话的主要上下文，适合突发疑问。',
    usage: '/btw <问题>',
    example: '/btw 这个函数的复杂度是多少？',
    exampleOutput: `💡 旁注: 当前函数复杂度为 O(n²)
建议使用 HashMap 优化到 O(n)
(该回答不记入主对话上下文)`,
    tips: [
      '旁注问题不会影响主对话上下文',
      '适合临时想起的小问题',
      '回答简洁直接，不展开讨论',
    ],
    difficulty: 1,
  },
  {
    id: 'buddy',
    name: '/buddy',
    category: 'opencode',
    summary: '召唤终端宠物陪伴',
    description:
      '召唤一只可爱的终端宠物陪伴你编码。共 18 种物种、5 个稀有度等级，每只宠物由账号 ID 唯一决定。',
    usage: '/buddy',
    example: '/buddy',
    exampleOutput: `🐱 你的终端宠物: 玄猫
稀有度: ⭐⭐⭐ 稀有
心情: 愉快 (在你的代码中打盹)`,
    tips: [
      '宠物物种由账号 ID 唯一确定',
      '5 个稀有度等级，从普通到传说',
      '再次输入 /buddy 关闭显示',
    ],
    difficulty: 1,
  },
  {
    id: 'voice',
    name: '/voice',
    category: 'opencode',
    summary: '切换语音输入模式',
    description:
      '启用或禁用语音输入模式。开启后可以通过语音与 Claude 对话，按住空格键录制语音。',
    usage: '/voice',
    example: '/voice',
    exampleOutput: `🎤 语音模式已启用
按住空格键录制语音
再次输入 /voice 关闭`,
    tips: [
      '需要麦克风权限',
      '按住空格录制，松开自动发送',
      '适合打字不方便的场景',
    ],
    difficulty: 2,
  },
  {
    id: 'effort',
    name: '/effort',
    category: 'opencode',
    summary: '设置 Claude 的努力级别',
    description:
      '控制 Claude 在推理时的投入程度：low 快速响应、medium 平衡、high 深度思考。影响响应质量和速度。',
    usage: '/effort <级别>',
    example: '/effort high',
    exampleOutput: `⚡ 努力级别: high
Claude 将进行更深度的推理分析
注意: 响应时间可能会增加`,
    tips: [
      'low 适合简单问答，响应最快',
      'high 适合复杂推理，质量最高',
      'medium 是默认平衡模式',
    ],
    difficulty: 2,
  },
  {
    id: 'theme',
    name: '/theme',
    category: 'opencode',
    summary: '管理终端主题',
    description:
      '浏览和应用 Claude Code 终端主题。支持亮色/暗色主题切换，以及社区贡献的第三方主题。',
    usage: '/theme [主题名]',
    example: '/theme',
    exampleOutput: `🎨 主题管理
当前: default (亮色)
已安装: 3
1. default    - 默认亮色
2. dark       - 默认暗色
3. monokai    - 社区主题`,
    tips: [
      '插件可以自带 themes/ 目录',
      '主题仅影响终端外观，不影响功能',
      '/theme default 恢复默认',
    ],
    difficulty: 2,
  },
  {
    id: 'hooks',
    name: '/hooks',
    category: 'opencode',
    summary: '查看钩子配置',
    description:
      '查看当前项目配置的 Pre/Post 钩子。钩子可在工具调用前后自动执行自定义逻辑。',
    usage: '/hooks',
    example: '/hooks',
    exampleOutput: `🔗 Hook 配置
PreToolUse:  2 个钩子
PostToolUse: 1 个钩子
PreMessage:  0 个钩子

运行 /config 修改钩子配置`,
    tips: [
      '钩子可以自动化工作流中的重复操作',
      'PreToolUse 在工具执行前触发',
      'PostToolUse 在工具执行后触发',
    ],
    difficulty: 2,
  },
  {
    id: 'skills',
    name: '/skills',
    category: 'opencode',
    summary: '列出已安装的技能',
    description:
      '列出所有已安装的自定义技能，支持搜索筛选。技能是可以复用的指令集合，扩展 Claude 的能力。',
    usage: '/skills',
    example: '/skills',
    exampleOutput: `📦 已安装技能 (5)
1. code-review   - 代码审查专家
2. architect     - 架构设计
3. tester        - 测试编写
4. docs          - 文档生成
5. debug         - 调试助手

输入 /skills <名称> 查看详情`,
    tips: [
      '技能文件存放在 ~/.claude/skills/ 或 .claude/skills/',
      '社区有大量共享技能可用',
      '可以自己编写技能',
    ],
    difficulty: 2,
  },
  {
    id: 'powerup',
    name: '/powerup',
    category: 'opencode',
    summary: '互动式功能教学演示',
    description:
      '启动带有动画演示的互动式功能教学。通过实际操作演示的方式学习 Claude Code 的高级特性。',
    usage: '/powerup',
    example: '/powerup',
    exampleOutput: `⚡ PowerUp: MCP 插件管理
┌──────────────────────────┐
│  教你在 3 步内安装插件    │
│  1. /mcp list            │
│  2. /mcp add github      │
│  3. 配置 API Key         │
│                          │
│  开始演示? (y/n)          │
└──────────────────────────┘`,
    tips: [
      '适合新功能上手学习',
      '每个教学步骤都有操作演示',
      '可以随时退出教学',
    ],
    difficulty: 2,
  },
  {
    id: 'login',
    name: '/login',
    category: 'opencode',
    summary: '在会话中登录账号',
    description:
      '直接在会话中触发登录流程，无需退出当前会话。适合登录状态过期或切换账号时使用。',
    usage: '/login',
    example: '/login',
    exampleOutput: `🔑 正在打开登录页面...
请完成身份验证
✓ 登录成功`,
    tips: [
      '不会中断当前会话',
      '登录后立即生效',
      '/logout 登出当前账号',
    ],
    difficulty: 2,
  },
  {
    id: 'logout',
    name: '/logout',
    category: 'opencode',
    summary: '在当前会话中登出',
    description:
      '登出当前 Anthropic 账号，不会退出 Claude Code 会话。适合切换账号前使用。',
    usage: '/logout',
    example: '/logout',
    exampleOutput: `👋 已登出
使用 /login 重新登录`,
    tips: [
      '登出后会话继续可用，但部分功能受限',
      '不会影响其他终端中的会话',
      '重新登录使用 /login',
    ],
    difficulty: 2,
  },
  {
    id: 'bashes',
    name: '/bashes',
    category: 'opencode',
    summary: '查看后台运行的 Bash 任务',
    description:
      '列出所有在后台运行的 Bash 任务，包括运行状态、执行时间等。可以监控长时间运行的脚本。',
    usage: '/bashes',
    example: '/bashes',
    exampleOutput: `📋 后台 Bash 任务 (2)
1. PID: 12345  npm run test  - 运行中 (5m12s)
2. PID: 12389  python train.py - 已完成

claude attach <pid> 附加查看输出`,
    tips: [
      '可以通过 PID 附加到任务',
      '长时间运行的脚本会自动转入后台',
      '适合监控构建、训练等耗时任务',
    ],
    difficulty: 2,
  },
  {
    id: 'tasks',
    name: '/tasks',
    category: 'opencode',
    summary: '查看后台代理任务',
    description:
      '列出所有后台运行或已完成的 AI 子代理任务，包括每个任务的状态、进度和输出摘要。',
    usage: '/tasks',
    example: '/tasks',
    exampleOutput: `📋 后台任务 (3)
1. 🔄 代码审查    - 进行中 (45%)
2. ✅ 测试编写    - 已完成 (100%)
3. ⏳ 文档生成    - 队列中

claude attach <id> 附加到任务`,
    tips: [
      '/bashes 看系统任务，/tasks 看 AI 任务',
      '可以用 claude attach 附加到任务查看详情',
      '已完成的任务保留 24 小时',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-api',
    name: '/claude-api',
    category: 'opencode',
    summary: '加载 Claude API 开发参考',
    description:
      '加载 Claude API 的 SDK 参考文档，支持 TypeScript/Python/Java/Go/Ruby/C#/PHP/cURL。检测到 anthropic 导入时自动激活。',
    usage: '/claude-api',
    example: '/claude-api',
    exampleOutput: `📖 Claude API 参考 (TypeScript)
加载完成: 工具调用、流式响应、结构化输出

导入 @anthropic-ai/sdk 时自动激活
运行 /claude-api migrate 升级 API 版本`,
    tips: [
      '检测到 anthropic 导入时自动激活',
      '支持 8 种编程语言的参考文档',
      '/claude-api migrate 升级旧版 API',
    ],
    difficulty: 3,
  },
  // ===== 新增: 官方 v2 关键命令 =====
  {
    id: 'resume',
    name: '/resume',
    category: 'opencode',
    summary: '恢复之前的对话会话',
    description:
      '列出所有历史会话，选择恢复。支持按 ID 或名称直接恢复，也支持交互式选择器。与 claude --resume 功能一致，但在会话内操作更方便。',
    usage: '/resume [会话ID|会话名]',
    aliases: ['/continue'],
    example: '/resume',
    exampleOutput: `📋 历史会话列表:
 1. auth-refactor      (2小时前) - 45.2k tokens
 2. bug-fix-login      (昨天)    - 12.8k tokens
 3. feature-dashboard  (3天前)   - 89.1k tokens

选择要恢复的会话 (1-3):`,
    tips: [
      '不带参数时打开交互式选择器',
      '按名称恢复: /resume auth-refactor',
      '恢复后的上下文完整保留',
    ],
    difficulty: 1,
  },
  {
    id: 'recap',
    name: '/recap',
    category: 'opencode',
    summary: '生成当前会话的一句话摘要',
    description:
      '随时为当前会话生成一句话总结。有助于记住会话目标和已完成的进度，离开回来后快速恢复上下文。',
    usage: '/recap',
    example: '/recap',
    exampleOutput: `📝 会话摘要: 正在重构用户认证模块，添加 OAuth2 支持
已完成的: 基础认证流程重构 (85%)
进行中: Token 刷新机制`,
    tips: [
      '离开会话前运行 /recap，回来更快进入状态',
      '摘要会显示在恢复会话的列表中',
      '不影响当前会话上下文',
    ],
    difficulty: 1,
  },
  {
    id: 'debug',
    name: '/debug',
    category: 'opencode',
    summary: '启用调试日志并排查问题',
    description:
      '启用当前会话的调试日志并排查问题。调试日志默认关闭，运行 /debug 后开始捕获日志并分析诊断。可选描述问题来聚焦分析。',
    usage: '/debug [问题描述]',
    example: '/debug MCP 服务器连接失败',
    exampleOutput: `🔧 调试已启用
捕获日志分析中...

[Debug] MCP 服务器连接状态:
 ✓ filesystem - 已连接
 ✗ github     - 连接超时 (30s)
 ✓ brave-search - 已连接

建议: 检查 GitHub token 配置`,
    tips: [
      '默认不记录调试日志，/debug 开启后开始捕获',
      '可附带描述聚焦分析范围',
      '结合 /doctor 使用效果更佳',
    ],
    difficulty: 2,
  },
  {
    id: 'goal',
    name: '/goal',
    category: 'opencode',
    summary: '设置让 Claude 持续工作的目标',
    description:
      '设置一个持久目标，Claude 会在多轮对话中持续朝目标前进，直到条件满足。适合需要多步完成的任务。',
    usage: '/goal <条件>',
    aliases: ['/goal clear'],
    example: '/goal 所有测试通过',
    exampleOutput: `🎯 目标已设置: 所有测试通过
Claude 将持续工作直到所有测试通过
运行 /goal 查看当前进度
运行 /goal clear 取消目标`,
    tips: [
      '目标可跨多轮对话持续追踪',
      '/goal 查看当前目标状态',
      '/goal clear 取消当前目标',
    ],
    difficulty: 2,
  },
  {
    id: 'plugin',
    name: '/plugin',
    category: 'opencode',
    summary: '管理 Claude Code 插件',
    description:
      '安装、卸载、列表和管理 Claude Code 插件。插件是功能扩展包，可以包含技能、MCP 配置、主题等。可从官方市场安装。',
    usage: '/plugin install <名称>',
    example: '/plugin list',
    exampleOutput: `📦 已安装插件 (2):
 ✓ code-review@claude-plugins-official
 ✓ theme-monokai@community

运行 /plugin install <名称> 安装更多
运行 /plugin remove <名称> 卸载`,
    tips: [
      '插件可包含技能、主题、MCP 配置等',
      '官方市场: claude-plugins-official',
      '/plugin list 查看已安装',
    ],
    difficulty: 3,
  },
  {
    id: 'teleport',
    name: '/teleport',
    category: 'opencode',
    summary: '将 Web 会话拉取到本地终端',
    description:
      '将在 claude.ai/code 网页上启动的会话拉到本地终端继续。打开选择器，自动拉取分支和对话。需要 claude.ai 订阅。',
    usage: '/teleport',
    aliases: ['/tp'],
    example: '/teleport',
    exampleOutput: `🔄 正在拉取 Web 会话...
选择以下 Web 会话:
 1. Auth重构 (Chrome) - 12分钟前
 2. Bug修复 (Firefox) - 1小时前

会话已同步到本地终端 ✓`,
    tips: [
      '需要在 claude.ai/code 先启动 Web 会话',
      '拉取后所有上下文完整保留',
      '/tp 是简写',
    ],
    difficulty: 2,
  },
  {
    id: 'schedule',
    name: '/schedule',
    category: 'opencode',
    summary: '创建定时自动执行的任务',
    description:
      '创建、更新、列出或执行定时任务（Routines），在 Anthropic 管理的云基础设施上自动运行。Claude 会引导你完成设置。',
    usage: '/schedule <描述>',
    aliases: ['/routines'],
    example: '/schedule 每天凌晨运行测试并报告结果',
    exampleOutput: `📅 定时任务已创建
Routine: 每日测试报告
频率: 每天 00:00
任务: 运行测试套件并发送摘要

运行 /schedule 查看所有定时任务`,
    tips: [
      '定时任务在云端执行，不需要本地保持运行',
      '/routines 是别名',
      '支持复杂的定时规则',
    ],
    difficulty: 3,
  },
  {
    id: 'focus',
    name: '/focus',
    category: 'opencode',
    summary: '切换聚焦视图模式',
    description:
      '切换聚焦视图，只显示最近的提示、工具调用摘要（含编辑 diff）和最终响应。减少干扰，专注核心内容。',
    usage: '/focus',
    example: '/focus',
    exampleOutput: `🎯 聚焦视图已启用
只显示: 最近提示 → 工具摘要 → 最终响应
再次运行 /focus 恢复正常视图`,
    tips: [
      '仅在全屏渲染模式下可用',
      '设置自动跨会话保留',
      '适合需要减少信息干扰的场景',
    ],
    difficulty: 1,
  },
  {
    id: 'insights',
    name: '/insights',
    category: 'opencode',
    summary: '生成会话使用分析报告',
    description:
      '分析你的 Claude Code 会话数据，生成使用报告。包括项目领域、交互模式和瓶颈点分析，帮助你优化使用习惯。',
    usage: '/insights',
    example: '/insights',
    exampleOutput: `📊 Claude Code 使用洞察
项目领域: 前端 (45%) / API (30%) / 测试 (15%)
最常用命令: /diff, /compact, /model, /search
改进建议: 建议多用 /batch 进行批量重构`,
    tips: [
      '每周运行一次了解使用趋势',
      '帮助发现效率提升空间',
      '数据仅本地分析，不上传',
    ],
    difficulty: 1,
  },
  {
    id: 'desktop',
    name: '/desktop',
    category: 'opencode',
    summary: '切换到桌面版继续会话',
    description:
      '将当前会话切换到 Claude Code 桌面应用（macOS/Windows）继续。所有上下文完整保留。',
    usage: '/desktop',
    aliases: ['/app'],
    example: '/desktop',
    exampleOutput: `🖥️ 正在切换到桌面版...
会话已转移至 Claude Code 桌面应用
所有上下文已同步 ✓`,
    tips: [
      '仅 macOS 和 Windows 支持',
      '桌面版有原生 GUI 和多会话管理',
      '/app 是简写',
    ],
    difficulty: 1,
  },
  {
    id: 'sandbox',
    name: '/sandbox',
    category: 'opencode',
    summary: '切换沙箱安全模式',
    description:
      '启用或禁用沙箱模式。沙箱中 Claude 的文件操作被严格限制，防止意外修改。适合审查不安全代码或测试。',
    usage: '/sandbox',
    example: '/sandbox',
    exampleOutput: `🔒 沙箱模式已启用
文件操作已被严格限制
再次 /sandbox 关闭沙箱`,
    tips: [
      '沙箱中不能修改文件',
      '适合审查不信任的代码建议',
      '部分平台可能不支持',
    ],
    difficulty: 2,
  },
  {
    id: 'fewer-permission-prompts',
    name: '/fewer-permission-prompts',
    category: 'opencode',
    summary: '减少权限确认弹窗',
    description:
      '扫描最近的对话记录，找出常见的只读 Bash 和 MCP 工具调用，自动添加到项目的 .claude/settings.json 白名单，减少重复确认。',
    usage: '/fewer-permission-prompts',
    example: '/fewer-permission-prompts',
    exampleOutput: `🔇 扫描完成
发现 12 个常见只读操作:
 • Bash(git log *) - 已批准
 • Bash(git diff *) - 已批准
 • Read - 已批准

已添加到 .claude/settings.json ✓`,
    tips: [
      '只自动批准只读操作',
      '写入操作仍需确认',
      '可在 /permissions 中修改',
    ],
    difficulty: 2,
  },
  {
    id: 'team-onboarding',
    name: '/team-onboarding',
    category: 'opencode',
    summary: '生成团队新手引导指南',
    description:
      '从你最近 30 天的 Claude Code 使用记录生成团队引导指南。包含常用命令、MCP 配置、最佳实践等。',
    usage: '/team-onboarding',
    example: '/team-onboarding',
    exampleOutput: `👋 团队引导指南已生成

1. 安装: npm install -g @anthropic-ai/claude-code
2. 登录: claude auth login
3. 配置 MCP: 复制以下 settings.json...
4. 常用命令: /help, /diff, /compact, /model
5. 最佳实践: 每日 /recap, 复杂任务用 /plan

分享链接已生成 ✓`,
    tips: [
      '基于你实际使用数据生成',
      '适合团队新人快速上手',
      'Pro/Max/Team/Enterprise 支持分享链接',
    ],
    difficulty: 1,
  },
]

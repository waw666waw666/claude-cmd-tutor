import type { Command, CommandCategory } from '../types'

const categoryLabels: Record<CommandCategory, string> = {
  basic: 'Session Management',
  diagnostics: 'Diagnostics & Info',
  editing: 'Editing Tools',
  search: 'Search & External',
  cli: 'CLI Mode',
  opencode: 'Advanced Features',
}

export { categoryLabels }

export const commands: Command[] = [
  // ========== Session Management ==========
  {
    id: 'help',
    name: '/help',
    category: 'basic',
    summary: 'View all available commands and their usage',
    description:
      'Displays a list of all commands supported by Claude Code along with brief descriptions. A great starting point for beginners and a handy daily reference.',
    usage: '/help',
    example: '/help',
    exampleOutput: `Available Commands:
  /help        - Show this help message
  /clear       - Clear the current conversation
  /exit        - Exit Claude Code
  /model       - Switch AI model
  /compact     - Compress conversation to free context
  /doctor      - Run environment diagnostics
  /cost        - Show token usage statistics
  /review      - Request code review`,
    tips: [
      'Use /help anytime you forget a command',
      '/help shows all commands supported by the current environment',
      'Available commands may vary across versions; always check /help output',
    ],
    difficulty: 1,
  },
  {
    id: 'clear',
    name: '/clear',
    category: 'basic',
    summary: 'Clear the current conversation and start fresh',
    description:
      'Completely clears the current conversation history, freeing all tokens. Unlike /compact, /clear does not retain any context. Best used when you need a completely fresh start.',
    usage: '/clear',
    example: '/clear',
    exampleOutput: `✓ Conversation cleared.
You can now start a new topic.`,
    tips: [
      '/clear is irreversible — make sure to save important info first',
      'Use /compact instead of /clear if you need to keep some context',
      'Ideal when switching to a completely different topic',
    ],
    difficulty: 1,
  },
  {
    id: 'exit',
    name: '/exit',
    category: 'basic',
    summary: 'Exit Claude Code',
    description:
      'Exits the current Claude Code session. If there is unsaved work, the system will remind you to save first.',
    usage: '/exit',
    example: '/exit',
    exampleOutput: `Goodbye! Feel free to summon me anytime.
Claude Code session ended.`,
    tips: [
      'Make sure important work is saved before exiting',
      'Use /restart instead of /exit to reset the session',
      'Conversation history is not preserved after exit',
    ],
    difficulty: 1,
  },
  {
    id: 'restart',
    name: '/restart',
    category: 'basic',
    summary: 'Restart the Claude Code session',
    description:
      'Restarts the current session, keeping project context but clearing conversation history. Useful when recovering from issues.',
    usage: '/restart',
    example: '/restart',
    exampleOutput: `↻ Restarting session...
✓ Session restarted, project context preserved.`,
    tips: [
      '/restart preserves more context compared to /exit',
      'Useful for recovery when a session behaves abnormally',
      'Project files and working directory are not affected',
    ],
    difficulty: 1,
  },
  {
    id: 'model',
    name: '/model',
    category: 'basic',
    summary: 'Switch AI model (Haiku/Sonnet/Opus)',
    description:
      'Switch between different Claude models. Haiku is fast and economical, Sonnet balances speed and quality, Opus is the most powerful but slowest and most expensive.',
    usage: '/model <model_name>',
    example: '/model haiku',
    exampleOutput: `✓ Switched to Haiku model

Current Model: claude-3-haiku-20240307
Features: Fast, economical, suitable for simple tasks`,
    tips: [
      'Use Haiku for simple tasks — faster and cheaper',
      'Use Sonnet for complex reasoning, Opus for the most critical tasks',
      '/model without arguments shows the current model',
      '/models shows all available models',
    ],
    difficulty: 1,
  },
  {
    id: 'models',
    name: '/models',
    category: 'basic',
    summary: 'List all available AI models',
    description:
      'Shows all Claude models available to your account along with their features, helping you choose the best model for your current task.',
    usage: '/models',
    example: '/models',
    exampleOutput: `Available Models:

1. haiku      - Fast, economical (~$0.25/1M tokens)
2. sonnet     - Balanced choice (~$3/1M tokens)
3. opus       - Strongest reasoning (~$15/1M tokens)

Current: sonnet`,
    tips: [
      '/models shows models actually available to your account',
      'Available models vary by subscription tier',
      'Choose a model based on task difficulty',
    ],
    difficulty: 1,
  },
  {
    id: 'status',
    name: '/status',
    category: 'basic',
    summary: 'View current session status',
    description:
      'Shows detailed information about the current session, including the model in use, token usage, and runtime. Quickly get a session overview.',
    usage: '/status',
    example: '/status',
    exampleOutput: `Session Status
Model: claude-sonnet-4-6
Token Usage: 42.5k / 200k
Runtime: 1h 23m
Tool Calls: 47`,
    tips: [
      '/status provides a more comprehensive session overview than /cost',
      'Good practice to check status before starting complex tasks',
      'Shows the current model and version information',
    ],
    difficulty: 1,
  },
  {
    id: 'init',
    name: '/init',
    category: 'basic',
    summary: 'Initialize a CLAUDE.md project config file',
    description:
      'Creates or updates a CLAUDE.md file in the project root. CLAUDE.md records important context like project config, tech stack, and conventions.',
    usage: '/init',
    example: '/init',
    exampleOutput: `Creating CLAUDE.md...
✓ CLAUDE.md created
Next: Edit the file to add project description, tech stack, conventions, etc.`,
    tips: [
      'Run /init early for new projects to create the config',
      'Content in CLAUDE.md is automatically injected into every conversation context',
      'You can manually edit CLAUDE.md to add more details',
    ],
    difficulty: 1,
  },
  {
    id: 'plan',
    name: '/plan',
    category: 'basic',
    summary: 'Enter plan mode — plan first, then execute',
    description:
      'When plan mode is enabled, Claude will propose a change plan first and only execute after you approve. Great for complex refactoring or when you are unsure how to proceed.',
    usage: '/plan <description>',
    example: '/plan refactor user auth module',
    exampleOutput: `Refactoring Plan: User Auth Module
1. Extract auth logic into useAuth hook
2. Add token refresh mechanism
3. Unify error handling
4. Add test cases
Execute this plan? (y/n)`,
    tips: [
      'Ideal for large-scale refactoring or high-risk changes',
      'In plan mode, Claude will not modify files directly',
      'Automatically switches to execution mode after approval',
    ],
    difficulty: 2,
  },
  {
    id: 'rename',
    name: '/rename',
    category: 'basic',
    summary: 'Name the current session',
    description:
      'Sets a custom name for the current session, making it easy to identify later when restoring via --resume.',
    usage: '/rename <session_name>',
    example: '/rename auth-refactor',
    exampleOutput: `✓ Session renamed to: auth-refactor
You can restore it with: claude -r "auth-refactor"`,
    tips: [
      'A memorable name greatly improves --resume efficiency',
      'Name by function, e.g. "feature-login", "hotfix-crash"',
      'Unnamed sessions are saved with default names',
    ],
    difficulty: 1,
  },
  {
    id: 'color',
    name: '/color',
    category: 'basic',
    summary: 'Set input prompt bar color',
    description:
      'Customize the color of the Claude Code input prompt bar, making different sessions visually distinct. Handy when managing multiple sessions simultaneously.',
    usage: '/color <color>',
    example: '/color #ff6b6b',
    exampleOutput: `Prompt bar color updated
Type /color default to restore the default color`,
    tips: [
      'Supports hex color codes and color names',
      'Use different colors for different projects',
      '/color default restores the default',
    ],
    difficulty: 1,
  },

  // ========== Context & Memory ==========
  {
    id: 'compact',
    name: '/compact',
    category: 'diagnostics',
    summary: 'Compress conversation history to free up context window',
    description:
      'When the conversation grows long and the context approaches the limit, /compact compresses the conversation history, retaining key information while freeing tokens. Recommended for regular use to keep things smooth.',
    usage: '/compact',
    example: '/compact',
    exampleOutput: `▸ Before: 45.2k tokens
▸ After: 8.3k tokens
▸ Saved: 36.9k tokens (81.6%)
✓ Conversation compressed, key information preserved`,
    tips: [
      'If Claude feels slow, try /compact first',
      'Consider compressing every 100-150 messages',
      'Supports flags: /compact --aggressive or /compact --keep-keys',
      'Record important info in CLAUDE.md',
    ],
    difficulty: 1,
  },
  {
    id: 'context',
    name: '/context',
    category: 'diagnostics',
    summary: 'View current context usage',
    description:
      'Visualizes current context usage, showing how much space messages, file contents, and tool output occupy. Helps determine when compression is needed.',
    usage: '/context',
    example: '/context',
    exampleOutput: `Context Usage:

▸ Current: 42.5k / 200k tokens (21%)
▸ Messages: 15.2k
▸ Files: 22.1k
▸ Tools: 5.2k

Status: Good — you may continue`,
    tips: [
      'Consider /compact when usage exceeds 80%',
      'Shows which content type consumes the most space',
      'Helps optimize usage habits',
    ],
    difficulty: 1,
  },
  {
    id: 'cost',
    name: '/cost',
    category: 'diagnostics',
    summary: 'View current session tokens and cost',
    description:
      'Shows the current session token usage and estimated cost. Helps you understand the cost of each conversation and plan usage wisely.',
    usage: '/cost',
    example: '/cost',
    exampleOutput: `Session Stats

Input tokens:  12,345
Output tokens:  8,901
Total:        21,246
Estimated cost:    $0.42

Since last /cost:  3,210 tokens`,
    tips: [
      'Check /cost regularly to manage your budget',
      'Costs vary significantly across different models',
      'Tokens decrease noticeably after /compact',
    ],
    difficulty: 1,
  },

  // ========== Diagnostics & Info ==========
  {
    id: 'doctor',
    name: '/doctor',
    category: 'diagnostics',
    summary: 'Run environment diagnostics to troubleshoot issues',
    description:
      'Checks whether the Claude Code environment is healthy, including network connectivity, API keys, file permissions, and dependency versions. Run this first when encountering issues.',
    usage: '/doctor',
    example: '/doctor',
    exampleOutput: `Environment Diagnostics Report

✓ Node.js: v22.22.1
✓ Network: Connected
✓ API Key: Configured
✓ File Permissions: OK
✓ Git: Initialized

System Status: Healthy ✓`,
    tips: [
      'Try /doctor first whenever something goes wrong',
      '/doctor does not modify any files — safe to run',
      'If /doctor reports errors, share the output with tech support',
    ],
    difficulty: 1,
  },
  {
    id: 'stats',
    name: '/stats',
    category: 'diagnostics',
    summary: 'Show session statistics',
    description:
      'Shows detailed statistics for the current session, including message count, runtime, and tool usage.',
    usage: '/stats',
    example: '/stats',
    exampleOutput: `Session Stats

Runtime: 2h 34m
Messages: 156
Tool Calls: 89
Avg Response: 1.2s`,
    tips: [
      '/stats provides more detailed session info than /cost',
      'Great for evaluating work efficiency',
      'Tool call count reflects task complexity',
    ],
    difficulty: 1,
  },
  {
    id: 'fast',
    name: '/fast',
    category: 'diagnostics',
    summary: 'Toggle fast output mode',
    description:
      'Enables fast output mode, increasing generation speed on the same model (may slightly reduce quality). Ideal for quick iteration or simple tasks.',
    usage: '/fast',
    example: '/fast',
    exampleOutput: `Fast mode: Enabled
Same model, faster output speed`,
    tips: [
      'Fast mode uses the same model but with a more aggressive generation strategy',
      'Great for batch processing or simple refactoring',
      'Type /fast again to disable',
    ],
    difficulty: 1,
  },
  {
    id: 'bug',
    name: '/bug',
    category: 'diagnostics',
    summary: 'Report a bug to Anthropic',
    description:
      'Submits a bug report for the current session to Anthropic. Automatically attaches relevant context to help the team quickly identify the issue.',
    usage: '/bug',
    example: '/bug',
    exampleOutput: `Bug report submitted
Thanks for the feedback! The Anthropic team will follow up promptly`,
    tips: [
      'Automatically attaches session context — no manual description needed',
      'Use when encountering abnormal behavior or crashes',
      'For non-urgent issues, prefer using this command',
    ],
    difficulty: 1,
  },
  {
    id: 'release-notes',
    name: '/release-notes',
    category: 'diagnostics',
    summary: 'View Claude Code release notes',
    description:
      'Interactively browse Claude Code release notes across versions, discovering new features, improvements, and bug fixes. Supports filtering by version.',
    usage: '/release-notes',
    example: '/release-notes',
    exampleOutput: `Release Notes (v2.1.92+)
2.1.118 - Added /buddy terminal pet
2.1.121 - Added /skills command
2.1.90  - Added /powerup feature tutorial
Select a version to see details...`,
    tips: [
      'View change details for any version',
      'New versions typically include performance improvements and new features',
      'Recommended to check release notes weekly',
    ],
    difficulty: 1,
  },
  {
    id: 'terminal-setup',
    name: '/terminal-setup',
    category: 'diagnostics',
    summary: 'Configure terminal key bindings',
    description:
      'Interactively configure terminal key bindings, including copy, paste, clear screen, and more. Supports custom key mappings.',
    usage: '/terminal-setup',
    example: '/terminal-setup',
    exampleOutput: `Terminal Key Bindings
Current Bindings:
Enter     - Send message
Ctrl+C    - Interrupt execution
Tab       - Auto-complete
↑/↓       - Command history
Modify? (y/n)`,
    tips: [
      'Supports customizing all common terminal shortcuts',
      'Changes take effect immediately — no restart needed',
      'You can reset to defaults anytime',
    ],
    difficulty: 1,
  },
  {
    id: 'config',
    name: '/config',
    category: 'diagnostics',
    summary: 'Open the full Claude Code settings interface',
    description:
      'Interactively browse and modify all Claude Code configuration options, including theme, permissions, model preferences, and behavior settings.',
    usage: '/config',
    example: '/config',
    exampleOutput: `Settings Center
1. Appearance - Theme, color, font
2. Behavior - Auto-complete, confirmation prompts
3. Permissions - Tool access control
4. Model - Default model selection
Select a category to modify...`,
    tips: [
      'More user-friendly than editing JSON config directly',
      'All changes take effect immediately',
      'Supports searching configuration items',
    ],
    difficulty: 2,
  },

  // ========== Editing Tools ==========
  {
    id: 'copy',
    name: '/copy',
    category: 'editing',
    summary: 'Copy Claude\'s last response',
    description:
      'Quickly copy Claude\'s last full response to the system clipboard, including code blocks, formatted text, and more.',
    usage: '/copy',
    example: '/copy',
    exampleOutput: `✓ Copied to clipboard`,
    tips: [
      'Faster and more accurate than manual selection',
      'Copies the entire response, including all code blocks',
      'May be slightly slower for very large responses',
    ],
    difficulty: 1,
  },
  {
    id: 'vim',
    name: '/vim',
    category: 'editing',
    summary: 'Toggle edit mode (removed in v2.1.92+, use /config instead)',
    description:
      'Switches between Vim key bindings and normal edit mode. ⚠️ Removed since v2.1.92 — use /config → Editor mode instead.',
    usage: '/vim',
    example: '/vim',
    exampleOutput: `✓ Vim mode: Enabled
  - j/k: Move down/up
  - l/h: Move right/left
  - Esc: Exit edit mode
  - i: Enter insert mode`,
    tips: [
      '⚠️ Removed in v2.1.92+, use /config to set Editor mode',
      'Still supports basic editing in Vim mode',
      'Suitable for developers experienced with Vim',
    ],
    difficulty: 2,
  },
  {
    id: 'diff',
    name: '/diff',
    category: 'editing',
    summary: 'Show structured diff of code changes',
    description:
      'Displays file additions and deletions in a compact, structured format. More readable than standard git diff, focused on meaningful changes.',
    usage: '/diff',
    example: '/diff',
    exampleOutput: `src/components/Header.tsx

  function Header() {
-   return <div>Old Title</div>
+   return <h1>New Title</h1>
  }

src/styles.css

-  .old-class { color: red }
+  .new-class { color: blue }`,
    tips: [
      '/diff compares the last modified files by default',
      'More concise than git diff, focused on logic changes',
      'Quickly review changes before committing',
    ],
    difficulty: 2,
  },
  {
    id: 'review',
    name: '/review',
    category: 'editing',
    summary: 'Request a code review',
    description:
      'Ask Claude to review your recent code changes, checking for potential bugs, security issues, code quality, and more.',
    usage: '/review',
    example: '/review',
    exampleOutput: `Code Review Report

File: src/api/user.ts
Issues: 2

⚠️ [Medium] Missing input validation
    Suggestion: Add parameter validation in handleLogin

⚠️ [Low]  Unused import
    Line 3: 'crypto' imported but not used`,
    tips: [
      'Great as a self-check before committing code',
      'You can specify a file: /review src/auth.ts',
      'Use with /diff to see specific changes',
    ],
    difficulty: 2,
  },
  {
    id: 'rewind',
    name: '/rewind',
    category: 'editing',
    summary: 'Revert to a checkpoint in the conversation',
    description:
      'Rewinds the conversation to a previous state, undoing all changes made since. Think of it as a "time machine" for exploratory development.',
    usage: '/rewind',
    example: '/rewind',
    exampleOutput: `⏪ Rewound to previous checkpoint
Subsequent 7 messages and changes have been undone`,
    tips: [
      'Works great with /branch: branch to explore, rewind if unsatisfied',
      'Can also be triggered by pressing Esc twice quickly',
      'Cannot be undone — confirm before rewinding',
    ],
    difficulty: 2,
  },
  {
    id: 'simplify',
    name: '/simplify',
    category: 'editing',
    summary: 'Review code and suggest simplifications',
    description:
      'Analyzes current code changes to find simplification opportunities, including redundant logic, over-abstraction, and unnecessary complexity.',
    usage: '/simplify',
    example: '/simplify',
    exampleOutput: `Simplify Analysis
src/utils/format.ts:23-45
- Redundant condition: if/else can be merged into ternary
- Over-abstraction: formatDate function can be inlined
- Estimated code reduction: ~30%`,
    tips: [
      'Run before refactoring to identify simplification targets',
      'Does not modify code automatically — suggestions only',
      'Complements /review: /review finds issues, /simplify finds redundancy',
    ],
    difficulty: 2,
  },
  {
    id: 'security-review',
    name: '/security-review',
    category: 'editing',
    summary: 'Comprehensive code security audit',
    description:
      'Performs an in-depth security audit of your project, detecting common vulnerabilities: XSS, SQL injection, sensitive information leaks, dependency issues, and more.',
    usage: '/security-review',
    example: '/security-review',
    exampleOutput: `Security Review Report
Critical: 2  Medium: 4  Low: 7

🚨 [Critical] src/api/auth.ts:88
   Token stored in plaintext in localStorage
   Suggestion: Use httpOnly cookie

⚠️ [Medium] src/api/user.ts:156
   Missing input validation
   Suggestion: Add parameter whitelist validation`,
    tips: [
      'Recommended to run a full security audit before release',
      'Results are categorized by severity level',
      'Each issue comes with a fix suggestion',
    ],
    difficulty: 3,
  },

  // ========== Search & External ==========
  {
    id: 'search',
    name: '/search',
    category: 'search',
    summary: 'Search the web for up-to-date information',
    description:
      'Lets Claude Code search the internet for real-time information. Useful when you need the latest data, documentation, or news.',
    usage: '/search <search keywords>',
    example: '/search Claude 3.5 new features',
    exampleOutput: `Search Results: Claude 3.5 new features

1. Claude 3.5 Sonnet released with major performance improvements
2. New computer use capability
3. Improved long-context understanding

Source: anthropic.com, Oct 2024`,
    tips: [
      'Search results are available as context for Claude to reference',
      'You can ask follow-up questions after a search',
      '/search works for information beyond the training data cutoff',
    ],
    difficulty: 2,
  },
  {
    id: 'summarize',
    name: '/summarize',
    category: 'search',
    summary: 'Summarize content from a given URL',
    description:
      'Reads and summarizes the content of a web page, document, or article. No need to copy-paste — just provide the URL.',
    usage: '/summarize <URL>',
    example: '/summarize https://docs.anthropic.com',
    exampleOutput: `Anthropic Documentation Summary

▸ Core: Claude API Usage Guide
▸ Key Sections: Quick Start, Model Invocation, Best Practices
▸ Use Case: Development Integration

Need to dive deeper into something? Just ask.`,
    tips: [
      'Quickly grasp the core content of a long article',
      'Ask follow-up questions about interesting sections',
      'Supports most public web pages',
    ],
    difficulty: 2,
  },

  // ========== CLI Mode ==========
  {
    id: 'claude-continue',
    name: 'claude -c',
    category: 'cli',
    summary: 'Continue the last conversation session',
    description:
      'Resumes and continues the last interrupted Claude Code session. All history and conversation state are preserved.',
    usage: 'claude -c',
    example: 'claude -c',
    exampleOutput: `↻ Restoring last session...
✓ Loaded 156 messages (32.1k tokens)

Last session: 2 hours ago
Continuing from where you left off...`,
    tips: [
      'Faster than --resume, automatically picks the most recent session',
      '-c is short for --continue',
      'Great for daily continuation workflows',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-resume',
    name: 'claude --resume',
    category: 'cli',
    summary: 'Select and resume a specific historical session',
    description:
      'Lists all historical sessions for you to pick and resume. Unlike -c, --resume provides a selection interface.',
    usage: 'claude --resume',
    example: 'claude --resume',
    exampleOutput: `Historical Sessions:

1. Project Refactor (2h ago) - 45.2k tokens
2. Bug Fix (yesterday) - 12.8k tokens
3. Feature Dev (3 days ago) - 89.1k tokens

Select session to resume (1-3):`,
    tips: [
      'Use --resume when you need to pick a specific session',
      'Check yesterday\'s progress with --resume before starting work',
      'Sessions are listed in reverse chronological order',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-pipe',
    name: 'claude -p',
    category: 'cli',
    summary: 'Pipe mode — non-interactive command execution',
    description:
      'Passes content to Claude Code via pipe for processing, suitable for scripting, CI/CD, and automation scenarios.',
    usage: 'echo "content" | claude -p "instruction"',
    example: 'cat error.log | claude -p "analyze these error logs"',
    exampleOutput: `Error Log Analysis:

1. TypeError (23 times) - Null pointer exception
2. ReferenceError (8 times) - Undefined variable
3. Root cause: Async loading order issue

Suggestion: Add a loading state after component mount`,
    tips: [
      'Ideal for integration into CI/CD or scripts',
      'Follow -p with a description of what to do',
      'Piped input becomes part of the context',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-update',
    name: 'claude update',
    category: 'cli',
    summary: 'Update Claude Code to the latest version',
    description:
      'Checks for and installs the latest version of Claude Code. Recommended to run weekly to get new features, performance optimizations, and bug fixes.',
    usage: 'claude update',
    example: 'claude update',
    exampleOutput: `Checking for updates...
Current version: 2.1.92
Latest version: 2.1.118
Updating... ✓ Updated to 2.1.118`,
    tips: [
      'Check for updates once a week',
      'Version compatibility is checked before updating',
      'New versions typically include new features and performance improvements',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-version',
    name: 'claude --version',
    category: 'cli',
    summary: 'Check the current Claude Code version',
    description:
      'Quickly view the currently installed Claude Code version number. Useful for confirming your version before reporting issues or checking for updates.',
    usage: 'claude --version',
    aliases: ['claude -v'],
    example: 'claude --version',
    exampleOutput: `claude-code version 2.1.118`,
    tips: [
      'Check the version number before reporting issues',
      'Older versions may lack certain features',
      'claude -v is short for --version',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-config',
    name: 'claude config',
    category: 'cli',
    summary: 'Manage Claude Code configuration',
    description:
      'View and modify Claude Code configuration options. Supports subcommands like list/get/set/add/remove to manage themes, permissions, and other settings.',
    usage: 'claude config <subcommand>',
    example: 'claude config set theme dark',
    exampleOutput: `✓ Config updated
theme = dark

Use claude config list to view all configuration`,
    tips: [
      'claude config list to view all current settings',
      'claude config set <key> <value> to modify config',
      'Common settings: theme, permissions, model',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-worktree',
    name: 'claude --worktree',
    category: 'cli',
    summary: 'Start in an isolated git worktree',
    description:
      'Creates an isolated git worktree and starts a session inside it. Great for developing multiple features in parallel without interference.',
    usage: 'claude --worktree',
    aliases: ['claude -w'],
    example: 'claude -w',
    exampleOutput: `Creating worktree: feature-xyz
✓ Worktree ready, switched to new directory
Note: Worktree is isolated from the main branch`,
    tips: [
      'Ideal for parallel development of independent features',
      '-w is short for --worktree',
      'Worktrees have separate file systems and git state',
    ],
    difficulty: 3,
  },
  {
    id: 'claude',
    name: 'claude',
    category: 'cli',
    summary: 'Start an interactive Claude Code session',
    description:
      'The most basic start command. Without arguments, it enters interactive mode. You can attach a question to start a conversation or pipe content through.',
    usage: 'claude [question]',
    example: 'claude explain this project\'s architecture',
    exampleOutput: `Welcome to Claude Code
Type your question to start a conversation.
Current directory: my-project
Model: claude-sonnet-4-6`,
    tips: [
      'Attach a question to skip the welcome screen',
      'Pipe content: cat file | claude "analyze"',
      'First-time use will prompt you to log in',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-name',
    name: 'claude --name',
    category: 'cli',
    summary: 'Specify a session name at startup',
    description:
      'Name your session at startup so it can be easily restored later via --resume. More efficient than using /rename after starting.',
    usage: 'claude --name <session_name>',
    aliases: ['claude -n'],
    example: 'claude --name "auth-refactor"',
    exampleOutput: `✓ Session named: auth-refactor
Can be restored with: claude -r "auth-refactor"`,
    tips: [
      'Naming upfront makes it easy to find via --resume',
      '-n is short for --name',
      'Ideal for developers who name sessions per task',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-model',
    name: 'claude --model',
    category: 'cli',
    summary: 'Specify the model at startup',
    description:
      'Specifies the Claude model to use before the session starts, overriding the default configuration. Supports opus/sonnet/haiku and specific version numbers.',
    usage: 'claude --model <model_name>',
    aliases: ['claude -m'],
    example: 'claude --model claude-opus-4-6',
    exampleOutput: `✓ Using model: claude-opus-4-6
Session started`,
    tips: [
      'Use opus for complex tasks, sonnet for daily work, haiku for simple tasks',
      'You can specify a version: --model claude-haiku-4-5',
      'Can switch models during a session with /model',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-plan',
    name: 'claude --plan',
    category: 'cli',
    summary: 'Start in plan mode',
    description:
      'Starts directly in plan mode — Claude will propose a plan before executing. Best for large refactors that require careful consideration.',
    usage: 'claude --plan',
    example: 'claude --plan',
    exampleOutput: `Plan mode enabled
Claude will propose a complete plan before making changes,
and wait for your approval before executing.`,
    tips: [
      'Use --plan at startup to avoid accidental changes',
      'All modifications require your confirmation in plan mode',
      'Suitable for production environments or critical code refactoring',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-max-turns',
    name: 'claude --max-turns',
    category: 'cli',
    summary: 'Limit the maximum number of automatic execution rounds',
    description:
      'Limits the maximum number of automatic tool call rounds Claude can perform. Prevents long-running tasks from going out of control, ideal for CI/CD and automation scripts.',
    usage: 'claude --max-turns <number>',
    example: 'claude -p "fix lint errors" --max-turns 10',
    exampleOutput: `Limited to 10 automatic execution rounds
Stops automatically when the limit is reached`,
    tips: [
      'Great for controlling budget in CI/CD and automation scripts',
      'The session does not exit when the limit is reached — it waits for further instructions',
      'Most effective in -p mode',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-output-format',
    name: 'claude --output-format',
    category: 'cli',
    summary: 'Set the output format',
    description:
      'Specifies the output format for -p mode. Supports text (default), json, and stream-json. The json format is ideal for script parsing.',
    usage: 'claude --output-format <format>',
    example: 'claude -p "list API endpoints" --output-format json',
    exampleOutput: `{"endpoints":["GET /users","POST /users","GET /users/:id"],"count":3}`,
    tips: [
      'json output can be processed directly with jq',
      'stream-json is good for streaming large responses',
      'Only takes effect in -p mode',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-system-prompt',
    name: 'claude --system-prompt',
    category: 'cli',
    summary: 'Inject a custom system prompt',
    description:
      'Injects an additional system prompt at startup, overriding or supplementing the configuration in CLAUDE.md. Useful for temporarily changing Claude\'s behavior or role.',
    usage: 'claude --system-prompt <prompt>',
    aliases: ['claude -s'],
    example: 'claude --system-prompt "You are a security audit expert"',
    exampleOutput: `✓ System prompt injected
Claude will operate as a security audit expert`,
    tips: [
      'Injected prompts override CLAUDE.md configuration',
      '-s is short for --system-prompt',
      'Great for switching roles or domains of expertise',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-debug',
    name: 'claude --debug',
    category: 'cli',
    summary: 'Start in debug mode',
    description:
      'Enables detailed debug logs at startup, showing tool calls, internal state changes, and more. Useful for troubleshooting or understanding Claude\'s internal workings.',
    usage: 'claude --debug',
    example: 'claude --debug',
    exampleOutput: `Debug mode enabled
[Debug] Loading config: ~/.claude.json
[Debug] Initializing MCP servers: 3
[Debug] Detected tools: 24 available`,
    tips: [
      'Debug logs show detailed execution steps',
      'Useful for troubleshooting configuration or tool call issues',
      'Debug info is also displayed in the terminal',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-install',
    name: 'claude install',
    category: 'cli',
    summary: 'Install or reinstall a specific version of Claude Code',
    description:
      'Installs a specified version of the Claude Code native binary. Supports version numbers like 2.1.118, or stable/latest.',
    usage: 'claude install [version]',
    example: 'claude install 2.1.118',
    exampleOutput: `Installing Claude Code v2.1.118...
✓ Installation complete
Current version: 2.1.118`,
    tips: [
      'Installs the latest stable version when no version is specified',
      'You can switch between versions for testing',
      'Restart the terminal after installation for changes to take effect',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-bare',
    name: 'claude --bare',
    category: 'cli',
    summary: 'Start in minimal mode',
    description:
      'Skips all external configuration and plugins, starting in the most minimal way. Does not load CLAUDE.md, MCP servers, plugins, etc. Fastest startup.',
    usage: 'claude --bare',
    example: 'claude --bare',
    exampleOutput: `Minimal Mode
Not loaded: CLAUDE.md, MCP, plugins
Startup complete: 0.3s`,
    tips: [
      'Fastest startup — great for simple queries',
      'Useful for isolating compatibility issues caused by external plugins',
      'Functionality is limited in minimal mode — not recommended for complex tasks',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-allowed-tools',
    name: 'claude --allowedTools',
    category: 'cli',
    summary: 'Restrict which tools Claude can use',
    description:
      'Specifies the list of tools Claude is allowed to use in the session. Tools not in the list will be disabled. A key security measure.',
    usage: 'claude --allowedTools <tool_list>',
    example: 'claude -p "review code" --allowedTools "Read,Grep"',
    exampleOutput: `Tools restricted to: Read, Grep
Claude can only use the specified tools`,
    tips: [
      'Separate multiple tools with commas',
      'Restricting Write prevents file modifications',
      'Restricting Bash prevents command execution',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-skip-permissions',
    name: 'claude --dangerously-skip-permissions',
    category: 'cli',
    summary: 'Skip all permission confirmation prompts',
    description:
      'Automatically approves all tool permission requests without asking for confirmation. ⚠️ Only use in sandboxed or fully trusted environments.',
    usage: 'claude --dangerously-skip-permissions',
    example: 'claude --dangerously-skip-permissions',
    exampleOutput: `⚠️ Permission checks skipped
Claude will automatically execute all tool calls
Only use in trusted environments`,
    tips: [
      'Only use in sandbox, CI/CD, or fully trusted environments',
      'Safer when combined with --allowedTools',
      'Not recommended for daily development',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-auth-login',
    name: 'claude auth login',
    category: 'cli',
    summary: 'Log in to an Anthropic account',
    description:
      'Log in to your Anthropic account via browser or console. Supports --email to prefill the email, --sso for forced SSO, and --console for API billing mode.',
    usage: 'claude auth login',
    example: 'claude auth login',
    exampleOutput: `Opening browser...
Please complete Anthropic account authorization
✓ Login successful`,
    tips: [
      'First-time use requires logging in',
      '--console uses API key billing instead of subscription',
      '--sso is suitable for enterprise SSO login',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-mcp',
    name: 'claude mcp',
    category: 'cli',
    summary: 'Manage MCP servers (CLI method)',
    description:
      'Manage MCP server configuration via CLI. Supports add/remove/list/logs/get subcommands, complementing the in-session /mcp command.',
    usage: 'claude mcp <subcommand>',
    example: 'claude mcp add my-server -- npx -y @example/mcp-server',
    exampleOutput: `✓ MCP server added: my-server
Use claude mcp list to view all servers`,
    tips: [
      'Useful for batch configuring MCP in scripts',
      'claude mcp list shows all registered servers',
      'claude mcp logs <name> shows server logs',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-help',
    name: 'claude --help',
    category: 'cli',
    summary: 'Show help information',
    description:
      'Shows Claude Code CLI help information, including all available flags, subcommands, and usage examples.',
    usage: 'claude --help',
    aliases: ['claude -h'],
    example: 'claude --help',
    exampleOutput: `Claude Code CLI
Usage: claude [options] [prompt]

Common Options:
  -p, --print         Single-query mode
  -c, --continue      Continue most recent session
  -m, --model <name>  Specify model
  -w, --worktree      Isolated worktree
  -n, --name <name>   Session name

Run claude --help to see the full list`,
    tips: [
      'Use --help anytime you forget a flag',
      '-h is short for --help',
      'Shows all options supported by the current version',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-verbose',
    name: 'claude --verbose',
    category: 'cli',
    summary: 'Enable verbose log output',
    description:
      'Shows detailed tool call information and internal state changes, including input/output and timing for each step. Useful for debugging and performance analysis.',
    usage: 'claude --verbose',
    example: 'claude --verbose',
    exampleOutput: `[Verbose] Loading CLAUDE.md
[Verbose]   - key: project/name
[Verbose]   - key: stack/react
[Verbose] MCP servers: 3 connected
[Verbose] Tools: 24 available`,
    tips: [
      'More concise than --debug, focused on tool calls',
      'Useful for verifying Claude behavior matches expectations',
      'Does not affect normal functionality',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-no-color',
    name: 'claude --no-color',
    category: 'cli',
    summary: 'Disable colored output',
    description:
      'Runs in plain text mode, disabling all ANSI color escape codes. Suitable for logging, CI/CD pipelines, or terminals that do not support color.',
    usage: 'claude --no-color',
    example: 'claude --no-color',
    exampleOutput: `[NoColor] Session started
Model: claude-sonnet-4-6
CWD: /home/user/project`,
    tips: [
      'Recommended when redirecting output to a file',
      'Recommended for CI/CD environments',
      'Works great with --output-format json',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-auth-logout',
    name: 'claude auth logout',
    category: 'cli',
    summary: 'Log out of the Anthropic account',
    description:
      'Logs out of the current Anthropic account and clears local credentials. Must be run before switching accounts.',
    usage: 'claude auth logout',
    example: 'claude auth logout',
    exampleOutput: `Logged out of Anthropic account
Use claude auth login to log back in`,
    tips: [
      'Re-login is required after logging out to use Claude Code',
      'Does not affect active sessions in other terminals',
      'Remember to log out before switching accounts',
    ],
    difficulty: 1,
  },
  {
    id: 'claude-no-cache',
    name: 'claude --no-cache',
    category: 'cli',
    summary: 'Disable prompt caching',
    description:
      'Disables prompt caching, ensuring each request is completely independent. Useful when you need precise control over caching behavior or want to avoid cached results.',
    usage: 'claude --no-cache',
    example: 'claude --no-cache',
    exampleOutput: `Cache disabled
Each request will be processed independently`,
    tips: [
      'Disabling cache increases token consumption',
      'Good for A/B testing different prompts',
      'Keep caching enabled for daily use to improve performance',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-accept-edits',
    name: 'claude --permission-mode acceptEdits',
    category: 'cli',
    summary: 'Auto-approve file edits',
    description:
      'Starts in edit auto-approval mode (formerly --accept-edits, now uses --permission-mode in v2). Claude can modify files directly without confirmation.',
    usage: 'claude --permission-mode acceptEdits',
    example: 'claude --permission-mode acceptEdits',
    exampleOutput: `Edit auto-approval mode enabled
Claude can modify files directly without confirmation
Note: Recommended to use with --plan`,
    tips: [
      'Reduces confirmation steps for better efficiency',
      'Use with --plan to review the plan before auto-execution',
      'For daily development, it is recommended to manually confirm each change',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-permission-mode-auto',
    name: 'claude --permission-mode auto',
    category: 'cli',
    summary: 'Start in automatic permission mode',
    description:
      'Starts in automatic mode (replaces the removed --enable-auto-mode). Claude decides execution steps independently, reducing permission confirmation popups. Ideal for batch tasks with clear instructions.',
    usage: 'claude --permission-mode auto',
    example: 'claude --permission-mode auto',
    exampleOutput: `Automatic permission mode enabled
Claude can execute routine operations autonomously
Critical write operations still require confirmation`,
    tips: [
      'Fewer confirmations than default mode, more efficient',
      'Ideal for batch tasks with clear steps',
      'Also supports plan / acceptEdits / bypassPermissions modes',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-append-system-prompt',
    name: 'claude --append-system-prompt',
    category: 'cli',
    summary: 'Append to the system prompt',
    description:
      'Appends additional content to the existing system prompt. Unlike --system-prompt which overrides, appending preserves the original configuration.',
    usage: 'claude --append-system-prompt <content>',
    example: 'claude --append-system-prompt "Always respond in Chinese"',
    exampleOutput: `System prompt appended
Original configuration preserved, new instructions added`,
    tips: [
      'Unlike --system-prompt, does not overwrite existing config',
      'Good for temporarily adding behavioral constraints',
      'Can be appended multiple times — all content is preserved',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-max-budget',
    name: 'claude --max-budget-usd',
    category: 'cli',
    summary: 'Set a session cost limit',
    description:
      'Sets a USD cost limit for the current session. The session automatically stops when the limit is reached. Great for budget control or strict cost constraints.',
    usage: 'claude --max-budget-usd <amount>',
    example: 'claude --max-budget-usd 5',
    exampleOutput: `Cost limit: $5
Session will automatically stop when the limit is reached`,
    tips: [
      'Session stops safely when the limit is reached — no data loss',
      'Suitable for batch tasks or API call scenarios',
      'The limit is per session, not cumulative',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-add-dir',
    name: 'claude --add-dir',
    category: 'cli',
    summary: 'Add external directories at startup',
    description:
      'Adds directories outside the project to the file access scope at startup. Equivalent to running /add-dir after starting. Useful for monorepo multi-project management.',
    usage: 'claude --add-dir <path>',
    example: 'claude --add-dir ../shared-lib',
    exampleOutput: `Directory added: ../shared-lib
Claude can now access files in this directory`,
    tips: [
      'Supports adding multiple directories at startup',
      'Ideal for monorepo or microservice architecture',
      'Added directories are preserved with --continue',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-permission-mode',
    name: 'claude --permission-mode',
    category: 'cli',
    summary: 'Set permission confirmation mode',
    description:
      'Sets the permission confirmation level: default (confirm each time) or bypassPermissions (auto-approve). Suitable for automation environments.',
    usage: 'claude --permission-mode <mode>',
    example: 'claude --permission-mode bypassPermissions',
    exampleOutput: `Permission mode: bypassPermissions
Tool calls will be automatically approved`,
    tips: [
      'bypassPermissions is equivalent to skipping confirmation popups',
      'Safer than --dangerously-skip-permissions',
      'default mode asks before every operation',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-disallowed-tools',
    name: 'claude --disallowedTools',
    category: 'cli',
    summary: 'Disable specific tools',
    description:
      'Specifies a list of tools that are forbidden in the session. Complements --allowedTools — useful for quickly disabling a few high-risk tools.',
    usage: 'claude --disallowedTools <tool_list>',
    example: 'claude --disallowedTools "Bash,Write"',
    exampleOutput: `Tools disabled: Bash, Write
These tools are not available in this session`,
    tips: [
      'Disable high-risk tools to improve security',
      'Mutually exclusive with --allowedTools; using both together may have unpredictable results',
      'Apply the principle of least privilege',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-agent',
    name: 'claude --agent',
    category: 'cli',
    summary: 'Use a custom Agent',
    description:
      'Loads a custom Agent from the .claude/agents/ directory as the system prompt. An Agent is a predefined set of instructions and tool constraints.',
    usage: 'claude --agent <agent_name>',
    example: 'claude --agent code-reviewer',
    exampleOutput: `Using Agent: code-reviewer
Loaded custom system prompt and tool configuration`,
    tips: [
      'Agent files are stored in the .claude/agents/ directory',
      'Each Agent has its own tool permissions and prompts',
      'You can create dedicated Agents shared across the team',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-fork-session',
    name: 'claude --fork-session',
    category: 'cli',
    summary: 'Create a branch from a resumed session',
    description:
      'Creates a branch when resuming a session via --resume, keeping the original session unchanged. Great for exploring different directions from a single starting point.',
    usage: 'claude --resume <id> --fork-session',
    example: 'claude -r auth-refactor --fork-session',
    exampleOutput: `Session branch created
Original session: auth-refactor
New branch: auth-refactor-fork-1
The two sessions are independent`,
    tips: [
      'Must be used together with --resume',
      'Each branch is completely independent',
      'Ideal for trying different solutions',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-teleport',
    name: 'claude --teleport',
    category: 'cli',
    summary: 'Pull a web session to the local terminal',
    description:
      'Pulls a Web session started on claude.ai/code to the local terminal for continued work. Enables seamless switching between Web and terminal.',
    usage: 'claude --teleport',
    example: 'claude --teleport',
    exampleOutput: `Pulling Web session...
Session synced from claude.ai/code to local terminal
All context fully preserved`,
    tips: [
      'Need to start a session on claude.ai/code first',
      'All context is fully preserved after pulling',
      'Great for previewing designs in the Web then continuing in the terminal',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-from-pr',
    name: 'claude --from-pr',
    category: 'cli',
    summary: 'Start a review session from a PR',
    description:
      'Starts a review session based on a specified PR, automatically fetching the PR diff and context. Supports GitHub, GitLab, and Bitbucket.',
    usage: 'claude --from-pr <PR_number>',
    example: 'claude --from-pr 123',
    exampleOutput: `Loaded PR #123
Repository: owner/repo
Changed files: 12
Auto-review ready`,
    tips: [
      'Automatically detects PR changes',
      'Supports GitHub/GitLab/Bitbucket',
      'Can directly analyze the diff and provide review feedback',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-channels',
    name: 'claude --channels',
    category: 'cli',
    summary: 'Forward approval requests to IM channels',
    description:
      'Forwards tool permission approval requests via Telegram, Discord, and other channels for remote approval. Useful in CI/CD or remote environments.',
    usage: 'claude --channels',
    example: 'claude --channels',
    exampleOutput: `Approval channels configured
Permission requests will be forwarded via Telegram/Discord
Please confirm operations on another device`,
    tips: [
      'Requires prior IM integration setup',
      'Approval requests include full context',
      'Ideal for remote CI/CD approval scenarios',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-ultrareview',
    name: 'claude ultrareview',
    category: 'cli',
    summary: 'Non-interactive deep code review',
    description:
      'Runs a deep code review in non-interactive mode, outputting review results to stdout. Supports --json output and --timeout control.',
    usage: 'claude ultrareview <PR_number>',
    example: 'claude ultrareview 1234 --json',
    exampleOutput: `{
  "severity": "medium",
  "issues": [
    {"file": "src/auth.ts", "line": 88, "type": "security"},
    {"file": "src/api.ts", "line": 156, "type": "performance"}
  ]
}`,
    tips: [
      'Perfectly suited for CI/CD pipelines',
      '--json output can be parsed directly by scripts',
      'Exit code 0 = passed, 1 = issues found',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-agents',
    name: 'claude agents',
    category: 'cli',
    summary: 'Manage background agents and sub-agents',
    description:
      'View and manage all running background tasks and sub-agents. Lists the status, ID, and current progress of each background session.',
    usage: 'claude agents',
    example: 'claude agents',
    exampleOutput: `Background Agents:
  1. Performance Optimization (7c5dcf5d) - Running
  2. Log Analysis (a3f8b2e1) - Completed
  3. Code Review (d9e1c4a7) - Waiting
   
   Use claude agents <id> for details`,
    tips: [
      'Essential command for use with /background',
      'Background tasks persist even when the terminal is closed',
      'claude agents <id> to view details of a single task',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-attach',
    name: 'claude attach',
    category: 'cli',
    summary: 'Attach to a background agent session',
    description:
      'Attaches to a specified background agent session to view its output in real time. Use claude agents to find the session ID.',
    usage: 'claude attach <session_id>',
    example: 'claude attach 7c5dcf5d',
    exampleOutput: `Attaching to session 7c5dcf5d...
✓ Connected
Viewing real-time output...
Press Ctrl+C to detach (session continues running in background)`,
    tips: [
      'Detaching lets the session continue running in the background',
      'Get the session ID via claude agents',
      '/exit to return from attach mode to terminal',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-logs',
    name: 'claude logs',
    category: 'cli',
    summary: 'View the latest output of a background session',
    description:
      'Prints the most recent output logs for a specified background session. Quickly check progress without attaching to the session.',
    usage: 'claude logs <session_id>',
    example: 'claude logs 7c5dcf5d',
    exampleOutput: `Session 7c5dcf5d Latest Output:
[2026-05-16 14:23:01] Started analyzing performance bottlenecks
[2026-05-16 14:23:45] Found database query optimization opportunity
[2026-05-16 14:24:12] Generating optimization plan...

Status: Running (12m)`,
    tips: [
      'Read-only — does not interfere with the session',
      'Logs are automatically truncated to the latest content',
      'Useful for monitoring background tasks in CI',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-stop',
    name: 'claude stop',
    category: 'cli',
    summary: 'Stop a background agent session',
    description:
      'Stops a running background agent session. The session\'s conversation record and worktree are preserved. Alias: claude kill.',
    usage: 'claude stop <session_id>',
    example: 'claude stop 7c5dcf5d',
    exampleOutput: `Stopping session 7c5dcf5d...
✓ Stopped
Conversation history and worktree preserved
Use claude respawn to restart`,
    tips: [
      'Can be restarted with claude respawn after stopping',
      'Does not delete conversation records',
      'claude kill also works',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-rm',
    name: 'claude rm',
    category: 'cli',
    summary: 'Delete a background session record',
    description:
      'Removes a session record from the background session list. Does not delete the worktree or files — only removes the management entry.',
    usage: 'claude rm <session_id>',
    example: 'claude rm 7c5dcf5d',
    exampleOutput: `Session 7c5dcf5d deleted
Worktree and files unaffected`,
    tips: [
      'Only deletes the record, not the files',
      'Clean up completed sessions',
      'This action cannot be undone — proceed with caution',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-respawn',
    name: 'claude respawn',
    category: 'cli',
    summary: 'Restart a stopped background session',
    description:
      'Restarts a stopped background session with the same conversation content. Supports --all to restart all stopped sessions.',
    usage: 'claude respawn <session_id>',
    example: 'claude respawn 7c5dcf5d',
    exampleOutput: `Restarting session 7c5dcf5d...
✓ Restarted, conversation history fully preserved`,
    tips: [
      'Use --all to restart all stopped sessions',
      'Conversation history is fully preserved',
      'Useful for re-executing after fixing errors',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-remote-control',
    name: 'claude remote-control',
    category: 'cli',
    summary: 'Start a remote control server',
    description:
      'Starts a remote control server that allows remote management of your local Claude Code session from claude.ai or desktop apps. Supports --name to specify a name.',
    usage: 'claude remote-control [--name <name>]',
    example: 'claude remote-control --name "My Server"',
    exampleOutput: `Remote control started
Name: My Server
Status: Waiting for connection...
Connect via claude.ai/code to this session`,
    tips: [
      'Remote control from claude.ai/code or desktop apps',
      'Server mode — no local interaction',
      'Ideal for running on a server and operating remotely',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-project-purge',
    name: 'claude project purge',
    category: 'cli',
    summary: 'Delete a project\'s local state data',
    description:
      'Deletes all local Claude Code state for a project: conversation records, task lists, debug logs, file edit history, and prompt history. Supports --dry-run for preview.',
    usage: 'claude project purge [path]',
    example: 'claude project purge ~/work/repo --dry-run',
    exampleOutput: `Project Cleanup Preview (--dry-run)
Will delete:
  • Conversation records: 12 sessions
  • Task list: 8 tasks
  • Debug logs: 3.2 MB
  • Edit history: 47 records

Total space freed: ~4.1 MB`,
    tips: [
      'Use --dry-run to preview what will be deleted',
      '-y skips confirmation and deletes directly',
      '--all cleans up all projects',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-setup-token',
    name: 'claude setup-token',
    category: 'cli',
    summary: 'Generate a long-lived OAuth token for CI/CD',
    description:
      'Generates a long-lived OAuth token for use in CI/CD and scripting scenarios. The token is printed directly to the terminal and not saved to a file. Requires a Claude subscription.',
    usage: 'claude setup-token',
    example: 'claude setup-token',
    exampleOutput: `Long-lived token generated:
claude-xxxxxxxxxxxxxxxxxxxxxxx

Please save this token securely to your CI/CD environment variables
The token will not be saved to a local file automatically`,
    tips: [
      'The token is only shown once — save it immediately',
      'Ideal for CI environments like GitHub Actions',
      'Requires a Claude subscription account',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-plugin',
    name: 'claude plugin',
    category: 'cli',
    summary: 'Manage plugins via CLI',
    description:
      'Manage Claude Code plugins via the command line. Supports install/uninstall/list subcommands. Complements the in-session /plugin command.',
    usage: 'claude plugin <subcommand>',
    aliases: ['claude plugins'],
    example: 'claude plugin install code-review@claude-plugins-official',
    exampleOutput: `Installing plugin...
✓ code-review@claude-plugins-official installed
Use claude plugin list to view installed plugins`,
    tips: [
      'Can be used for batch installation in scripts',
      'claude plugin list to view installed plugins',
      'claude plugin uninstall <name> to uninstall',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-auto-mode',
    name: 'claude auto-mode',
    category: 'cli',
    summary: 'View or configure auto-mode rules',
    description:
      'Prints built-in auto-mode classification rules (defaults) or the currently active configuration (config). Auto mode lets Claude autonomously decide execution steps.',
    usage: 'claude auto-mode <defaults|config>',
    example: 'claude auto-mode defaults > rules.json',
    exampleOutput: `Auto-mode rules exported to rules.json
Contains all built-in classification rules`,
    tips: [
      'defaults outputs built-in rules as JSON',
      'config outputs the currently active configuration',
      'Can export, customize rules, and re-import',
    ],
    difficulty: 3,
  },
  {
    id: 'claude-mcp-serve',
    name: 'claude mcp serve',
    category: 'cli',
    summary: 'Start Claude Code itself as an MCP server',
    description:
      'Starts Claude Code as an MCP server, allowing other MCP clients (such as Claude Desktop) to invoke Claude Code\'s functionality via the MCP protocol.',
    usage: 'claude mcp serve',
    example: 'claude mcp serve',
    exampleOutput: `MCP server started
Claude Code is now available as an MCP tool
Listening on Stdio transport...`,
    tips: [
      'Other MCP clients can call Claude Code through this interface',
      'Suitable for embedding into custom toolchains',
      'Requires logging in to an Anthropic account first',
    ],
    difficulty: 3,
  },

  // ========== Advanced Features ==========
  {
    id: 'mcp',
    name: '/mcp',
    category: 'opencode',
    summary: 'Manage MCP plugins (install/uninstall/list)',
    description:
      'Install, uninstall, and list MCP (Model Context Protocol) plugins. MCP plugins extend Claude Code\'s capabilities, such as file operations, network requests, and more.',
    usage: '/mcp list',
    example: '/mcp list',
    exampleOutput: `Installed MCP Plugins:

✓ filesystem  - Local file operations
✓ github      - GitHub API integration
✓ sequential-thinking - Thinking tool

Run /mcp install <name> to install more`,
    tips: [
      '/mcp list to view installed plugins',
      '/mcp add <name> to install a new plugin',
      '/mcp remove <name> to uninstall a plugin',
      'Plugin configuration is in ~/.claude/settings.json',
    ],
    difficulty: 3,
  },
  {
    id: 'agents',
    name: '/agents',
    category: 'opencode',
    summary: 'Manage AI sub-agent teams',
    description:
      'Create and manage specialized AI sub-agents, each with their own context and tool permissions. Great for division of labor on complex projects.',
    usage: '/agents',
    example: '/agents',
    exampleOutput: `Sub-agent Management

Available Sub-agents:
• @code-reviewer - Code review expert
• @architect    - Architecture design expert
• @tester      - Test engineer

Use @agent-name task to invoke`,
    tips: [
      'Ideal for multi-role collaboration on complex projects',
      'Each sub-agent has its own context window',
      'Specify tool permissions: /agents new --tools Edit,Read',
    ],
    difficulty: 3,
  },
  {
    id: 'memory',
    name: '/memory',
    category: 'opencode',
    summary: 'Manage CLAUDE.md memory file',
    description:
      'Edit and manage project memories in the CLAUDE.md file, including project configuration, workflow conventions, and context information.',
    usage: '/memory edit',
    example: '/memory edit',
    exampleOutput: `Editing project memory...

Current CLAUDE.md content:
- Project: React Dashboard
- Tech Stack: React + Tailwind
- Code Style: Functional components + Hooks

Enter memory content to add...`,
    tips: [
      '/memory edit to interactively edit memories',
      '/memory load to reload the memory file',
      'Important project conventions should be written to CLAUDE.md',
    ],
    difficulty: 2,
  },
  {
    id: 'install-github-app',
    name: '/install-github-app',
    category: 'opencode',
    summary: 'Install GitHub App for auto PR reviews',
    description:
      'Sets up the Claude Code GitHub App. Once configured, Claude can automatically review your Pull Requests for bugs, security issues, and code quality.',
    usage: '/install-github-app',
    example: '/install-github-app',
    exampleOutput: `GitHub App Installation

1. Visit: https://github.com/apps/claude-code
2. Select repositories to authorize
3. Complete OAuth authorization

Once installed, Claude will automatically review all new PRs.`,
    tips: [
      'Ideal for team collaboration code review workflows',
      'Can be set to review only specific repositories',
      'Review results are automatically commented on the PR',
    ],
    difficulty: 3,
  },
  {
    id: 'batch',
    name: '/batch',
    category: 'opencode',
    summary: 'Execute large-scale changes in parallel batches',
    description:
      'Splits a large refactoring task into 5-30 independent units, executed in parallel in isolated git worktrees. Each unit is tested independently and creates a PR.',
    usage: '/batch <description>',
    example: '/batch migrate src/utils to TypeScript',
    exampleOutput: `Batch Plan: Migrate to TypeScript
12 independent units, executing in parallel across 12 worktrees

✓ Unit 1/12: utils/date.ts completed
✓ Unit 2/12: utils/format.ts completed
...`,
    tips: [
      'Ideal for large-scale refactoring — automatically split and executed in parallel',
      'Each unit runs in an independent worktree without interference',
      'PRs are auto-created after completion and can be reviewed and merged individually',
    ],
    difficulty: 3,
  },
  {
    id: 'loop',
    name: '/loop',
    category: 'opencode',
    summary: 'Repeatedly execute a task on a timer',
    description:
      'Instructs Claude to repeatedly execute a task at a specified interval. Great for monitoring, maintenance checks, and other periodic work. Claude auto-adjusts the pace when no interval is specified.',
    usage: '/loop <interval> <prompt>',
    example: '/loop 5m check if deployment is complete',
    exampleOutput: `Loop task started
Executing every 5 minutes: check if deployment is complete

[Round 1] Checking... Deployment in progress
[Round 2] Checking... Deployment complete ✓`,
    tips: [
      'Interval formats: 5m (minutes), 1h (hours), 1d (days)',
      'Claude self-regulates the pace when no interval is specified',
      'Suitable for CI/CD monitoring, data scraping, etc.',
    ],
    difficulty: 3,
  },
  {
    id: 'export',
    name: '/export',
    category: 'opencode',
    summary: 'Export conversation records',
    description:
      'Exports the current session in full as Markdown, including all messages, code, and tool output. Great for archiving or sharing.',
    usage: '/export',
    example: '/export',
    exampleOutput: `Conversation exported
File: claude-session-export-2026-05-15.md
Format: Markdown
Includes: All messages, code blocks, tool output`,
    tips: [
      'Exported Markdown can be used directly for documentation or sharing',
      'Contains the full conversation context',
      'Great for recording complex troubleshooting processes',
    ],
    difficulty: 2,
  },
  {
    id: 'add-dir',
    name: '/add-dir',
    category: 'opencode',
    summary: 'Add external directories to file access scope',
    description:
      'Temporarily adds additional working directories so Claude can access files outside the current project. Useful for monorepo or multi-project dependency scenarios.',
    usage: '/add-dir <path>',
    example: '/add-dir ../shared-lib',
    exampleOutput: `Directory added: ../shared-lib
Files in this directory are now accessible
Preserved with --continue or --resume`,
    tips: [
      'Great for monorepo or cross-project reference scenarios',
      'Added directories persist with --continue/--resume',
      'Each session\'s added directories are independent',
    ],
    difficulty: 2,
  },
  {
    id: 'branch',
    name: '/branch',
    category: 'opencode',
    summary: 'Branch the current conversation for exploration',
    description:
      'Creates a branch from a point in the current conversation, preserving the original conversation intact. Great for trying different solution directions with the option to revert.',
    usage: '/branch [name]',
    example: '/branch try-zustand',
    exampleOutput: `Branch created: try-zustand
Original conversation saved, can be restored via /resume`,
    tips: [
      'Ideal for comparing different technical approaches',
      'The original conversation is fully preserved after branching',
      'Use /resume to switch back to the original branch',
    ],
    difficulty: 3,
  },
  {
    id: 'background',
    name: '/background',
    category: 'opencode',
    summary: 'Move session to background for async execution',
    description:
      'Moves the current session to a background agent for execution, freeing up the current terminal. Use claude agents to view and manage background sessions.',
    usage: '/background [prompt]',
    aliases: ['/bg'],
    example: '/background continue optimizing performance',
    exampleOutput: `Moving to background...
Session ID: 7c5dcf5d
Use claude agents to check status
Terminal freed`,
    tips: [
      'Background sessions do not occupy the current terminal',
      'View and manage via claude agents',
      'Ideal for long-running tasks',
    ],
    difficulty: 3,
  },
  {
    id: 'permissions',
    name: '/permissions',
    category: 'opencode',
    summary: 'Manage tool permission settings',
    description:
      'View and modify Claude\'s tool usage permissions. You can grant or restrict Claude\'s access to the file system, terminal, and more at any time.',
    usage: '/permissions',
    example: '/permissions',
    exampleOutput: `Current Permission Settings:
✓ Bash     - Allowed
✓ Read     - Allowed
✓ Write    - Allowed
✗ Web      - Restricted

Type /permissions to modify interactively`,
    tips: [
      'Restricting permissions improves security',
      'Supports granular control by tool type',
      'Changes take effect immediately — no session restart needed',
    ],
    difficulty: 2,
  },
  {
    id: 'btw',
    name: '/btw',
    category: 'opencode',
    summary: 'Ask a side question without interrupting the conversation',
    description:
      'Ask a quick question without affecting the current context. The answer does not pollute the main conversation context. Great for sudden questions.',
    usage: '/btw <question>',
    example: '/btw what is the complexity of this function?',
    exampleOutput: `Side note: Current function complexity is O(n²)
Recommend using HashMap to optimize to O(n)
(This answer is not counted in the main conversation context)`,
    tips: [
      'Side questions do not affect the main conversation context',
      'Great for quick questions that come to mind',
      'Answers are concise without extended discussion',
    ],
    difficulty: 1,
  },
  {
    id: 'buddy',
    name: '/buddy',
    category: 'opencode',
    summary: 'Summon a terminal pet companion',
    description:
      'Summons an adorable terminal pet to keep you company while coding. 18 species across 5 rarity levels, each pet uniquely determined by your account ID.',
    usage: '/buddy',
    example: '/buddy',
    exampleOutput: `Your Terminal Pet: Dark Cat
Rarity: ⭐⭐⭐ Rare
Mood: Cheerful (napping in your code)`,
    tips: [
      'Pet species are uniquely determined by account ID',
      '5 rarity levels, from common to legendary',
      'Type /buddy again to hide',
    ],
    difficulty: 1,
  },
  {
    id: 'voice',
    name: '/voice',
    category: 'opencode',
    summary: 'Toggle voice input mode',
    description:
      'Enables or disables voice input mode. When enabled, you can talk to Claude — hold the space bar to record voice.',
    usage: '/voice',
    example: '/voice',
    exampleOutput: `Voice mode enabled
Hold the space bar to record voice
Type /voice again to disable`,
    tips: [
      'Requires microphone permission',
      'Hold space to record, release to send automatically',
      'Great for situations where typing is inconvenient',
    ],
    difficulty: 2,
  },
  {
    id: 'effort',
    name: '/effort',
    category: 'opencode',
    summary: 'Set Claude\'s effort level',
    description:
      'Controls how much effort Claude puts into reasoning: low for quick responses, medium for balance, high for deep thinking. Affects response quality and speed.',
    usage: '/effort <level>',
    example: '/effort high',
    exampleOutput: `Effort level: high
Claude will perform deeper reasoning analysis
Note: Response time may increase`,
    tips: [
      'low is best for simple Q&A — fastest responses',
      'high is best for complex reasoning — highest quality',
      'medium is the default balanced mode',
    ],
    difficulty: 2,
  },
  {
    id: 'theme',
    name: '/theme',
    category: 'opencode',
    summary: 'Manage terminal themes',
    description:
      'Browse and apply Claude Code terminal themes. Supports light/dark theme switching and community-contributed third-party themes.',
    usage: '/theme [theme_name]',
    example: '/theme',
    exampleOutput: `Theme Management
Current: default (light)
Installed: 3
1. default    - Default light
2. dark       - Default dark
3. monokai    - Community theme`,
    tips: [
      'Plugins can include a themes/ directory',
      'Themes only affect terminal appearance, not functionality',
      '/theme default restores the default',
    ],
    difficulty: 2,
  },
  {
    id: 'hooks',
    name: '/hooks',
    category: 'opencode',
    summary: 'View hook configuration',
    description:
      'View the Pre/Post hooks configured for the current project. Hooks can automatically execute custom logic before and after tool calls.',
    usage: '/hooks',
    example: '/hooks',
    exampleOutput: `Hook Configuration
PreToolUse:  2 hooks
PostToolUse: 1 hook
PreMessage:  0 hooks

Run /config to modify hook configuration`,
    tips: [
      'Hooks can automate repetitive operations in workflows',
      'PreToolUse triggers before tool execution',
      'PostToolUse triggers after tool execution',
    ],
    difficulty: 2,
  },
  {
    id: 'skills',
    name: '/skills',
    category: 'opencode',
    summary: 'List installed skills',
    description:
      'Lists all installed custom skills, with search filtering. Skills are reusable instruction sets that extend Claude\'s capabilities.',
    usage: '/skills',
    example: '/skills',
    exampleOutput: `Installed Skills (5)
1. code-review   - Code review expert
2. architect     - Architecture design
3. tester        - Test writing
4. docs          - Documentation generation
5. debug         - Debug helper

Type /skills <name> for details`,
    tips: [
      'Skill files are stored in ~/.claude/skills/ or .claude/skills/',
      'Many community-shared skills are available',
      'You can write your own skills',
    ],
    difficulty: 2,
  },
  {
    id: 'powerup',
    name: '/powerup',
    category: 'opencode',
    summary: 'Interactive feature tutorial',
    description:
      'Launches an interactive feature tutorial with animated demonstrations. Learn Claude Code\'s advanced features through hands-on walkthroughs.',
    usage: '/powerup',
    example: '/powerup',
    exampleOutput: `PowerUp: MCP Plugin Management
┌──────────────────────────┐
│  Learn to install a       │
│  plugin in 3 steps        │
│  1. /mcp list             │
│  2. /mcp add github       │
│  3. Configure API Key     │
│                           │
│  Start demo? (y/n)        │
└──────────────────────────┘`,
    tips: [
      'Great for learning new features',
      'Each tutorial step has an operational demo',
      'You can exit the tutorial at any time',
    ],
    difficulty: 2,
  },
  {
    id: 'login',
    name: '/login',
    category: 'opencode',
    summary: 'Log in to an account within the session',
    description:
      'Triggers the login flow directly within the session without needing to exit. Suitable for when login expires or switching accounts.',
    usage: '/login',
    example: '/login',
    exampleOutput: `Opening login page...
Please complete authentication
✓ Login successful`,
    tips: [
      'Does not interrupt the current session',
      'Takes effect immediately after login',
      '/logout to log out of the current account',
    ],
    difficulty: 2,
  },
  {
    id: 'logout',
    name: '/logout',
    category: 'opencode',
    summary: 'Log out within the current session',
    description:
      'Logs out of the current Anthropic account without exiting the Claude Code session. Useful before switching accounts.',
    usage: '/logout',
    example: '/logout',
    exampleOutput: `Logged out
Use /login to log back in`,
    tips: [
      'The session continues after logout, but some features may be restricted',
      'Does not affect sessions in other terminals',
      'Use /login to log back in',
    ],
    difficulty: 2,
  },
  {
    id: 'bashes',
    name: '/bashes',
    category: 'opencode',
    summary: 'View background Bash tasks',
    description:
      'Lists all Bash tasks running in the background, including their status and execution time. Monitor long-running scripts.',
    usage: '/bashes',
    example: '/bashes',
    exampleOutput: `Background Bash Tasks (2)
1. PID: 12345  npm run test  - Running (5m12s)
2. PID: 12389  python train.py - Completed

claude attach <pid> to view output`,
    tips: [
      'Attach to a task by PID',
      'Long-running scripts are moved to the background automatically',
      'Monitor builds, training, and other time-consuming tasks',
    ],
    difficulty: 2,
  },
  {
    id: 'tasks',
    name: '/tasks',
    category: 'opencode',
    summary: 'View background agent tasks',
    description:
      'Lists all background or completed AI sub-agent tasks, including status, progress, and output summaries for each.',
    usage: '/tasks',
    example: '/tasks',
    exampleOutput: `Background Tasks (3)
1. 🔄 Code Review    - In Progress (45%)
2. ✅ Test Writing   - Completed (100%)
3. ⏳ Doc Generation - Queued

claude attach <id> to attach to task`,
    tips: [
      '/bashes shows system tasks, /tasks shows AI tasks',
      'Use claude attach to attach to tasks for details',
      'Completed tasks are retained for 24 hours',
    ],
    difficulty: 2,
  },
  {
    id: 'claude-api',
    name: '/claude-api',
    category: 'opencode',
    summary: 'Load Claude API development reference',
    description:
      'Loads Claude API SDK reference docs, supporting TypeScript/Python/Java/Go/Ruby/C#/PHP/cURL. Automatically activates when an anthropic import is detected.',
    usage: '/claude-api',
    example: '/claude-api',
    exampleOutput: `Claude API Reference (TypeScript)
Loaded: Tool calling, streaming responses, structured output

Auto-activates when importing @anthropic-ai/sdk
Run /claude-api migrate to upgrade API version`,
    tips: [
      'Automatically activates when an anthropic import is detected',
      'Supports reference docs for 8 programming languages',
      '/claude-api migrate to upgrade legacy API',
    ],
    difficulty: 3,
  },
  // ===== New: Official v2 key commands =====
  {
    id: 'resume',
    name: '/resume',
    category: 'opencode',
    summary: 'Resume a previous conversation session',
    description:
      'Lists all historical sessions for selection and recovery. Supports direct recovery by ID or name, and an interactive selector. Same functionality as claude --resume, but more convenient within a session.',
    usage: '/resume [session_id|session_name]',
    aliases: ['/continue'],
    example: '/resume',
    exampleOutput: `Historical Sessions:
 1. auth-refactor      (2h ago) - 45.2k tokens
 2. bug-fix-login      (yesterday) - 12.8k tokens
 3. feature-dashboard  (3 days ago) - 89.1k tokens

Select session to resume (1-3):`,
    tips: [
      'Opens the interactive selector when called without arguments',
      'Resume by name: /resume auth-refactor',
      'All context is fully preserved after resuming',
    ],
    difficulty: 1,
  },
  {
    id: 'recap',
    name: '/recap',
    category: 'opencode',
    summary: 'Generate a one-sentence summary of the current session',
    description:
      'Generates a one-sentence summary of the current session at any time. Helps remember session goals and progress, making it easy to pick up where you left off.',
    usage: '/recap',
    example: '/recap',
    exampleOutput: `Session Summary: Refactoring the user auth module, adding OAuth2 support
Completed: Basic auth flow refactoring (85%)
In Progress: Token refresh mechanism`,
    tips: [
      'Run /recap before leaving a session to get back up to speed quickly',
      'The summary appears in the session restore list',
      'Does not affect the current session context',
    ],
    difficulty: 1,
  },
  {
    id: 'debug',
    name: '/debug',
    category: 'opencode',
    summary: 'Enable debug logs and troubleshoot issues',
    description:
      'Enables debug logging for the current session and troubleshoots issues. Debug logs are off by default; running /debug starts capturing and analyzing logs. Optionally describe the issue to focus the analysis.',
    usage: '/debug [issue_description]',
    example: '/debug MCP server connection failed',
    exampleOutput: `Debug enabled
Capturing logs for analysis...

[Debug] MCP Server Connection Status:
  ✓ filesystem - Connected
  ✗ github     - Connection timeout (30s)
  ✓ brave-search - Connected

Suggestion: Check GitHub token configuration`,
    tips: [
      'Debug logs are not recorded by default; /debug starts capturing',
      'Include a description to focus the analysis scope',
      'Works great in combination with /doctor',
    ],
    difficulty: 2,
  },
  {
    id: 'goal',
    name: '/goal',
    category: 'opencode',
    summary: 'Set a persistent goal for Claude to work toward',
    description:
      'Sets a persistent goal that Claude will continuously work toward across multiple conversation rounds until the conditions are met. Ideal for multi-step tasks.',
    usage: '/goal <condition>',
    aliases: ['/goal clear'],
    example: '/goal all tests pass',
    exampleOutput: `Goal set: all tests pass
Claude will continue working until all tests pass
Run /goal to view current progress
Run /goal clear to cancel the goal`,
    tips: [
      'Goals persist across multiple conversation rounds',
      '/goal to check current goal status',
      '/goal clear to cancel the current goal',
    ],
    difficulty: 2,
  },
  {
    id: 'plugin',
    name: '/plugin',
    category: 'opencode',
    summary: 'Manage Claude Code plugins',
    description:
      'Install, uninstall, list, and manage Claude Code plugins. Plugins are extension packs that can include skills, MCP configurations, themes, and more. Install from the official marketplace.',
    usage: '/plugin install <name>',
    example: '/plugin list',
    exampleOutput: `Installed Plugins (2):
  ✓ code-review@claude-plugins-official
  ✓ theme-monokai@community

Run /plugin install <name> to install more
Run /plugin remove <name> to uninstall`,
    tips: [
      'Plugins can include skills, themes, MCP configs, etc.',
      'Official marketplace: claude-plugins-official',
      '/plugin list to view installed plugins',
    ],
    difficulty: 3,
  },
  {
    id: 'teleport',
    name: '/teleport',
    category: 'opencode',
    summary: 'Pull a Web session to the local terminal',
    description:
      'Pulls a session started on the claude.ai/code web page to the local terminal. Opens a selector and automatically pulls branches and conversations. Requires a claude.ai subscription.',
    usage: '/teleport',
    aliases: ['/tp'],
    example: '/teleport',
    exampleOutput: `Pulling Web sessions...
Select a Web session:
 1. Auth Refactor (Chrome) - 12m ago
 2. Bug Fix (Firefox) - 1h ago

Session synced to local terminal ✓`,
    tips: [
      'Need to start a Web session on claude.ai/code first',
      'All context is fully preserved after pulling',
      '/tp is shorthand',
    ],
    difficulty: 2,
  },
  {
    id: 'schedule',
    name: '/schedule',
    category: 'opencode',
    summary: 'Create scheduled auto-executing tasks',
    description:
      'Create, update, list, or execute scheduled tasks (Routines) that run automatically on Anthropic-managed cloud infrastructure. Claude will guide you through the setup.',
    usage: '/schedule <description>',
    aliases: ['/routines'],
    example: '/schedule run tests and report results every morning',
    exampleOutput: `Scheduled task created
Routine: Daily Test Report
Frequency: Daily 00:00
Task: Run test suite and send summary

Run /schedule to view all scheduled tasks`,
    tips: [
      'Scheduled tasks run in the cloud — no need to keep your local machine running',
      '/routines is an alias',
      'Supports complex scheduling rules',
    ],
    difficulty: 3,
  },
  {
    id: 'focus',
    name: '/focus',
    category: 'opencode',
    summary: 'Toggle focus view mode',
    description:
      'Toggles focus view, showing only the recent prompt, tool call summary (with edit diffs), and final response. Reduces distractions so you can concentrate on the core content.',
    usage: '/focus',
    example: '/focus',
    exampleOutput: `Focus view enabled
Showing only: Recent prompt → Tool summary → Final response
Run /focus again to restore normal view`,
    tips: [
      'Only available in full-screen rendering mode',
      'The setting persists across sessions automatically',
      'Great for scenarios where you need to reduce information clutter',
    ],
    difficulty: 1,
  },
  {
    id: 'insights',
    name: '/insights',
    category: 'opencode',
    summary: 'Generate a session usage analysis report',
    description:
      'Analyzes your Claude Code session data and generates a usage report. Includes project domains, interaction patterns, and bottleneck analysis to help optimize your usage habits.',
    usage: '/insights',
    example: '/insights',
    exampleOutput: `Claude Code Usage Insights
Project Domains: Frontend (45%) / API (30%) / Testing (15%)
Most Used Commands: /diff, /compact, /model, /search
Improvement Suggestion: Use /batch more for batch refactoring`,
    tips: [
      'Run weekly to track usage trends',
      'Helps identify efficiency improvement opportunities',
      'Data is analyzed locally and not uploaded',
    ],
    difficulty: 1,
  },
  {
    id: 'desktop',
    name: '/desktop',
    category: 'opencode',
    summary: 'Switch to the desktop app to continue the session',
    description:
      'Switches the current session to the Claude Code desktop application (macOS/Windows). All context is fully preserved.',
    usage: '/desktop',
    aliases: ['/app'],
    example: '/desktop',
    exampleOutput: `Switching to desktop app...
Session transferred to Claude Code desktop application
All context synced ✓`,
    tips: [
      'Only supported on macOS and Windows',
      'Desktop app has native GUI and multi-session management',
      '/app is shorthand',
    ],
    difficulty: 1,
  },
  {
    id: 'sandbox',
    name: '/sandbox',
    category: 'opencode',
    summary: 'Toggle sandbox security mode',
    description:
      'Enables or disables sandbox mode. In sandbox mode, Claude\'s file operations are strictly restricted to prevent accidental modifications. Ideal for reviewing untrusted code or testing.',
    usage: '/sandbox',
    example: '/sandbox',
    exampleOutput: `Sandbox mode enabled
File operations are strictly restricted
Run /sandbox again to disable sandbox`,
    tips: [
      'Cannot modify files in sandbox mode',
      'Ideal for reviewing untrusted code suggestions',
      'May not be supported on all platforms',
    ],
    difficulty: 2,
  },
  {
    id: 'fewer-permission-prompts',
    name: '/fewer-permission-prompts',
    category: 'opencode',
    summary: 'Reduce permission confirmation popups',
    description:
      'Scans recent conversation history to identify common read-only Bash and MCP tool calls, automatically adding them to the project\'s .claude/settings.json whitelist to reduce repeated confirmations.',
    usage: '/fewer-permission-prompts',
    example: '/fewer-permission-prompts',
    exampleOutput: `Scan complete
Found 12 common read-only operations:
  • Bash(git log *) - Approved
  • Bash(git diff *) - Approved
  • Read - Approved

Added to .claude/settings.json ✓`,
    tips: [
      'Only auto-approves read-only operations',
      'Write operations still require confirmation',
      'Can be modified in /permissions',
    ],
    difficulty: 2,
  },
  {
    id: 'team-onboarding',
    name: '/team-onboarding',
    category: 'opencode',
    summary: 'Generate a team onboarding guide',
    description:
      'Generates a team onboarding guide from your last 30 days of Claude Code usage. Includes common commands, MCP configuration, best practices, and more.',
    usage: '/team-onboarding',
    example: '/team-onboarding',
    exampleOutput: `Team Onboarding Guide Generated

1. Install: npm install -g @anthropic-ai/claude-code
2. Log in: claude auth login
3. Configure MCP: Copy the following settings.json...
4. Common Commands: /help, /diff, /compact, /model
5. Best Practices: Daily /recap, complex tasks use /plan

Share link generated ✓`,
    tips: [
      'Based on your actual usage data',
      'Ideal for onboarding new team members quickly',
      'Pro/Max/Team/Enterprise supports sharing links',
    ],
    difficulty: 1,
  },
]

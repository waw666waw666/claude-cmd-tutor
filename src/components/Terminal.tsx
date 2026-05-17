import { useState, useRef, useEffect, useMemo, useCallback, type KeyboardEvent, type MouseEvent } from 'react'
import useProgress from '../store/useProgress'
import type { PracticeState } from '../types'
import { commands } from '../data/commands'
import { scenarios } from '../data/scenarios'
import { Lightbulb, X } from 'lucide-react'
import { useI18n } from '../i18n/context'

function replaceParams(str: string, params: Record<string, string>) {
  return str.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`)
}

interface TerminalProps {
  practiceState?: PracticeState
  showHints?: boolean
  onToggleHints?: () => void
  autoNext?: boolean
  onPracticeUpdate?: (update: Partial<PracticeState>) => void
  onClose?: () => void
}

export default function Terminal({ practiceState, showHints = true, onToggleHints, autoNext = false, onPracticeUpdate, onClose }: TerminalProps) {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selIdx, setSelIdx] = useState(0)
  const pendingFill = useRef(false)
  const [terminalHeight, setTerminalHeight] = useState(200)
  const [isResizing, setIsResizing] = useState(false)
  const terminalHeightRef = useRef(200)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const suggestionRef = useRef<HTMLDivElement>(null)
  const resizeStartY = useRef(0)
  const resizeStartHeight = useRef(0)
  const {
    terminalLines,
    addTerminalLine,
    clearTerminal,
    markCommandCompleted,
    markScenarioStep,
    markScenarioCompleted,
    addPracticeCount,
  } = useProgress()

  const suggestions = useMemo(() => {
    if (!showHints || !input.startsWith('/')) return []
    const q = input.toLowerCase()
    const all = commands.map(c => c.name)
    return all.filter(c => c.toLowerCase().includes(q))
  }, [input, showHints])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [terminalLines])

  useEffect(() => {
    if (practiceState?.mode === 'practice' || practiceState?.mode === 'scenario') {
      inputRef.current?.focus()
      terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [practiceState?.mode, practiceState?.currentCommandId, practiceState?.currentScenarioId])

  useEffect(() => {
    if (practiceState?.mode === 'practice' && practiceState.currentCommandId) {
      clearTerminal()
      const cmd = commands.find(c => c.id === practiceState.currentCommandId)
      if (cmd) {
        addTerminalLine('practice', {
          type: 'system',
          content: replaceParams(t.terminal.practice, { cmd: cmd.name }),
        })
        addTerminalLine('practice', {
          type: 'output',
          content: cmd.description,
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceState?.currentCommandId, practiceState?.mode])

  useEffect(() => {
    if (practiceState?.mode === 'scenario' && practiceState.currentScenarioId) {
      const scenario = scenarios.find(s => s.id === practiceState.currentScenarioId)
      if (!scenario) return
      const step = practiceState.currentStepIndex

      if (step === 0) {
        clearTerminal()
        addTerminalLine('scenario', {
          type: 'system',
          content: replaceParams(t.terminal.scenarioStart, { title: scenario.title }),
        })
        addTerminalLine('scenario', {
          type: 'output',
          content: scenario.context,
        })
      } else if (terminalLines.length === 0) {
        clearTerminal()
        addTerminalLine('scenario', {
          type: 'system',
          content: replaceParams(t.terminal.scenarioContinue, { title: scenario.title, completed: String(step), total: String(scenario.steps.length) }),
        })
      }

      const alreadyHasQuestion = terminalLines.some(l => l.content.includes(scenario.steps[step]?.question ?? ''))
      if (scenario.steps[step] && !alreadyHasQuestion) {
        addTerminalLine('scenario', {
          type: 'system',
          content: replaceParams(t.terminal.scenarioQuestion, { question: scenario.steps[step].question }),
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceState?.currentScenarioId, practiceState?.mode, practiceState?.currentStepIndex])

  useEffect(() => {
    if (showHints && suggestions.length > 0 && suggestionRef.current) {
      const active = suggestionRef.current.querySelector(`[data-idx="${selIdx}"]`) as HTMLElement | null
      active?.scrollIntoView({ block: 'nearest' })
    }
  }, [selIdx, showHints, suggestions.length])

  const handleSimulateCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    addTerminalLine('input', {
      type: 'input',
      content: replaceParams(t.terminal.inputEcho, { cmd: trimmed }),
    })

    const matched = commands.find(c =>
      trimmed.toLowerCase() === c.name.toLowerCase() ||
      c.aliases?.some(a => trimmed.toLowerCase() === a.toLowerCase())
    )

    if (practiceState?.mode === 'practice' && practiceState.currentCommandId) {
      const targetCmd = commands.find(c => c.id === practiceState.currentCommandId)
      if (targetCmd) {
        const isCorrect = trimmed.toLowerCase() === targetCmd.name.toLowerCase()
        if (isCorrect) {
          addTerminalLine('practice', {
            type: 'success',
            content: replaceParams(t.terminal.correct, { name: targetCmd.name, summary: targetCmd.summary }),
          })
          addTerminalLine('practice', {
            type: 'output',
            content: targetCmd.exampleOutput,
          })
          markCommandCompleted(targetCmd.id)
          addPracticeCount()

          if (autoNext && practiceState?.mode === 'practice') {
            const uncompleted = commands.filter(c => !useProgress.getState().commandProgress[c.id]?.completed)
            if (uncompleted.length > 0) {
              const currentIdx = commands.findIndex(c => c.id === targetCmd.id)
              const nextUncompleted = uncompleted.find(c => commands.indexOf(c) > currentIdx) ?? uncompleted[0]
              addTerminalLine('practice', {
                type: 'system',
                content: replaceParams(t.terminal.autoNext, { name: nextUncompleted.name }),
              })
              setTimeout(() => {
                clearTerminal()
                onPracticeUpdate?.({ mode: 'practice', currentCommandId: nextUncompleted.id })
                inputRef.current?.focus()
              }, 800)
            } else {
              addTerminalLine('practice', {
                type: 'success',
                content: t.terminal.allDone,
              })
              onPracticeUpdate?.({ mode: 'normal', currentCommandId: null })
            }
          } else {
            onPracticeUpdate?.({ mode: 'normal', currentCommandId: null })
          }
          inputRef.current?.focus()
        } else {
          addTerminalLine('practice', {
            type: 'error',
            content: replaceParams(t.terminal.wrong, { expected: targetCmd.name }),
          })
        }
        return
      }
    }

    if (practiceState?.mode === 'scenario' && practiceState.currentScenarioId) {
      const scenario = scenarios.find(s => s.id === practiceState.currentScenarioId)
      const step = scenario?.steps[practiceState.currentStepIndex]
      if (scenario && step) {
        const normalize = (s: string) => s.toLowerCase().replace(/--\w+/g, '').trim()
        const isCorrect = normalize(trimmed) === normalize(step.expectedCommand)

        if (isCorrect) {
          addTerminalLine('scenario', {
            type: 'success',
            content: step.feedback,
          })
          markScenarioStep(scenario.id, step.id)
          addPracticeCount()

          const nextIndex = practiceState.currentStepIndex + 1
          if (nextIndex >= scenario.steps.length) {
            markScenarioCompleted(scenario.id)
            addTerminalLine('scenario', {
              type: 'success',
              content: replaceParams(t.terminal.scenarioComplete, { title: scenario.title }),
            })
            onPracticeUpdate?.({ mode: 'normal', currentScenarioId: null, currentStepIndex: 0 })
          } else {
            addTerminalLine('scenario', {
              type: 'system',
              content: replaceParams(t.terminal.scenarioQuestion, { question: scenario.steps[nextIndex].question }),
            })
            onPracticeUpdate?.({ currentStepIndex: nextIndex })
          }
        } else {
          addTerminalLine('scenario', {
            type: 'error',
            content: replaceParams(t.terminal.scenarioWrong, { hint: step.expectedCommand }),
          })
        }
        return
      }
    }

    if (matched) {
      addTerminalLine('output', {
        type: 'output',
        content: matched.exampleOutput,
      })
    } else {
      addTerminalLine('error', {
        type: 'error',
        content: replaceParams(t.terminal.unknown, { cmd: trimmed }),
      })
    }
  }, [practiceState, onPracticeUpdate, addTerminalLine, markCommandCompleted, markScenarioStep, markScenarioCompleted, addPracticeCount])

  const selectSuggestion = (name: string) => {
    setInput(name + ' ')
    setSelIdx(0)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (selIdx < suggestions.length - 1) {
          setSelIdx(selIdx + 1)
        } else if (historyIndex >= 0) {
          pendingFill.current = false
          const newIndex = historyIndex + 1
          if (newIndex >= history.length) {
            setHistoryIndex(-1)
            setInput('')
          } else {
            setHistoryIndex(newIndex)
            setInput(history[newIndex])
          }
        }
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (selIdx > 0) {
          setSelIdx(selIdx - 1)
        } else if (history.length > 0) {
          pendingFill.current = false
          const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        if (pendingFill.current) {
          pendingFill.current = false
          handleSimulateCommand(suggestions[selIdx])
          setHistory(prev => [...prev, suggestions[selIdx]])
          setHistoryIndex(-1)
          setInput('')
        } else {
          pendingFill.current = true
          setInput(suggestions[selIdx])
        }
        setSelIdx(0)
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        pendingFill.current = true
        setInput(suggestions[selIdx])
        setSelIdx(0)
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setInput('')
        pendingFill.current = false
        return
      }
    }

    if (e.key === 'Enter' && input.trim()) {
      handleSimulateCommand(input)
      setHistory(prev => [...prev, input])
      setHistoryIndex(-1)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      clearTerminal()
    }
  }

  const handleResizeStart = (e: MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setIsResizing(true)
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    resizeStartY.current = clientY
    resizeStartHeight.current = terminalHeight
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const delta = resizeStartY.current - e.clientY
      const newHeight = Math.min(Math.max(120, resizeStartHeight.current + delta), 500)
      setTerminalHeight(newHeight)
      terminalHeightRef.current = newHeight
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (!isResizing) return
      const delta = resizeStartY.current - e.touches[0].clientY
      const newHeight = Math.min(Math.max(120, resizeStartHeight.current + delta), 500)
      setTerminalHeight(newHeight)
      terminalHeightRef.current = newHeight
    }
    const handleEnd = () => {
      setIsResizing(false)
      if (terminalHeightRef.current <= 140) {
        onClose?.()
      }
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove as unknown as EventListener)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false })
      document.addEventListener('touchend', handleEnd)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleTouchMove as unknown as EventListener)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isResizing])

  return (
    <div
      ref={terminalRef}
      className={`border-t border-[var(--color-terminal-border)] bg-[var(--color-bg-terminal)] transition-all relative ${isResizing ? 'select-none' : ''}`}
    >
        <div
          className="h-1.5 cursor-ns-resize opacity-0 hover:opacity-50 hover:bg-[var(--color-accent)]/20 active:opacity-50 active:bg-[var(--color-accent)]/20 transition-opacity"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        />

      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-terminal-border)]">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              practiceState?.mode === 'practice'
                ? 'bg-[var(--color-terminal-success)]'
                : practiceState?.mode === 'scenario'
                ? 'bg-[var(--color-terminal-system)]'
                : 'bg-[var(--color-terminal-placeholder)]'
            }`} />
            <span className="text-xs font-mono text-[var(--color-text-dim)]">
              {practiceState?.mode === 'practice'
                ? t.terminal.modePractice
                : practiceState?.mode === 'scenario'
                ? t.terminal.modeChallenge
                : t.terminal.modeTerminal}
            </span>
          </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--color-terminal-placeholder)]">
            {terminalLines.length} lines
          </span>
          <button
            onClick={clearTerminal}
            className="text-xs text-[var(--color-terminal-placeholder)] hover:text-[var(--color-text-dim)] transition-colors"
          >
            {t.terminal.clear}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-6 h-6 rounded text-[var(--color-terminal-error)] hover:opacity-80 transition-opacity"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-y-auto p-3 font-mono text-sm space-y-1 terminal-text"
        style={{ height: terminalHeight - 90 }}
        onClick={() => inputRef.current?.focus()}
      >
        {terminalLines.length === 0 && (
          <div className="text-[var(--color-terminal-placeholder)] italic">
            Type a command to begin. Try /help, /doctor, /cost...
          </div>
        )}
        {terminalLines.map((line) => (
          <div
            key={line.id}
            className={`whitespace-pre-wrap ${
              line.type === 'input'
                ? 'text-[var(--color-terminal-accent)]'
                : line.type === 'error'
                ? 'text-[var(--color-terminal-error)]'
                : line.type === 'success'
                ? 'text-[var(--color-terminal-success)]'
                : line.type === 'system'
                ? 'text-[var(--color-terminal-system)]'
                : 'text-[var(--color-terminal-output)]'
            }`}
          >
            {line.content}
          </div>
        ))}
      </div>

      {showHints && suggestions.length > 0 && (
        <div ref={suggestionRef} className="mx-3 mb-2 max-h-64 overflow-y-auto rounded-lg border border-[var(--color-terminal-border)] bg-[var(--color-terminal-suggestion)] shadow-lg">
          {suggestions.map((name, i) => (
            <button
              key={name}
              data-idx={i}
              onClick={() => selectSuggestion(name)}
              onMouseEnter={() => setSelIdx(i)}
              className={`w-full text-left px-3 py-1.5 font-mono text-sm transition-colors ${
                i === selIdx
                  ? 'bg-[var(--color-terminal-suggestion-active)] text-[var(--color-terminal-accent)]'
                  : 'text-[var(--color-text-dim)] hover:bg-[var(--color-bg-hover)]'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-[var(--color-terminal-border)] terminal-text">
        {onToggleHints ? (
          <button
            onClick={onToggleHints}
            className={`p-1.5 rounded-md transition-colors ${
              showHints
                ? 'text-[var(--color-terminal-success)] bg-[var(--color-green-glow)] hover:bg-[var(--color-green-glow)]'
                : 'text-[var(--color-terminal-placeholder)] hover:text-[var(--color-text-dim)] hover:bg-[var(--color-bg-hover)]'
            }`}
            title={showHints ? t.terminal.hintsOff : t.terminal.hintsOn}
          >
            <Lightbulb size={14} className={showHints ? 'fill-current' : ''} />
          </button>
        ) : null}
        <span className="font-mono text-sm text-[var(--color-terminal-success)]">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); pendingFill.current = false }}
          onKeyDown={handleKeyDown}
          placeholder={
            practiceState?.mode === 'practice'
              ? t.terminal.placeholderPractice
              : practiceState?.mode === 'scenario'
              ? t.terminal.placeholderScenario
              : t.terminal.placeholderNormal
          }
          className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-[var(--color-terminal-input)] placeholder-[var(--color-terminal-placeholder)]"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  )
}

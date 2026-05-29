import { useMemo, useState } from 'react'
import { createRound, validateConfig } from './game/logic'
import type { GameConfig, RoundState, Screen } from './game/types'
import { HomeScreen } from './screens/HomeScreen'
import { PhaseEnd, PhaseReveal, PhaseTimer } from './screens/PlayScreens'

const defaultConfig: GameConfig = {
  playerCount: 15,
  spyCount: 2,
  minutes: 5,
  spyGuide: false,
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [config, setConfig] = useState<GameConfig>(defaultConfig)
  const [round, setRound] = useState<RoundState | null>(null)
  const [revealIndex, setRevealIndex] = useState(0)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [helpOpen, setHelpOpen] = useState(false)

  const patchConfig = (patch: Partial<GameConfig>) => {
    setConfig((c) => ({ ...c, ...patch }))
    setValidationError(null)
  }

  const startGame = () => {
    const err = validateConfig(config)
    if (err) {
      setValidationError(err)
      return
    }
    setRound(createRound(config))
    setRevealIndex(0)
    setValidationError(null)
    setScreen('reveal')
  }

  const secondsTotal = useMemo(() => config.minutes * 60, [config.minutes])

  return (
    <>
      {screen === 'home' ? (
        <HomeScreen
          config={config}
          setConfig={patchConfig}
          onStart={startGame}
          validationError={validationError}
          onOpenHelp={() => setHelpOpen(true)}
        />
      ) : null}

      {screen === 'reveal' && round ? (
        <PhaseReveal
          config={config}
          round={round}
          playerIndex={revealIndex}
          onDonePlayer={() => {
            if (revealIndex >= config.playerCount - 1) {
              setScreen('timer')
            } else {
              setRevealIndex((i) => i + 1)
            }
          }}
        />
      ) : null}

      {screen === 'timer' && round ? (
        <PhaseTimer
          secondsTotal={secondsTotal}
          onFinish={() => setScreen('end')}
        />
      ) : null}

      {screen === 'end' && round ? (
        <PhaseEnd
          round={round}
          onHome={() => {
            setScreen('home')
            setRound(null)
            setRevealIndex(0)
          }}
        />
      ) : null}

      {helpOpen ? (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-title"
        >
          <div className="modal-panel">
            <h2 id="help-title">راهنما</h2>
            <p>
              یک کلمهٔ مخفی انتخاب می‌شود. شهروندها کلمه را می‌بینند؛ جاسوس‌ها نه (یا فقط دستهٔ
              کلمات را اگر «راهنما برای جاسوس» روشن باشد). در زمان بحث، جاسوس‌ها هویت خود را پنهان
              کنند. بعد از اتمام زمان، بازیکنان دربارهٔ جاسوس‌ها رأی می‌دهند (در این نسخهٔ ساده، فقط
              نقش‌ها پس از پایان دور نمایش داده می‌شوند).
            </p>
            <button type="button" className="modal-close" onClick={() => setHelpOpen(false)}>
              بستن
            </button>
          </div>
          <style>{`
            .modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 100;
              background: rgba(0, 0, 0, 0.55);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
            }
            .modal-panel {
              max-width: 320px;
              background: #3d3048;
              border: 1px solid var(--bg-border);
              border-radius: 12px;
              padding: 20px;
              color: var(--text-on-dark);
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
            }
            .modal-panel h2 {
              margin: 0 0 12px;
              font-size: 18px;
            }
            .modal-panel p {
              margin: 0;
              font-size: 14px;
              line-height: 1.7;
            }
            .modal-close {
              margin-top: 16px;
              width: 100%;
              padding: 10px;
              border-radius: 8px;
              border: none;
              background: var(--primary);
              color: var(--text-on-primary);
              font-weight: 500;
            }
          `}</style>
        </div>
      ) : null}
    </>
  )
}

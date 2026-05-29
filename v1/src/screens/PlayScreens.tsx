import { useEffect, useState } from 'react'
import type { GameConfig, RoundState } from '../game/types'

type PhaseRevealProps = {
  config: GameConfig
  round: RoundState
  playerIndex: number
  onDonePlayer: () => void
}

export function PhaseReveal({ config, round, playerIndex, onDonePlayer }: PhaseRevealProps) {
  const [open, setOpen] = useState(false)
  const isSpy = round.spyIndices.includes(playerIndex)

  useEffect(() => {
    setOpen(false)
  }, [playerIndex])

  const title = `بازیکن ${playerIndex + 1}`
  const last = playerIndex >= config.playerCount - 1

  return (
    <div className="play-shell">
      <div className="play-inner">
        <p className="play-title">{title}</p>
        <p className="play-hint">گوشی را بدهید؛ برای دیدن نقش ضربه بزنید.</p>

        <button
          type="button"
          className={`card ${open ? 'card--open' : ''}`}
          onClick={() => setOpen((o) => !o)}
        >
          {!open ? (
            <span className="card-back-label">لمس کنید</span>
          ) : isSpy ? (
            <div className="card-front card-front--spy">
              <p className="role-badge">جاسوس</p>
              {config.spyGuide ? (
                <p className="role-detail">فقط دسته: {round.word.category}</p>
              ) : (
                <p className="role-detail">کلمهٔ مخفی را نمی‌دانید.</p>
              )}
            </div>
          ) : (
            <div className="card-front card-front--citizen">
              <p className="word-label">کلمهٔ مخفی</p>
              <p className="word-value">{round.word.word}</p>
              <p className="role-detail subtle">شهروند</p>
            </div>
          )}
        </button>

        <button type="button" className="secondary-btn" onClick={onDonePlayer}>
          {last ? 'شروع زمان بحث' : 'بازیکن بعدی'}
        </button>
      </div>
      <style>{`
        .play-shell {
          min-height: 100dvh;
          max-width: 360px;
          margin: 0 auto;
          background: var(--bg-main);
          padding: 24px 20px 32px;
        }
        .play-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          min-height: calc(100dvh - 48px);
        }
        .play-title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
        .play-hint {
          margin: 0;
          font-size: 14px;
          opacity: 0.85;
          text-align: center;
        }
        .card {
          width: 100%;
          max-width: 300px;
          min-height: 220px;
          border-radius: 16px;
          border: 2px solid var(--bg-border);
          background: linear-gradient(145deg, #5c4660 0%, #3d2f44 100%);
          color: var(--text-on-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          flex: 1;
          max-height: 360px;
        }
        .card--open {
          border-color: var(--primary);
        }
        .card-back-label {
          font-size: 18px;
          font-weight: 500;
          opacity: 0.9;
        }
        .card-front {
          text-align: center;
          width: 100%;
        }
        .role-badge {
          margin: 0 0 12px;
          font-size: 22px;
          font-weight: 600;
          color: var(--primary);
        }
        .word-label {
          margin: 0 0 8px;
          font-size: 14px;
          opacity: 0.85;
        }
        .word-value {
          margin: 0 0 16px;
          font-size: 28px;
          font-weight: 600;
          line-height: 1.3;
        }
        .role-detail {
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
        }
        .role-detail.subtle {
          opacity: 0.75;
          font-size: 14px;
        }
        .secondary-btn {
          width: 100%;
          max-width: 300px;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid var(--bg-border);
          background: transparent;
          color: var(--text-on-dark);
          font-size: 15px;
        }
        .secondary-btn:active {
          background: rgba(255, 255, 255, 0.06);
        }
      `}</style>
    </div>
  )
}

type PhaseTimerProps = {
  secondsTotal: number
  onFinish: () => void
}

export function PhaseTimer({ secondsTotal, onFinish }: PhaseTimerProps) {
  const [left, setLeft] = useState(secondsTotal)

  useEffect(() => {
    setLeft(secondsTotal)
  }, [secondsTotal])

  useEffect(() => {
    const id = window.setInterval(() => {
      setLeft((s) => (s <= 0 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [secondsTotal])

  const mm = Math.floor(left / 60)
  const ss = left % 60
  const label = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`

  return (
    <div className="play-shell timer-screen">
      <div className="timer-inner">
        <p className="timer-label">زمان بحث</p>
        <p className="timer-digits" aria-live="polite">
          {label}
        </p>
        <p className="timer-sub">جاسوس‌ها کلمه را پیدا نکنند؛ شهروندها راز را نگه دارید.</p>
        <button type="button" className="primary-btn timer-end" onClick={onFinish}>
          پایان دور
        </button>
      </div>
      <style>{`
        .timer-screen {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timer-inner {
          text-align: center;
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }
        .timer-label {
          margin: 0;
          font-size: 18px;
          opacity: 0.9;
        }
        .timer-digits {
          margin: 0;
          font-size: 56px;
          font-weight: 600;
          letter-spacing: 0.08em;
          font-variant-numeric: tabular-nums;
          color: var(--primary);
        }
        .timer-sub {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.85;
        }
        .timer-end {
          margin-top: 24px;
          max-width: 280px;
        }
        .primary-btn {
          padding: 12px 28px;
          border: none;
          border-radius: 8px;
          background: var(--primary);
          color: var(--text-on-primary);
          font-size: 16px;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

type PhaseEndProps = {
  round: RoundState
  onHome: () => void
}

export function PhaseEnd({ round, onHome }: PhaseEndProps) {
  return (
    <div className="play-shell">
      <div className="end-inner">
        <p className="end-heading">پایان دور</p>
        <p className="end-word">
          کلمهٔ مخفی: <strong>{round.word.word}</strong>
        </p>
        <p className="end-sub">جاسوس‌ها: بازیکن‌های شماره</p>
        <ul className="spy-list">
          {round.spyIndices.map((i) => (
            <li key={i}>{i + 1}</li>
          ))}
        </ul>
        <button type="button" className="primary-btn" onClick={onHome}>
          بازگشت به خانه
        </button>
      </div>
      <style>{`
        .end-inner {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: stretch;
          max-width: 320px;
          margin: 0 auto;
        }
        .end-heading {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
          text-align: center;
        }
        .end-word {
          margin: 0;
          font-size: 16px;
          text-align: center;
          line-height: 1.6;
        }
        .end-word strong {
          color: var(--primary);
          font-size: 18px;
        }
        .end-sub {
          margin: 8px 0 0;
          font-size: 14px;
          opacity: 0.85;
        }
        .spy-list {
          margin: 0;
          padding: 0 20px 0 0;
          font-size: 16px;
          line-height: 1.8;
        }
        .primary-btn {
          margin-top: 16px;
          padding: 12px 28px;
          border: none;
          border-radius: 8px;
          background: var(--primary);
          color: var(--text-on-primary);
          font-size: 16px;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

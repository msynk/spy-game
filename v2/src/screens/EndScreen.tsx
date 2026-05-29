import { Screen } from '../components/Screen'
import { HomeIcon } from '../components/Icons'
import { toFa } from '../game/logic'
import type { GameConfig, RoundState } from '../game/types'

interface EndScreenProps {
  config: GameConfig
  round: RoundState
  onPlayAgain: () => void
  onHome: () => void
}

export function EndScreen({ config, round, onPlayAgain, onHome }: EndScreenProps) {
  const players = Array.from({ length: config.playerCount }, (_, i) => i)

  return (
    <Screen
      topActions={
        <button type="button" className="icon-btn" aria-label="خانه" onClick={onHome}>
          <HomeIcon />
        </button>
      }
    >
      <h1 className="title" style={{ textAlign: 'center', marginBottom: 12 }}>
        پایان بازی
      </h1>

      <p className="subtitle" style={{ textAlign: 'center', marginBottom: 16 }}>
        کلمه: <strong style={{ color: 'var(--c-text)' }}>{round.word.word}</strong>
      </p>

      <div className="scroll-area">
        <ul className="role-list" aria-label="نقش بازیکنان">
          {players.map((idx) => {
            const isSpy = round.spyIndices.includes(idx)
            return (
              <li key={idx} className={`role-row ${isSpy ? 'is-spy' : ''}`}>
                <span className="role-row__name">بازیکن {toFa(idx + 1)}</span>
                <span className="role-row__tag">{isSpy ? 'جاسوس' : 'شهروند'}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="footer-actions">
        <button type="button" className="btn" onClick={onPlayAgain}>
          دوباره بزن بریم!
        </button>
      </div>
    </Screen>
  )
}

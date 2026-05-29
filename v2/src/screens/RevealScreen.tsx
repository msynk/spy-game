import { useState } from 'react'
import { Screen } from '../components/Screen'
import { toFa } from '../game/logic'
import type { GameConfig, RoundState } from '../game/types'

interface RevealScreenProps {
  config: GameConfig
  round: RoundState
  /** Zero-based index of the current player. */
  playerIndex: number
  onNext: () => void
}

/**
 * Shows the role to a single player. Three states:
 *  1. Card back — tap the card to flip.
 *  2. Card front — show the role; tap the action to pass to the next player.
 */
export function RevealScreen({ config, round, playerIndex, onNext }: RevealScreenProps) {
  const [revealed, setRevealed] = useState(false)
  const isSpy = round.spyIndices.includes(playerIndex)

  const handlePass = () => {
    setRevealed(false)
    onNext()
  }

  if (!revealed) {
    return (
      <Screen>
        <div className="center-block">
          <button
            type="button"
            className="panel--card panel is-back"
            onClick={() => setRevealed(true)}
            aria-label="نمایش نقش"
          >
            <span className="card-tag">بازیکن {toFa(playerIndex + 1)}</span>
            <span className="card-hint">برای دیدن کلمه روی کارت بزن</span>
          </button>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <div className="center-block">
        <div className={`panel--card panel ${isSpy ? 'is-spy' : ''}`}>
          {isSpy ? (
            <>
              <span className="card-tag">جاسوس</span>
              {config.spyGuide ? (
                <span className="card-word">{round.word.category}</span>
              ) : null}
              <span className="card-hint">
                سعی کن بفهمی شهروندها در مورد چی حرف می‌زنن!
              </span>
            </>
          ) : (
            <>
              <span className="card-tag">شهروند</span>
              <span className="card-word">{round.word.word}</span>
              <span className="card-hint">دوباره بزن و گوشی رو به نفر بعدی بده</span>
            </>
          )}
        </div>
      </div>

      <div className="footer-actions">
        <button type="button" className="btn" onClick={handlePass}>
          {playerIndex + 1 === config.playerCount ? 'شروع بازی' : 'نفر بعدی'}
        </button>
      </div>
    </Screen>
  )
}

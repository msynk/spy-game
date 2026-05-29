import { useState } from 'react'
import { Screen } from '../components/Screen'
import { Card } from '../components/Card'
import { toFa } from '../game/logic'
import type { GameConfig, RoundState } from '../game/types'
import spyCardSrc from '../assets/spy-card.svg'

interface RevealScreenProps {
  config: GameConfig
  round: RoundState
  /** Zero-based index of the current player. */
  playerIndex: number
  onNext: () => void
}

/**
 * One player at a time: tap the deck to flip → see your role → tap again to
 * pass the phone. Layouts mirror the Figma frames `card-back`,
 * `card-front-citisen`, and `card-front-spy`.
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
          <Card variant="back" onClick={() => setRevealed(true)}>
            <img className="card-art card-art--faded" src={spyCardSrc} alt="" aria-hidden />
            <div className="card-text">
              <h2 className="card-title card-title--muted">بازیکن {toFa(playerIndex + 1)}</h2>
              <p className="card-sub card-sub--muted">برای دیدن کلمه روی کارت بزن</p>
            </div>
          </Card>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <div className="center-block">
        <Card variant="front" onClick={handlePass}>
          {isSpy ? (
            <img className="card-art" src={spyCardSrc} alt="" aria-hidden />
          ) : null}
          <div className="card-text">
            <h2 className="card-title">{isSpy ? 'جاسوس' : round.word.word}</h2>
            <p className="card-sub">
              {isSpy && config.spyGuide
                ? `موضوع: ${round.word.category}`
                : 'دوباره بزن و گوشی رو به نفر بعدی بده'}
            </p>
          </div>
          {isSpy ? (
            <p className="card-footnote">
              سعی کن بفهمی شهروندها در مورد چی حرف میزنن!
            </p>
          ) : null}
        </Card>
      </div>
    </Screen>
  )
}

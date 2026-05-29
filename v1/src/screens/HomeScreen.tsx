import { FIGMA_ASSETS } from '../figmaAssets'
import type { GameConfig } from '../game/types'

type Props = {
  config: GameConfig
  setConfig: (patch: Partial<GameConfig>) => void
  onStart: () => void
  validationError: string | null
  onOpenHelp: () => void
}

function playerRange(max = 30) {
  return Array.from({ length: max - 3 }, (_, i) => i + 4)
}

export function HomeScreen({
  config,
  setConfig,
  onStart,
  validationError,
  onOpenHelp,
}: Props) {
  const spyMax = Math.max(1, config.playerCount - 1)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i + 1)

  return (
    <div className="shell">
      <div className="brick-layer" aria-hidden />
      <img className="spotlight" src={FIGMA_ASSETS.spotlight} alt="" />

      <button type="button" className="help-fab" onClick={onOpenHelp} aria-label="راهنما">
        <img src={FIGMA_ASSETS.helpBadge} alt="" className="help-fab__bg" />
        <span className="help-fab__mark">?</span>
      </button>

      <div className="home-content">
        <div className="settings-stack">
          <label className="setting-row">
            <span className="setting-row__meta">
              <span className="setting-row__label">تعداد بازیکن‌ها</span>
              <img src={FIGMA_ASSETS.iconPlayers} alt="" className="setting-row__icon" />
            </span>
            <span className="setting-row__control">
              <select
                value={config.playerCount}
                onChange={(e) => {
                  const n = Number(e.target.value)
                  setConfig({
                    playerCount: n,
                    spyCount: Math.min(config.spyCount, n - 1),
                  })
                }}
                aria-label="تعداد بازیکن‌ها"
              >
                {playerRange().map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <img src={FIGMA_ASSETS.chevron} alt="" className="chevron" />
            </span>
          </label>

          <label className="setting-row">
            <span className="setting-row__meta">
              <span className="setting-row__label">تعداد جاسوس‌ها</span>
              <img src={FIGMA_ASSETS.iconSpy} alt="" className="setting-row__icon" />
            </span>
            <span className="setting-row__control">
              <select
                value={config.spyCount}
                onChange={(e) => setConfig({ spyCount: Number(e.target.value) })}
                aria-label="تعداد جاسوس‌ها"
              >
                {Array.from({ length: spyMax }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <img src={FIGMA_ASSETS.chevron} alt="" className="chevron" />
            </span>
          </label>

          <label className="setting-row">
            <span className="setting-row__meta">
              <span className="setting-row__label">زمان بازی (دقیقه)</span>
              <img src={FIGMA_ASSETS.iconClock} alt="" className="setting-row__icon" />
            </span>
            <span className="setting-row__control">
              <select
                value={config.minutes}
                onChange={(e) => setConfig({ minutes: Number(e.target.value) })}
                aria-label="زمان بازی به دقیقه"
              >
                {minuteOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <img src={FIGMA_ASSETS.chevron} alt="" className="chevron" />
            </span>
          </label>
        </div>

        <label className="spy-guide">
          <input
            type="checkbox"
            checked={config.spyGuide}
            onChange={(e) => setConfig({ spyGuide: e.target.checked })}
            className="spy-guide__input"
          />
          <img src={FIGMA_ASSETS.checkbox} alt="" className="spy-guide__tick" />
          <span className="spy-guide__text">راهنما برای جاسوس</span>
        </label>

        <div className="illustration-wrap">
          <img
            src={FIGMA_ASSETS.spyIllustration}
            alt=""
            className="spy-art"
          />
        </div>

        {validationError ? <p className="form-error">{validationError}</p> : null}

        <button type="button" className="primary-btn" onClick={onStart}>
          بزن بریم!
        </button>
      </div>

      <style>{`
        .shell {
          position: relative;
          max-width: 360px;
          min-height: 100dvh;
          margin: 0 auto;
          background: var(--bg-main);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .brick-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-color: var(--bg-main);
          background-image:
            linear-gradient(335deg, rgba(255, 255, 255, 0.07) 0%, transparent 42%, transparent 58%, rgba(0, 0, 0, 0.18) 100%),
            repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.12) 0 2px,
              transparent 2px 74px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.04) 0 14px,
              transparent 14px 28px
            );
        }
        .spotlight {
          position: absolute;
          left: 46px;
          top: 0;
          width: 302px;
          height: 685px;
          max-height: 74vh;
          object-fit: cover;
          pointer-events: none;
          opacity: 0.95;
        }
        .help-fab {
          position: absolute;
          top: 21px;
          right: 16px;
          width: 24px;
          height: 24px;
          padding: 0;
          border: none;
          background: transparent;
          z-index: 2;
        }
        .help-fab__bg {
          display: block;
          width: 24px;
          height: 24px;
        }
        .help-fab__mark {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
          color: var(--text-on-primary);
          pointer-events: none;
        }
        .home-content {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 96px 24px 28px;
          gap: 16px;
        }
        .settings-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 312px;
          margin: 0 auto;
        }
        .setting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 12px;
          border: 1px solid var(--bg-border);
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
        }
        .setting-row__meta {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .setting-row__label {
          font-size: 14px;
          line-height: 20px;
          color: var(--text-on-dark);
          white-space: nowrap;
        }
        .setting-row__icon {
          width: 26px;
          height: 20px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .setting-row__control {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .setting-row__control select {
          appearance: none;
          background: transparent;
          border: none;
          color: var(--text-on-dark);
          font-size: 14px;
          padding: 6px 4px;
          direction: ltr;
          text-align: left;
        }
        .setting-row__control select:focus {
          outline: 1px solid var(--primary);
          outline-offset: 2px;
          border-radius: 4px;
        }
        .chevron {
          width: 10px;
          height: 6px;
          opacity: 0.9;
        }
        .spy-guide {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          margin-top: 8px;
          cursor: pointer;
          user-select: none;
        }
        .spy-guide__input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        .spy-guide__tick {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          opacity: 0.45;
        }
        .spy-guide__input:checked + .spy-guide__tick {
          opacity: 1;
        }
        .spy-guide__text {
          font-size: 14px;
          color: var(--text-on-dark);
        }
        .illustration-wrap {
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          min-height: 160px;
          pointer-events: none;
        }
        .spy-art {
          width: min(285px, 88vw);
          height: auto;
          object-fit: contain;
          margin-bottom: -8px;
        }
        .form-error {
          margin: 0;
          font-size: 13px;
          color: #ffb4b4;
          text-align: center;
        }
        .primary-btn {
          margin-top: auto;
          width: 100%;
          max-width: 328px;
          align-self: center;
          padding: 10px 30px;
          border: none;
          border-radius: 8px;
          background: var(--primary);
          color: var(--text-on-primary);
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
        }
        .primary-btn:active {
          filter: brightness(0.95);
        }
      `}</style>
    </div>
  )
}

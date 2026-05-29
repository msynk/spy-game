import type { GameConfig, RoundState, SecretWord } from './types'

const VOCAB: SecretWord[] = [
  { word: 'پیتزا', category: 'غذا' },
  { word: 'استخر', category: 'مکان' },
  { word: 'بیمارستان', category: 'مکان' },
  { word: 'مدرسه', category: 'مکان' },
  { word: 'گیتار', category: 'اشیا' },
  { word: 'فوتبال', category: 'ورزش' },
  { word: 'کوهنوردی', category: 'ورزش' },
  { word: 'سینما', category: 'تفریح' },
]

function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function pickWord(): SecretWord {
  return VOCAB[Math.floor(Math.random() * VOCAB.length)]!
}

export function createRound(config: Pick<GameConfig, 'playerCount' | 'spyCount'>): RoundState {
  const positions = shuffle(Array.from({ length: config.playerCount }, (_, i) => i))
  const spyIndices = positions.slice(0, config.spyCount).sort((a, b) => a - b)
  return {
    word: pickWord(),
    spyIndices,
  }
}

export function validateConfig(c: GameConfig): string | null {
  if (c.playerCount < 4) return 'حداقل ۴ بازیکن لازم است.'
  if (c.playerCount > 30) return 'حداکثر ۳۰ بازیکن.'
  if (c.spyCount < 1) return 'حداقل یک جاسوس.'
  if (c.spyCount >= c.playerCount) return 'تعداد جاسوس‌ها باید کمتر از بازیکنان باشد.'
  if (c.minutes < 1 || c.minutes > 60) return 'زمان بین ۱ تا ۶۰ دقیقه.'
  return null
}

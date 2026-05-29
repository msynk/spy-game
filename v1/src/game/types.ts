export type Screen =
  | 'home'
  | 'reveal'
  | 'timer'
  | 'end'

export interface GameConfig {
  playerCount: number
  spyCount: number
  minutes: number
  spyGuide: boolean
}

export interface SecretWord {
  word: string
  category: string
}

export interface RoundState {
  word: SecretWord
  spyIndices: number[]
}

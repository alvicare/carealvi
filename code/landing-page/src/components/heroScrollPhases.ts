/** Shared progress boundaries for the pinned robot and watch choreography. */
export const HERO_SCROLL_PHASES = {
  /** The robot and watch finish moving into their settled positions here. */
  positioningEnd: 0.38,
  /** The watch holds its final exploded frame for the end of the pinned section. */
  watchSequenceEnd: 0.92,
} as const;

export const WATCH_AUTOPLAY_DURATION_MS = 5200;

export interface TimedPlaybackState {
  startedAt: number | null;
  durationMs: number;
  completed: boolean;
  blockedUntilReset: boolean;
}

export const TOGGLE_HIGH_SCORE = 'TOGGLE_HIGH_SCORE';
export const TOGGLE_STATISTICS = 'TOGGLE_STATISTICS';
export const TOGGLE_ABOUT = 'TOGGLE_ABOUT';


export function toggleHighScore(show) {
  return {
    type: TOGGLE_HIGH_SCORE,
    show
  };
}

export function toggleStatistics(show) {
  return {
    type: TOGGLE_STATISTICS,
    show
  };
}

export function toggleAbout(show) {
  return {
    type: TOGGLE_ABOUT,
    show
  };
}

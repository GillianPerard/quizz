const MAX_SCORE = 10;

export const formatScore = (score: number) => {
  const formattedBestScore = score === MAX_SCORE ? score.toString() : `0${score}`;

  return `${formattedBestScore}/${MAX_SCORE}`;
};

export interface SongDifficultyColors {
  shadow: string;
  border: string;
  badge: string;
}

export const getColorByDifficulty = (
  difficulty: string,
): SongDifficultyColors => {
  if (difficulty === 'EXPERT')
    return {
      shadow: '#52b788',
      border: '#95d5b2',
      badge: 'green',
    };

  if (difficulty === 'CHALLENGE')
    return {
      shadow: '#9d4edd',
      border: '#c77dff',
      badge: 'purple',
    };

  return {
    shadow: 'gray',
    badge: 'gray',
    border: 'gray',
  };
};

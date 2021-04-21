import { Dancer } from '../context/dancer';

export type BaseScore = {
  id: string;
  value: number;
  submissionTime: string;
  imageUrl: string;
  dancerId: string | null;
  songId: string;
};

export type Score = {
  id: string;
  value: number;
  submissionTime: string;
  imageUrl: string;
  dancerId: string | null;
  dancer: Dancer | null;
  songDifficultyId: string;
  songDifficulty: SongDifficulty | null;
};

export type SongDifficulty = {
  id: string;
  difficulty: string;
  maxScore: number;
  level: number;
  songId: string;
  song: Song | null;
};

export type Song = {
  id: string;
  name: string;
  artist: string;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
  image512: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  event: Event | null;
  image32: string;
  image64: string;
  image128: string;
  image256: string;
};

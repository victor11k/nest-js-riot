import { RawMatchInfo } from '../../riotGames/interfaces/raw.match.info.interface';

export interface RecentMatchesResponse {
  matches: RawMatchInfo[];
  page: number;
  size: number;
}

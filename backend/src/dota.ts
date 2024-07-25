import { endOfMonth, startOfMonth, format } from "date-fns";
import { stringify } from "querystring";

const baseUrl = "https://api.opendota.com/api";
export const leoId = "36020384"; // mnk-flash

export type Match = {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  start_time: number;
  duration: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  version?: any;
  kills: number;
  deaths: number;
  assists: number;
  average_rank: number;
  leaver_status: number;
  party_size: number;
  hero_variant: number;
};

export const getPlayerMatchesInAMonth = async (
  accountId: string,
  year: number,
  month: number
) => {
  const allMatches = await getPlayerRawMatches(accountId);
  const date = new Date(year, month - 1, 1);
  const start = startOfMonth(date).getTime() / 1000;
  const end = endOfMonth(date).getTime() / 1000;
  console.log("Getting matches from", start, "to", end, "for", accountId);
  const matches = allMatches.filter(
    ({ start_time }) => start_time >= start && start_time <= end
  );
  return matches;
};

export const getPlayerRawMatches = async (accountId: string) => {
  const cacheKey = getCacheKey(accountId);
  if (inMemoryCache.has(cacheKey)) {
    console.log("Using cache for", accountId);
    const { matches, lastUpdate } = inMemoryCache.get(cacheKey)!;
    if (new Date().getTime() - lastUpdate.getTime() < getCacheTTL())
      return matches;
  }

  const params = { sort: "start_time" };
  const url = `${baseUrl}/players/${accountId}/matches?${stringify(params)}`;
  console.log("Getting matches from", url);
  const response = await fetch(url);
  const data = await response.json();
  inMemoryCache.set(cacheKey, { matches: data, lastUpdate: new Date() });
  return data as Match[];
};

const getCacheKey = (accountId: string) => `matches-${accountId}`;
const getCacheTTL = () => 1000 * 60 * 30; // 30 minutes
const inMemoryCache = new Map<string, { matches: Match[]; lastUpdate: Date }>();

export const getMatchesPerDay = (matches: Match[]) => {
  const matchesPerDay: { [key: string]: { games: number; seconds: number } } =
    {};
  matches.forEach((match) => {
    const date = new Date(match.start_time * 1000);
    const key = format(date, "yyyy-MM-dd");
    if (!matchesPerDay[key]) matchesPerDay[key] = { games: 0, seconds: 0 };
    matchesPerDay[key] = {
      games: matchesPerDay[key].games + 1,
      seconds: matchesPerDay[key].seconds + match.duration,
    };
  });
  return { matchesPerDay, totalMatches: matches.length };
};

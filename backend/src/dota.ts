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

export const getPlayerMatches = async (
  accountId: string,
  limit: number = 20,
  offset: number = 0
) => {
  const params = {
    limit,
    offset,
    sort: "start_time",
    date: 5, // previous days
  };
  const url = `${baseUrl}/players/${accountId}/matches?${stringify(params)}`;
  console.log("Getting matches from", url);
  const response = await fetch(url);
  const data = await response.json();
  return data as Match[];
};

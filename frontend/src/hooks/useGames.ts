import { useQuery } from "@tanstack/react-query"

const url = "https://t4sw1uzfje.execute-api.sa-east-1.amazonaws.com/"

type GamesResponse = {
  matchesPerDay: {
    [date: string]: {
      games: number
      seconds: number
    }
  }
  totalMatches: number
  year: number
  month: number
}

const getGames = async (year?: number, month?: number, playerId?: string) => {
  const params = { playerId, year, month }
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")

  const finalUrl = `${url}?${queryString}`
  const response = await fetch(finalUrl)
  const data: GamesResponse = await response.json()
  return data
}

export const useGames = (year?: number, month?: number, playerId?: string) => {
  const { data: games, isLoading: isLoadingGames } = useQuery({
    queryKey: ["games", playerId, year, month],
    queryFn: () => getGames(year, month, playerId),
  })
  return { games, isLoadingGames }
}

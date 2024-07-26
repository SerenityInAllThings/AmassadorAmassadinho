import { getDaysInMonth, format } from "date-fns"
import { useDate } from "./DateContext"
import { useGames } from "../hooks/useGames"
import { useMemo } from "react"

const pushUpsPerGame = 20

export type CalendarType = "Predator" | "Prey"

export type Props = {
  type: CalendarType
}

export const Calendar = ({ type }: Props) => {
  const { year, month } = useDate()
  const date = new Date(year, month - 1, 2)
  const daysInMonth = getDaysInMonth(date)
  const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const { games } = useGames(year, month)
  const totalGames = games?.totalMatches ?? 0
  const totalTime = games?.matchesPerDay
    ? Object.entries(games.matchesPerDay).reduce(
        (acc, [_, value]) => acc + value.seconds,
        0,
      )
    : 0
  const totalHours = Math.floor(totalTime / 3600)
  const totalMinutes = Math.floor((totalTime % 3600) / 60)

  return (
    <div className="mt-2 flex w-full flex-col">
      <div className="flex flex-wrap gap-1">
        {allDays.map((day, i) => (
          <DayCard key={i} day={day} type={type} />
        ))}
      </div>
      <div className="mt-1 flex flex-col gap-y-1 text-lg font-bold text-white">
        {type === "Prey" ? (
          <>
            <p>Total de jogos: {totalGames}</p>
            <p>
              Tempo total: {totalHours} horas {totalMinutes} minutos
            </p>
          </>
        ) : (
          <>
            <p>Total de flexões: {totalGames * pushUpsPerGame}</p>
          </>
        )}
      </div>
    </div>
  )
}

type DayCardProps = {
  day: number
  type: CalendarType
}

export const DayCard = ({ day, type }: DayCardProps) => {
  const { year, month } = useDate()
  const { games } = useGames(year, month)
  const date = new Date(year, month - 1, day)
  const formattedDate = format(date, "yyyy-MM-dd")
  const gamesInDay = useMemo(
    () =>
      games?.matchesPerDay?.[formattedDate] ?? {
        games: 0,
        seconds: 0,
      },
    [games, formattedDate],
  )
  const { hours, minutes } = useMemo(() => {
    const { seconds } = gamesInDay
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return { hours, minutes }
  }, [gamesInDay])

  return (
    <div className="h-28 w-28 rounded-md bg-brandDarkBlue pl-1 font-bold">
      <p>{day}</p>
      <p className="pl-2 text-white">
        {type === "Prey" ? (
          <>
            {gamesInDay.games} Jogos <br /> {hours} Horas <br /> {minutes}{" "}
            Minutos
          </>
        ) : (
          <>{gamesInDay.games * pushUpsPerGame} Flexões</>
        )}
      </p>
    </div>
  )
}

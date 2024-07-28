import { useDate } from "./DateContext"
import { useGames } from "../hooks/useGames"
import { useMemo } from "react"

export const pushUpsPerGame = 20

export type CalendarType = "Predator" | "Prey"

export type Props = {
  type: CalendarType
}

/** Uses 1-12 month */
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate()

export const Calendar = ({ type }: Props) => {
  const { year, month } = useDate()
  const daysInMonth = getDaysInMonth(year, month)
  const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="mt-2 flex w-full flex-col">
      <div className="flex flex-wrap gap-1">
        {allDays.map((day, i) => (
          <DayCard key={i} day={day} type={type} />
        ))}
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
  const formattedDate = date.toISOString().split("T")[0]
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

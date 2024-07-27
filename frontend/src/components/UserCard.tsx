import helloKitty from "../assets/helloKitty.png"
import akuma from "../assets/akuma.png"
import { useGames } from "../hooks/useGames"
import { useDate } from "./DateContext"
import { pushUpsPerGame } from "./Calendar"

type User = "Amassadinho" | "Amassador"

const icons: { [key in User]: string } = {
  Amassadinho: helloKitty,
  Amassador: akuma,
}

type Props = {
  user: User
}

const isPredator = (user: User) => user === "Amassador"

export const UserCard = ({ user }: Props) => {
  const icon = icons[user]
  const { year, month } = useDate()
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
    <div className="flex justify-start gap-x-4">
      <div className="flex h-20 w-max min-w-max items-center rounded-md bg-brandDarkBlue p-2 font-bold text-white">
        <img src={icon} className="h-16 w-16 rounded-3xl" />
        <p className="ml-2 h-min text-lg">{user}</p>
      </div>
      <div className="mb-1 mt-1 flex flex-col justify-center gap-y-1 text-lg font-bold text-white">
        {isPredator(user) ? (
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

import helloKitty from "../assets/helloKitty.png"
import akuma from "../assets/akuma.jpg"
import { useGames } from "../hooks/useGames"
import { useDate } from "./DateContext"
import { pushUpsPerGame } from "./Calendar"
import { useMemo } from "preact/hooks"

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
  const predator = isPredator(user)
  const justify = predator ? "justify-end" : "justify-start"

  return (
    <div className={`flex flex-row gap-x-4 ${justify}`}>
      {predator ? (
        <>
          <Totalizer user={user} />
          <Image user={user} />
        </>
      ) : (
        <>
          <Image user={user} />
          <Totalizer user={user} />
        </>
      )}
    </div>
  )
}

const Image = ({ user }: Props) => {
  const icon = icons[user]
  return (
    <div className="flex h-20 w-max min-w-max items-center rounded-md bg-brandDarkBlue p-2 font-bold text-white">
      <img src={icon} className="h-16 w-16 rounded-3xl" />
      <p className="ml-2 h-min text-lg">{user}</p>
    </div>
  )
}

export const Totalizer = ({ user }: Props) => {
  const { year, month } = useDate()
  const { games } = useGames(year, month)
  const totalGames = games?.totalMatches ?? 0
  const { totalHours, totalMinutes } = useMemo(() => {
    const totalTime = games?.matchesPerDay
      ? Object.entries(games.matchesPerDay).reduce(
          (acc, [_, value]) => acc + value.seconds,
          0,
        )
      : 0
    const totalHours = Math.floor(totalTime / 3600)
    const totalMinutes = Math.floor((totalTime % 3600) / 60)
    return { totalTime, totalHours, totalMinutes }
  }, [games])

  return (
    <div className="mb-1 mt-1 flex flex-col justify-center gap-y-1 text-lg font-bold text-white">
      {isPredator(user) ? (
        <>
          <p>Total de flexões: {totalGames * pushUpsPerGame}</p>
        </>
      ) : (
        <>
          <p>Total de jogos: {totalGames}</p>
          <p>
            Tempo total: {totalHours} horas {totalMinutes} minutos
          </p>
        </>
      )}
    </div>
  )
}

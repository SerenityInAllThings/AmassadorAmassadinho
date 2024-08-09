import { useCurrentUserGames } from "../hooks/useGames"
import { useDate } from "./DateContext"
import { pushUpsPerGame } from "./Calendar"
import { useCallback, useMemo, useState } from "preact/hooks"
import {
  dotaPlayers,
  DotaPlayers,
  icons,
  isPredator,
  User,
} from "../domain/user"
import { useUser } from "./UserContext"

type Props = { user?: User }

export const UserCard = ({ user }: Props) => {
  const { user: selectedUser } = useUser()
  const currentUser = user || selectedUser
  const predator = isPredator(currentUser)
  const justify = predator ? "justify-end" : "justify-start"

  return (
    <div className={`flex flex-row gap-x-4 ${justify}`}>
      {predator ? (
        <>
          <Totalizer user={currentUser} />
          <UserBox user={currentUser} />
        </>
      ) : (
        <>
          <UserBox user={currentUser} />
          <Totalizer user={currentUser} />
        </>
      )}
    </div>
  )
}

const UserBox = ({ user }: { user: User }) => {
  const [isSelectorOpen, setSelectorOpen] = useState(false)
  const { setUser } = useUser()
  const icon = icons[user]
  const predator = isPredator(user)
  const cursor = predator ? "cursor-default" : "cursor-pointer"
  const onHover = predator ? "" : "hover:border-brandDarkBlue2"
  const onSelect = useCallback(
    (user: DotaPlayers) => {
      setUser(user)
      setSelectorOpen(false)
    },
    [setSelectorOpen, setUser],
  )

  return (
    <div className="relative transition-all">
      <div
        className={`flex h-20 w-max max-w-72 items-center rounded-md border-8 border-brandDarkBlue bg-brandDarkBlue p-2 font-bold text-white ${cursor} ${onHover}`}
        onClick={() => setSelectorOpen(!isSelectorOpen)}
      >
        <img src={icon} className="h-16 w-16 rounded-3xl" />
        <p className="ml-2 h-min text-lg">{user}</p>
      </div>
      {!predator && isSelectorOpen ? (
        <UserSelector onUserSelect={onSelect} />
      ) : null}
    </div>
  )
}

const UserSelector = ({
  onUserSelect,
}: {
  onUserSelect: (user: DotaPlayers) => void
}) => {
  return (
    <div className="absolute bottom-0 left-0 -mb-48 flex h-48 flex-col gap-y-2 overflow-y-auto rounded-md border border-brandDarkBlue2 bg-brandDarkBlue p-2">
      {dotaPlayers.map((player, index) => (
        <UserOption
          user={player}
          key={index}
          onUserSelect={onUserSelect}
        ></UserOption>
      ))}
    </div>
  )
}

const UserOption = ({
  user,
  onUserSelect,
}: {
  user: DotaPlayers
  onUserSelect: (user: DotaPlayers) => void
}) => {
  const icon = icons[user]
  return (
    <button
      className="flex flex-row gap-x-1 text-sm font-bold text-white"
      onClick={() => onUserSelect(user)}
    >
      <img src={icon} className="h-6 w-6 rounded-full border"></img>
      <div className="flex items-center justify-center align-middle">
        <p>{user}</p>
      </div>
    </button>
  )
}

const Totalizer = ({ user }: { user: User }) => {
  const { year, month } = useDate()
  const { games } = useCurrentUserGames(year, month)
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
    <div className="mb-1 mt-1 flex flex-col justify-center gap-y-1 text-xs font-bold text-white sm:text-sm md:text-base lg:text-lg">
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

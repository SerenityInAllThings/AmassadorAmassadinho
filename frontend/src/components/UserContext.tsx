import { ComponentChildren, createContext } from "preact"
import { DotaPlayers, isDotaPlayer } from "../domain/user"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useContext } from "preact/hooks"

type ContextValue = {
  user: DotaPlayers
  setUser: (newUser: DotaPlayers) => void
}

type Props = {
  children: string | ComponentChildren
}

export const UserContext = createContext<ContextValue | undefined>(undefined)

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage("user", "Amassadinho")
  if (!isDotaPlayer(user)) {
    setUser("Amassadinho")
    return <>Usuário desconhecido: {user}</>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    const error = "useUser must be used within a UserProvider"
    console.error(error)
    throw new Error(error)
  }
  return context
}

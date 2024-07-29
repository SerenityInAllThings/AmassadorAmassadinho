import { createContext, useContext } from "react"
import { ComponentChildren } from "preact"
import { useNumericLocalStorage } from "../hooks/useLocalStorage"

type ContextValue = {
  year: number
  /** Month is 1-12 */
  month: number
  setYear: (year: number) => void
  /** Month is 1-12 */
  setMonth: (month: number) => void
}

type Props = {
  children: string | ComponentChildren
}

export const DateContext = createContext<ContextValue | undefined>(undefined)

export const DateProvider = ({ children }: Props) => {
  const [year, setYear] = useNumericLocalStorage(
    "year",
    new Date().getFullYear(),
  )
  const [month, setMonth] = useNumericLocalStorage(
    "month",
    new Date().getMonth() + 1,
  )

  const contextValue = {
    year,
    month,
    setYear,
    setMonth,
  }

  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  )
}

export const useDate = () => {
  const context = useContext(DateContext)
  if (!context) {
    const error = "useDate must be used within a DateProvider"
    console.error(error)
    throw new Error(error)
  }
  return context
}

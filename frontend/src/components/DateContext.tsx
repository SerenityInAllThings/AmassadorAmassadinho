import { createContext, useContext, useState } from "react"
import { ComponentChildren } from "preact"

type ContextValue = {
  year: number
  month: number
  setYear: (year: number) => void
  setMonth: (month: number) => void
}

type Props = {
  children: string | ComponentChildren
}

export const DateContext = createContext<ContextValue | undefined>(undefined)

export const DateProvider = ({ children }: Props) => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

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

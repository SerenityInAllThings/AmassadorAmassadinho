import { useMemo, useState } from "react"
import { useDate } from "./DateContext"
import background from "../assets/scratched.png"

export type Month = { name: string; number: number }
const months: Month[] = [
  { name: "Janeiro", number: 1 },
  { name: "Fevereiro", number: 2 },
  { name: "Março", number: 3 },
  { name: "Abril", number: 4 },
  { name: "Maio", number: 5 },
  { name: "Junho", number: 6 },
  { name: "Julho", number: 7 },
  { name: "Agosto", number: 8 },
  { name: "Setembro", number: 9 },
  { name: "Outubro", number: 10 },
  { name: "Novembro", number: 11 },
  { name: "Dezembro", number: 12 },
]

export const Header = () => {
  const { year } = useDate()

  return (
    <header
      className="flex h-20 w-screen items-center justify-between gap-x-1 overflow-x-auto bg-brandDarkBlue p-1 font-bold text-white"
      style={{ minHeight: "5rem" }}
    >
      <div className="flex flex-row justify-around gap-x-1">
        {months.map((month, i) => (
          <MonthButton month={month} key={i} />
        ))}
      </div>
      <YearButton year={year} />
    </header>
  )
}

export const MonthButton = ({ month: { name, number } }: { month: Month }) => {
  const { setMonth, year, month } = useDate()
  const isCurrentYear = year === new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const isDisabled = isCurrentYear && number > currentMonth
  const style = useMemo(() => {
    if (!isDisabled) return {}
    const x = Math.random() * 100
    const y = Math.random() * 100
    return {
      backgroundImage: `url(${background})`,
      backgroundPosition: `${x}% ${y}%`,
    }
  }, [isDisabled])
  const isSelected = number === month
  const backgroundColor = isSelected ? "bg-brandGreen" : "bg-brandDarkBlue2"

  return (
    <div className="flex items-center align-middle">
      <button
        className={`${backgroundColor} w-24 rounded-sm pb-4 pt-4 text-center 2xl:w-36 2xl:text-xl`}
        onMouseDown={() => setMonth(number)}
        style={style}
        disabled={isDisabled}
      >
        {name}
      </button>
    </div>
  )
}

export const YearButton = ({ year }: { year: number }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  return (
    <div className="flex items-center align-middle">
      <button
        className="bg-brandDarkBlue2 mr-1 rounded-md p-1 pl-3 pr-3 text-xl"
        onClick={() => setIsSelectorOpen(!isSelectorOpen)}
      >
        {year}
      </button>
      {isSelectorOpen && (
        <YearSelector onSelect={() => setIsSelectorOpen(false)} />
      )}
    </div>
  )
}

export const YearSelector = ({
  onSelect,
}: {
  onSelect: (year: number) => void
}) => {
  const { setYear } = useDate()
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const minYear = 2013
    return Array.from(
      { length: currentYear - minYear + 1 },
      (_, i) => i + minYear,
    ).reverse()
  }, [])

  return (
    <div className="border-brandDarkBlue2 fixed right-1 top-14 z-10 flex h-72 flex-col items-center gap-y-1 overflow-y-auto rounded-md border bg-brandDarkBlue p-1 align-middle">
      {years.map((year, i) => (
        <button
          className="bg-brandDarkBlue2 ml-1 mr-1 rounded-md p-1 pl-3 pr-3 text-lg"
          onMouseDown={() => {
            setYear(year)
            onSelect?.(year)
          }}
          key={i}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

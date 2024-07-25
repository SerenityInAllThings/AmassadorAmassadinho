import { DateProvider, Header, UserCard } from "./components"
import vs from "./assets/vs.png"
import "./app.css"

export const App = () => {
  return (
    <DateProvider>
      <div className="flex h-screen w-screen flex-col">
        <img
          src={vs}
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-2/3 justify-center"
        />
        <Header />
        <div className="flex h-full w-screen flex-row">
          <div className="flex h-full w-1/2 flex-col justify-start bg-brandGreen p-8 pl-24 pr-24">
            <UserCard user="Amassadinho" />
            <div className="mt-2 h-full w-full bg-black"></div>
          </div>
          <div className="flex h-full w-1/2 flex-col justify-start bg-brandRed p-8 pl-24 pr-24">
            <UserCard user="Amassador" />
            <div className="mt-2 h-full w-full bg-black"></div>
          </div>
        </div>
      </div>
    </DateProvider>
  )
}

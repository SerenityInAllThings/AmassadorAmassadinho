import { Calendar, DateProvider, Header, UserCard } from "./components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import vs from "./assets/vs.svg"
import "./app.css"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { isUser } from "./domain/user"
import { UserProvider } from "./components/UserContext"

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DateProvider>
        <UserProvider>
          <div className="flex h-screen w-screen flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <div className="flex h-full w-full flex-row">
              <div
                className="flex w-1/2 flex-col justify-start overflow-y-auto bg-brandGreen pb-2 pl-2 pr-3 pt-8 lg:pl-12 lg:pr-14 xl:pl-16 xl:pr-20"
                style={{ maxHeight: "calc(100vh - 5rem)" }}
              >
                <UserCard />
                <div className="mt-2">
                  <Calendar type="Prey" />
                </div>
              </div>
              <div
                className="flex h-full w-1/2 flex-col justify-start overflow-y-auto bg-brandRed pb-2 pl-3 pr-2 pt-8 lg:pl-14 lg:pr-12 xl:pl-20 xl:pr-16"
                style={{ maxHeight: "calc(100vh - 5rem)" }}
              >
                <UserCard user="Amassador" />
                <div className="mt-2">
                  <Calendar type="Predator" />
                </div>
              </div>
            </div>
            <img
              src={vs}
              className="pointer-events-none absolute left-1/2 top-1/2 h-80 -translate-x-1/2 -translate-y-2/3"
            />
          </div>
        </UserProvider>
      </DateProvider>
    </QueryClientProvider>
  )
}

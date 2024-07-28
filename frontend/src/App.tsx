import { Calendar, DateProvider, Header, UserCard } from "./components"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import vs from "./assets/vs.svg"
import "./app.css"

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DateProvider>
        <div className="flex h-screen w-screen flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <div className="flex h-full w-full flex-row">
            <div
              className="flex w-1/2 flex-col justify-start overflow-y-auto bg-brandGreen pb-2 pt-8"
              style={{ maxHeight: "calc(100vh - 5rem)" }}
            >
              <UserCard user="Amassadinho" />
              <div className="mt-2">
                <Calendar type="Prey" />
              </div>
            </div>
            <div
              className="flex h-full w-1/2 flex-col justify-start overflow-y-auto bg-brandRed pb-2 pt-8"
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
            className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-2/3"
          />
        </div>
      </DateProvider>
    </QueryClientProvider>
  )
}

import { DateProvider, Header } from "./components";
import "./app.css";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <DateProvider>
        <Header />
      </DateProvider>
    </div>
  );
}

export default App;

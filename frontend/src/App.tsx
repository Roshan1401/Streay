import "./App.css";
import { useState } from "react";
import Leftbar from "./components/layout/Leftbar";
import Rightbar from "./components/layout/Rightbar";
import Profile from "./pages/Profile";

function App() {
  const [theme, setTheme] = useState(false);

  function toggleTheme() {
    setTheme(!theme);
  }
  return (
    <div
      className={`min-h-screen w-full bg-(--color-bg-primary) ${theme ? "dark" : ""}`}
    >
      <div className="flex min-h-screen w-full">
        <div className="sticky top-0 h-screen shrink-0 overflow-hidden">
          <Leftbar onThemeToggle={toggleTheme} isDarkTheme={theme} />
        </div>

        <div className="min-w-0 flex-1">
          {/* <Leaderboard /> */}
          <Profile />
        </div>

        <div className="sticky top-0 h-screen shrink-0 overflow-hidden">
          <Rightbar />
        </div>
      </div>
    </div>
  );
}

export default App;

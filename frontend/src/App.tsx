import "./App.css";
import { useEffect, useState } from "react";
import Leftbar from "./components/layout/Leftbar";
import Rightbar from "./components/layout/Rightbar";
import Profile from "./pages/Profile";
import Login from "./components/layout/Login";
import Leaderboard from "./pages/Leaderboard";
import { Outlet } from "react-router-dom";
import useUserStore from "./store/useUserStore";
import { supabase } from "./components/supabase";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;

        if (!user) return;
        setUser(user);
        setLoading(false);
        console.log("Auth state changed:", _event, user);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  function toggleTheme() {
    setTheme(!theme);
  }

  useEffect(() => {
    localStorage.setItem("theme", theme ? "dark" : "light");
  }, [theme]);
  return (
    <div
      className={`min-h-screen w-full bg-(--color-bg-primary) ${theme ? "dark" : ""}`}
    >
      <div className="flex min-h-screen w-full">
        <div className="sticky top-0 z-10 h-screen shrink-0 overflow-hidden">
          <Leftbar onThemeToggle={toggleTheme} isDarkTheme={theme} />
        </div>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>

        <div className="sticky top-0 hidden h-screen shrink-0 overflow-y-auto lg:block [&::-webkit-scrollbar]:w-2">
          <Rightbar />
        </div>
      </div>
      <div>{/* <Login /> */}</div>
    </div>
  );
}

export default App;

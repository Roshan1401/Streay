import "./App.css";
import { useEffect, useState } from "react";
import Leftbar from "./components/layout/Leftbar";
import Rightbar from "./components/layout/Rightbar/Rightbar";
import { Outlet } from "react-router-dom";
import useUserStore from "./store/useUserStore";
import { supabase } from "./components/supabase";

function App() {
  const [theme, setTheme] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const setUser = useUserStore((state) => state.setUser);
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    let isMounted = true;

    const handleSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!isMounted) return;

        const user = session?.user ?? null;
        setUser(user);

        if (user) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
      }
    };

    handleSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;

        setUser(user);
      },
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  function toggleTheme() {
    setTheme((prev) => !prev);
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
    </div>
  );
}

export default App;

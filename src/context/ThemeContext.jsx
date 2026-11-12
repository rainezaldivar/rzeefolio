import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();
const OVERRIDE_KEY = "themeOverride";

// Local device time: day is 06:00-17:59, night is 18:00-05:59.
const isNight = (date) => date.getHours() < 6 || date.getHours() >= 18;

const nextThemeChange = (now) => {
  const next = new Date(now);
  if (now.getHours() < 6) next.setHours(6, 0, 0, 0);
  else if (now.getHours() < 18) next.setHours(18, 0, 0, 0);
  else {
    next.setDate(next.getDate() + 1);
    next.setHours(6, 0, 0, 0);
  }
  return next;
};

const readOverride = (now = Date.now()) => {
  try {
    const stored = JSON.parse(localStorage.getItem(OVERRIDE_KEY));
    if (typeof stored?.isDark === "boolean" && stored.until > now) return stored;
    localStorage.removeItem(OVERRIDE_KEY);
  } catch {
    // Storage can be unavailable; the clock remains the source of truth.
  }
  return null;
};

export function ThemeProvider({ children }) {
  const [timeIsDark, setTimeIsDark] = useState(() => isNight(new Date()));
  const [override, setOverride] = useState(() => readOverride());
  const isDark = override?.isDark ?? timeIsDark;

  useEffect(() => {
    let timer;
    const syncWithClock = () => {
      const now = new Date();
      setTimeIsDark(isNight(now));
      setOverride(readOverride(now.getTime()));
      clearTimeout(timer);
      timer = window.setTimeout(syncWithClock, Math.max(1000, nextThemeChange(now).getTime() - now.getTime() + 50));
    };
    const onVisibilityChange = () => {
      if (!document.hidden) syncWithClock();
    };
    syncWithClock();
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", syncWithClock);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", syncWithClock);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--color-bg-primary").trim();
    if (themeColor) document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // The current page still updates when storage is disabled.
    }
  }, [isDark]);

  const toggleTheme = () => {
    const choice = { isDark: !isDark, until: nextThemeChange(new Date()).getTime() };
    setOverride(choice);
    try {
      localStorage.setItem(OVERRIDE_KEY, JSON.stringify(choice));
    } catch {
      // Manual switching still works for this page session.
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// The hook shares the provider's context; a separate module would add indirection here.
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

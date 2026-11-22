import { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();
const PREFERENCE_KEY = "portfolioThemePreference";

const readPreference = () => {
  try {
    return localStorage.getItem(PREFERENCE_KEY) === "dark";
  } catch {
    // Day mode is the default when storage is unavailable.
    return false;
  }
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(readPreference);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--color-bg-primary").trim();
    if (themeColor) document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
  }, [isDark]);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    try {
      localStorage.setItem(PREFERENCE_KEY, nextIsDark ? "dark" : "light");
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

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

export function useTheme() {
  type Theme = "system" | "dark" | "light";
  type ThemeOption = {
    key: Theme;
    name: string;
    icon: JSX.Element;
  };

  const Themes: ThemeOption[] = [
    {
      key: "system",
      name: "system",
      icon: <Monitor className="h-4 w-4" />,
    },
    {
      key: "light",
      name: "light",
      icon: <Sun className="h-4 w-4" />,
    },
    {
      key: "dark",
      name: "dark",
      icon: <Moon className="h-4 w-4" />,
    },
  ];

  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "system")
  );

  useEffect(() => {
    setDocumentClasses();
  }, [theme]);

  function setDocumentClasses() {
    if (theme === "system") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("light");
    } else if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("light");
    }
  }

  function changeTheme(newTheme: Theme) {
    if (newTheme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", newTheme);
    }
    setTheme(newTheme as Theme);
    setDocumentClasses();
  }

  const currentTheme = Themes.find((t) => t.key === theme)!;

  return { theme, setTheme, changeTheme, currentTheme, Themes };
}

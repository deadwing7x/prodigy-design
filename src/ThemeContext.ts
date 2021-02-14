import React from "react";

export type ThemeName = "light" | "dark";

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
};

const ThemeContext = React.createContext<ThemeContextType>(undefined!);

export default ThemeContext;

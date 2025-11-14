import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { PiSunLight, IoIosMoon } from "../assets";

export default function ThemeSwitchButton() {
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);

  const handleButtonClick = () => {
    changeCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <button 
      className="cursor-pointer text-text_light_secondary dark:text-text_dark_secondary hover:text-primary dark:hover:text-primary transition-colors p-1.5 rounded-md hover:bg-hover_light dark:hover:bg-hover_dark" 
      onClick={handleButtonClick}
      aria-label="Toggle theme"
    >
      {currentTheme === "light" ? <IoIosMoon /> : <PiSunLight />}
    </button>
  );
}

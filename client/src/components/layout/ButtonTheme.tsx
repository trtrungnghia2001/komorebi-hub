import { memo, useEffect, useState } from "react";
import bgLight from "@/assets/image/bg-lightmode.png";
import bgDark from "@/assets/image/bg-darkmode.png";
import btnDark from "@/assets/image/btn-darkmode.png";
import btnLight from "@/assets/image/btn-lightmode.png";
import clsx from "clsx";

type ThemeType = "light" | "dark";

const ButtonTheme = () => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      className={clsx(
        "relative rounded-full select-none cursor-pointer h-8 w-16 transition-all duration-500 bg-cover bg-center"
      )}
      style={{ backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})` }}
    >
      <button
        className={clsx(
          "absolute cursor-pointer top-0.5 transform transition-all duration-300 ease-in-out",
          theme === "dark" ? "left-1" : "left-[calc(100%-32px)]"
        )}
      >
        <img
          src={theme === "dark" ? btnDark : btnLight}
          alt="icon"
          loading="lazy"
          className="w-7 h-7 object-contain"
        />
      </button>
    </div>
  );
};

export default memo(ButtonTheme);

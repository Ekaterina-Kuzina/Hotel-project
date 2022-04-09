import React from "react";
import buttonsStyle from "./buttons.module.css";

export default function ExitButton() {
  const hanbleClick = () => {
    localStorage.clear();
  };

  return (
    <button
      onClick={hanbleClick}
      type="button"
      className={buttonsStyle.exit__wrapper}
    >
      Выход
      <span className={buttonsStyle.exit__icon} />
    </button>
  );
}

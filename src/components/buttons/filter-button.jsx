import React from "react";
import buttonsStyle from "./buttons.module.css";

const FILTER_BUTTON_STATE_UP = "STATE_UP";
const FILTER_BUTTON_STATE_DOWN = "STATE_DOWN";
const FILTER_BUTTON_STATE_DISABLED = "STATE_DISABLED";

export {
  FILTER_BUTTON_STATE_UP,
  FILTER_BUTTON_STATE_DOWN,
  FILTER_BUTTON_STATE_DISABLED,
};

export default function FilterButton({ children, filterCard, buttonState }) {
  const onClickListener = () => {
    filterCard(buttonState);
  };
  if (buttonState === FILTER_BUTTON_STATE_DISABLED) {
    return (
      <button
        type="button"
        onClick={onClickListener}
        className={buttonsStyle.filter__button__disabled}
      >
        {children}
        <div className={buttonsStyle.filter__icons}>
          <span className={buttonsStyle.filter__icon__up__enabled} />
          <span className={buttonsStyle.filter__icon__down__enabled} />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClickListener}
      className={buttonsStyle.filter__btn}
    >
      {children}
      <div className={buttonsStyle.filter__icons}>
        <span
          className={
            buttonState === FILTER_BUTTON_STATE_UP
              ? `${buttonsStyle.filter__icon__up__enabled}`
              : `${buttonsStyle.filter__icon__up__disabled}`
          }
        />
        <span
          className={
            buttonState === FILTER_BUTTON_STATE_DOWN
              ? `${buttonsStyle.filter__icon__down__enabled}`
              : `${buttonsStyle.filter__icon__down__disabled}`
          }
        />
      </div>
    </button>
  );
}

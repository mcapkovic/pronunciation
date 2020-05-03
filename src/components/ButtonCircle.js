import React, { useState, useRef, useCallback, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonCircle(props) {
  const { onClick, value, className, children, icons } = props;
  return (
    <button
      className={`button-circle ${className}`}
      onClick={onClick}
      value={value}
    >
      {icons.map((icon) => {
        const { isVisible, iconClassName, ...awesomeIconProps } = icon;

        return (
          <FontAwesomeIcon
            className={`button-circle__icon button-circle__icon--${
              isVisible ? "hidden" : "visible"
            } ${iconClassName}`}
            size="4x"
            color="gray"
            {...awesomeIconProps}
          />
        );
      })}

      {children}
    </button>
  );
}

export default ButtonCircle;

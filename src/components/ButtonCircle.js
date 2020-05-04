import React, { useState, useRef, useCallback, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonCircle(props) {
  const { className, children, icons, ...buttonProps } = props;
  return (
    <button
      className={`button-circle ${className}`}
      {...buttonProps}
      
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

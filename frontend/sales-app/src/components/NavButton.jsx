import React from "react";
import { Link } from "react-router";

const NavButton = ({ children, url, styling }) => {
  return (
    <Link
      to={`${url}`}
      className={`${
        styling === "withBg"
          ? "bg-amber-600 border-2 !text-amber-50"
          : "bg-transparent !text-inherit"
      } rounded-xl px-4 py-2 hover:opacity-90 active:opacity-70 transition-all duration-250
            `}
    >
      {children}
    </Link>
  );
};

export default NavButton;

import React from "react";
import { Menu } from "./Menu";

export const Layout = ({ children }) => {
  return (
    <div className="w-full flex">
      <div className="w-1/6 bg-blue-200">
        <Menu />
      </div>
      <div className="w-5/6 bg-gray-200">{children}</div>
    </div>
  );
};

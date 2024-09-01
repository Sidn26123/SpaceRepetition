import React from "react";

const CenterWrapper = ({ children }) => {
  return (
    <div className="w-full h-screen z-10 fixed top-0 left-0 flex items-center justify-center">
      {children}
    </div>
  );
};

export {CenterWrapper};

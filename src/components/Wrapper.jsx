import React from "react";

const Wrapper = ({children,height}) => {
  let wrapperCss = `w-96 h-[550px] m-auto relative z-30`;

  return (
    <div className={wrapperCss}>
      {children}
    </div>
  );
};

export default Wrapper;
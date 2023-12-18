import React from "react";

const Wrapper = ({children,height}) => {
  
  let wrapperCss = {
    "550px" : "w-[400px] h-[550px] m-auto relative z-30 p-4" ,
    "290px" : "w-[400px] h-[290px] m-auto relative z-30 p-4"
  } 

  const className = wrapperCss[height];

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Wrapper;
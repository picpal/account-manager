import React from "react";

const Wrapper = ({children,height}) => {
  
  let wrapperCss = {
    "570px" : "w-[400px] h-[570px] m-auto relative z-30 py-4 px-6 overflow-hidden" ,
    "205px" : "w-[400px] h-[205px] m-auto relative z-30 py-4 px-6 overflow-hidden"
  } 

  const className = wrapperCss[height];

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Wrapper;
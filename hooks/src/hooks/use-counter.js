import React, { useState,useEffect } from "react";

const useCounter = (props) =>{
    const [counter, setCounter] = useState(0);
    let differential = props
    useEffect(() => {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + differential);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [props]);  

    return counter;
};

export default useCounter;
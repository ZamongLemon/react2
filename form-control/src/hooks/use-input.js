import React,{useState} from "react";

const useInput = (validateValue)=>{
    const [enteredValue,setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const enteredValueIsValid = validateValue(enteredValue);
    const hasError = !enteredValueIsValid && isTouched;

    const InputChangeHandler = (event) =>{
        setEnteredValue(event.target.value);
      }
    const InputBlurHandler = (event) =>{
      setIsTouched(true); 
    }
    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }
    return {
        value: enteredValue,
        hasError,
        enteredValueIsValid,
        InputChangeHandler,
        InputBlurHandler,
        reset
    };
}
export default useInput;
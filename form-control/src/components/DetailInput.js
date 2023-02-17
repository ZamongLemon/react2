import { useEffect } from "react";
import useInput from "../hooks/use-input";

const  DetailInput = (props) =>{

    const {
        value,
        hasError, 
        enteredValueIsValid, 
        InputChangeHandler,
        InputBlurHandler,
        reset

    } =useInput(props.validation);

    useEffect( ()=>{
        props.setReset(reset);
    },[]);

    const inputClasses = hasError ? 'form-control invalid' : 'form-control';
    return (
        <div className={inputClasses}>
        <label htmlFor='name'>{props.title}</label>
        <input 
         type='text'
         id={props.id} 
         onChange = {InputChangeHandler}
         onBlur = {InputBlurHandler}
         value = {value}
         />
         {hasError && (<p className="error-text"> {props.text} </p>)}
      </div>
    )
}

export default DetailInput;
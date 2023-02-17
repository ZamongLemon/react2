import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const { value: enteredName,
          hasError : nameInputHasError, 
          enteredValueIsValid: enteredNameIsValid, 
          InputChangeHandler: nameChangeHandler ,
          InputBlurHandler : nameBlurhandler,
          reset: resetNameInput
        } = useInput((value) => {return value.trim() !== ''});

  const { value: enteredEmail,
          hasError : emailInputHasError, 
          enteredValueIsValid: enteredEmailIsValid, 
          InputChangeHandler: emailChangeHandler ,
          InputBlurHandler : emailBlurhandler,
          reset: resetEmailInput
        } = useInput((value) => {return (/\S+@\S+\.\S+/).test(value)});

  let formIsValid = false;

  if(enteredNameIsValid && enteredEmailIsValid) formIsValid =true;

  const formSubmitHandler = (event) =>{
    event.preventDefault();

    if(!enteredNameIsValid) return;
    if(!enteredEmailIsValid) return;

    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput();
    resetEmailInput();
  }
  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        type='text'
         id='name' 
         onChange = {nameChangeHandler}
         onBlur = {nameBlurhandler}
         value = {enteredName}
         />
         {nameInputHasError && (<p className="error-text"> name must not be empty. </p>)}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>Your Email</label>
        <input 
         type='text'
         id='email' 
         onChange = {emailChangeHandler}
         onBlur = {emailBlurhandler}
         value = {enteredEmail}
         />
         {emailInputHasError && (<p className="error-text"> email is wrong. </p>)}
      </div>
      <div className="form-actions">
        <button disabled ={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

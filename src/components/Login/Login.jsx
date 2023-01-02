import React, { useState , useEffect , useReducer , useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/authContext';
import Input from "../UI/Input/Input"

function emailReducer (state , action){
  if(action.type === 'USER_INPUT'){
    return {value : action.value , isValid : action.value.includes('@')}
  }
  if(action.type === 'BLUR'){
    return {value : state.value , isValid : state.value.includes('@')}
  }
}

function passwordReducer (state , action){
  if(action.type === 'USER_INPUT'){
    return {value : action.value , isValid : action.value.trim().length > 6}
  }
  if(action.type === 'BLUR'){
    return {value : state.value , isValid : state.value.trim().length > 6}
  }
}

function Login () {
  const ctx = useContext(AuthContext)

  const [emailState , dispatchEmail] = useReducer(emailReducer , {value : '' , isValid: null})
  const [passwordState , dispatchPassword] = useReducer(passwordReducer , {value : '' , isValid: null})
  
  const [formIsValid, setFormIsValid] = useState(false);
  
  const {isValid: emailIsValid} = emailState
  const {isValid: passwordIsValid} = passwordState

  // validation 
  useEffect( ()=>{
    let validation = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 500)
    return () => clearTimeout(validation)
  } , [emailIsValid , passwordIsValid])
  

  //===========================================
// change handling
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT' , value: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type :'USER_INPUT' , value : event.target.value});
  };

// validation on blur
  const validateEmailHandler = () => {
    dispatchEmail({type : 'BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type :'BLUR'});
  };
//============================================
  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

      <Input 
      type="email"
      id="email"
      label = "E-mail"
      isValid = {emailIsValid}
      value={emailState.value}
      onChange={emailChangeHandler}
      onBlur={validateEmailHandler}
      />
      <Input 
      type="password"
      id="password"
      label = "password"
      isValid = {passwordIsValid}
      value={passwordState.value}
      onChange={passwordChangeHandler}
      onBlur={validatePasswordHandler}
      />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

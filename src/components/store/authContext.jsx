import React ,{useState , useEffect} from "react";

// the context itself
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout : () => {},
  onLogin : (email ,password) => {}
});

// the context provider
export function AuthContextProvider (props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggingValidation = localStorage.getItem("logging");

    if (loggingValidation === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email , password) => {
    // We should of course check email and password
    localStorage.setItem("logging", true);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("logging", false);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
    value ={{ 
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler
    }}>{props.children}</AuthContext.Provider>
  )
}



export default AuthContext;

import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

function AuthPage(props) {
  const [signUp, setSignUp] = useState(true);

  function togglePage() {
    setSignUp(!signUp);
  }

  return (
    <>
      <h1>Sign up or login</h1>
      <>
        {signUp ? (
          <SignUpForm setUser={props.setUser} />
        ) : (
          <LoginForm setUser={props.setUser} />
        )}
      </>
      <h2>{signUp ? "Or go here to login" : "Or go to signup"}</h2>
      <button onClick={togglePage}>{signUp ? "Log In" : "Register"}</button>
    </>
  );
}

export default AuthPage;

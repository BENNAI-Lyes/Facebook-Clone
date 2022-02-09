import "./login.css";
import { useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";
import { login } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const history = useHistory();
  const email = useRef();
  const password = useRef();

  const { user, dispatch, error, isFetching } = useContext(AuthContext);

  const handelSubmit = (e) => {
    e.preventDefault();
    login(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">Lyes--social</div>
          <div className="loginDesc">
            Connect with friends and the world around you on <b>Lyes--social</b>
          </div>
        </div>
        <form className="loginRight" onSubmit={handelSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            className="loginInput"
            ref={email}
          />
          <input
            type="password"
            required
            minLength="4"
            placeholder="Password"
            className="loginInput"
            ref={password}
          />
          <button type="submit" className="loginButton" disabled={isFetching}>
            {isFetching ? (
              <CircularProgress color="inherit" size="20px" />
            ) : (
              "Loge In"
            )}
          </button>
          <p className="loginForgot">Forgot password</p>
          <button
            className="loginRegisterButton"
            type="button"
            onClick={() => history.push("/register")}
          >
            {isFetching ? (
              <CircularProgress color="inherit" size="20px" />
            ) : (
              "Create a new account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

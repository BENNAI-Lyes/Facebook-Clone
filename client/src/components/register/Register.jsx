import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("api/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
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
            type="text"
            required
            placeholder="Name"
            className="loginInput"
            ref={username}
          />
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
            placeholder="Password"
            className="loginInput"
            ref={password}
          />
          <input
            type="password"
            required
            placeholder="Password again"
            className="loginInput"
            ref={passwordAgain}
          />
          <button type="submit" className="registerSignUpButton">
            Sign Up
          </button>

          <button
            className="registerLoginButton"
            onClick={() => history.push("/login")}
          >
            Login in to your account
          </button>
        </form>
      </div>
    </div>
  );
}

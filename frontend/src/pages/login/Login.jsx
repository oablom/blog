import "./styling/login.css";
import { useRef, useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(""); // Added this to handle error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("username", res.data.user.username);
      console.log(res.data);
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("user"));
      console.log(localStorage.getItem("username"));

      //reloada sidan
      window.location.reload();
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Wrong username or password"); // Update the error message
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your Username..."
          ref={usernameRef}
        />
        <label>Password:</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
        {error && <div className="errorMessage">{error}</div>}{" "}
        {/* Display the error message  */}
      </form>

      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}

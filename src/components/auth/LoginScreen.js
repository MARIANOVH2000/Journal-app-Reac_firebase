import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForms";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const [formvalues, handleInputChange] = useForm({
    email: "m@gmail.com",
    password: "123456",
  });
  const { email, password } = formvalues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
    //console.log(email, password);
  };
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  return (
    <div>
      <h3 className="auth__title">Login</h3>
      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input
          type="text"
          value={email}
          onChange={handleInputChange}
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="password"
          value={password}
          onChange={handleInputChange}
          placeholder="*******"
          name="password"
          className="auth__input"
        />
        <button
          disabled={loading}
          className="btn btn-primary btn-block"
          type="submit"
        >
          Login
        </button>
        <hr />
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">
          Create new count
        </Link>
      </form>
    </div>
  );
};

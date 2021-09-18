import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForms";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { setError, removeError } from "../../actions/ui";
import { startRegisterWithEmailPasswordNom } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  // console.log(msgError);
  const [formvalues, handleInputChange] = useForm({
    nom: "Mariano",
    email: "m@gmail.com",
    password: "123456",
    password2: "123456",
  });
  const { nom, email, password, password2 } = formvalues;

  const handleRegister = (e) => {
    e.preventDefault();

    console.log(nom, email, password, password2);
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordNom(email, password, nom));
    }
  };

  const isFormValid = () => {
    if (nom.trim().length === 0) {
      dispatch(setError("Name is requerid"));

      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email no valido"));

      return false;
    } else if (password !== password2 || password.length <= 5) {
      dispatch(
        setError(
          "Las contraseñas no coinciden o se ingreso una de menos de 6 caracteres"
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <div>
      <h3 className="auth__title">Register Screen</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-color">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="nom"
          value={nom}
          onChange={handleInputChange}
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="auth__input"
        />
        <input
          type="password"
          placeholder="Confirm password "
          name="password2"
          value={password2}
          onChange={handleInputChange}
          className="auth__input"
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link className="link mt-5" to="/auth/login">
          Alredy Registered?
        </Link>
      </form>
    </div>
  );
};

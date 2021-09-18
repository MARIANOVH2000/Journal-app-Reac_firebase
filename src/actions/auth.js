import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
//libreria para mostrar los emsnajes de error
import Swal from "sweetalert2";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        //para mostrar los mensjaes de error
        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startRegisterWithEmailPasswordNom = (email, password, nom) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: nom });
        console.log(user);
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
        Swal.fire("Error", e.message, "error");
      });
  };
};
//googlelogin
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(vaciar());
  };
};
export const logout = () => ({
  type: types.logout,
});
export const vaciar = () => ({
  type: types.notesLogoutCleaning,
});

import React from 'react';
import firebase from 'firebase';
import { fire } from '../../utils/firebase';
import { useContextValue } from '../../state/state';
import 'firebase/auth';
import './Login.scss';

export const Login = () => {
  const { setCurrentUser, setLoader } = useContextValue();

  const login = async () => {
    setLoader(true);

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await fire.auth().signInWithPopup(provider);

      setCurrentUser(user as null);
    } catch (e) {
      console.log(e.message);
      setLoader(false);
    }

    setLoader(false);
  };

  return (
    <div className="login">
      <div className="login__body">
        <button className="login__button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

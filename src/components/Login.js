import React from 'react'
import { GoogleOutlined } from "@ant-design/icons";
import "./login.css";
import firebase from "firebase/app";
import { auth } from "../firebase";

const Login = () => {
  return (
    <div className="loginPage">
      <div className="googleIcon" 
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }>
        <GoogleOutlined
          className="icon"
        />
        Login With Google
      </div>
    </div>
  );
};

export default Login;

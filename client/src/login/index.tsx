/// <reference path="../../global.d.ts" />

import React from "react";
import styles from "./style.module.scss";
import { useNavigate, Link } from "react-router-dom";

// Custom interface for Login form
interface LoginForm extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface LoginFormEl extends HTMLFormElement {
  readonly elements: LoginForm;
}
type template = { email: string; password: string };

// Main Login component is rendered here...
const Login = () => {
  const [logindet, Setlogindet] = React.useState<template>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Function to check if use is already logged in...
  React.useEffect(() => {
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (auth.hasOwnProperty("email") && auth.email.length > 0) {
      navigate(`/home`, { replace: false });
    }
  }, []);

  // Ref object for styling form components...
  const styling = {
    email: React.useRef<HTMLInputElement>(null),
    pass: React.useRef<HTMLInputElement>(null),
    warning: React.useRef<HTMLSpanElement>(null),
  };

  // Function for handling input change...
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    switch (target.name) {
      case "email": {
        Setlogindet({
          ...logindet,
          email: target.value,
        });
        break;
      }
      case "password": {
        Setlogindet({
          ...logindet,
          password: target.value,
        });
        break;
      }
      default: {
        Setlogindet({
          ...logindet,
        });
        break;
      }
    }
  };

  // Function for handling form submit...
  const HandleSubmit = (e: React.FormEvent<LoginFormEl>) => {
    e.preventDefault();
    let status = 200;
    fetch(`${import.meta.env.VITE_RENDER}/api/auth/login`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logindet),
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((resMessage) => {
        if (status !== 200) {
          styling.warning.current!.style.display = "block";
          styling.email.current!.style.borderColor = "red";
          styling.pass.current!.style.borderColor = "red";
        } else {
          localStorage.setItem("auth", JSON.stringify(resMessage));
          navigate(`/home`, { replace: false });
        }
      });
  };

  return (
    <main className={styles.loginWrapper}>
      <form onSubmit={HandleSubmit}>
        <h2>Log in</h2>
        <span className={styles.warning} ref={styling.warning}>
          Invalid email or Password
        </span>
        <span className={styles.inputField}>
          <label htmlFor="email"> email </label>
          <input
            className={styles.loginEmail}
            value={logindet.email}
            onChange={HandleChange}
            name="email"
            ref={styling.email}
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="false"
          />
        </span>
        <span className={styles.inputField}>
          <label htmlFor="password"> Password </label>
          <input
            className={styles.loginPass}
            name="password"
            ref={styling.pass}
            id="password"
            value={logindet.password}
            onChange={HandleChange}
            type="password"
            placeholder="Enter your Password"
            autoComplete="false"
          />
        </span>
        <input
          type="submit"
          placeholder="Login"
          value="Login"
          name="submit"
          className={styles.loginSubmit}
          disabled={
            logindet.email.length === 0 || logindet.password.length < 5
              ? true
              : false
          }
          style={{
            opacity: `${
              logindet.email.length === 0 || logindet.password.length < 5
                ? 0.5
                : 1
            }`,
            cursor: `${
              logindet.email.length === 0 || logindet.password.length < 5
                ? "default"
                : "pointer"
            }`,
          }}
        />
      </form>
      <div className={styles.redirect}>
        Don't have an account?
        <Link to="/register">Signup Now!</Link>
      </div>
    </main>
  );
};

export default Login;

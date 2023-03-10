/// <reference path="../../global.d.ts" />

import React from "react";
import styles from "./style.module.scss";
import { useNavigate, Link } from "react-router-dom";

interface SignupForm extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignupFormEl extends HTMLFormElement {
  readonly elements: SignupForm;
}

type template = { username: string; email: string; password: string };

const Login = () => {
  const [signupdet, Setsignupdet] = React.useState<template>({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (auth.hasOwnProperty("email") && auth.email.length > 0) {
      navigate(`/home`, { replace: false });
    }
  }, []);

  const styling = {
    email: React.useRef<HTMLInputElement>(null),
    pass: React.useRef<HTMLInputElement>(null),
    warning: React.useRef<HTMLSpanElement>(null),
  };

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    switch (target.name) {
      case "username": {
        Setsignupdet({
          ...signupdet,
          username: target.value,
        });
        break;
      }
      case "email": {
        Setsignupdet({
          ...signupdet,
          email: target.value,
        });
        break;
      }
      case "password": {
        Setsignupdet({
          ...signupdet,
          password: target.value,
        });
        break;
      }
      default: {
        Setsignupdet({
          ...signupdet,
        });
        break;
      }
    }
  };

  const HandleSubmit = (e: React.FormEvent<SignupFormEl>) => {
    e.preventDefault();
    let status = 200;
    fetch(`${import.meta.env.VITE_LOCALHOST_SERVER}/api/auth/register`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupdet),
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
    <main className={styles.signupWrapper}>
      <form onSubmit={HandleSubmit}>
        <h2>Sign Up</h2>
        <span className={styles.warning} ref={styling.warning}>
          Email Id or Username is already in use!
        </span>
        <span className={styles.inputField}>
          <label htmlFor="username"> username </label>
          <input
            className={styles.signupUsername}
            value={signupdet.username}
            onChange={HandleChange}
            name="username"
            ref={styling.email}
            id="username"
            type="username"
            placeholder="Enter your username"
            autoComplete="false"
          />
        </span>
        <span className={styles.inputField}>
          <label htmlFor="email"> email </label>
          <input
            className={styles.signupEmail}
            value={signupdet.email}
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
            className={styles.signupPass}
            name="password"
            ref={styling.pass}
            id="password"
            value={signupdet.password}
            onChange={HandleChange}
            type="password"
            placeholder="Enter your Password"
            autoComplete="false"
          />
        </span>
        <input
          type="submit"
          placeholder="Signup"
          value="Signup"
          name="submit"
          className={styles.signupSubmit}
          disabled={
            signupdet.username.length === 0 ||
            signupdet.email.length === 0 ||
            signupdet.password.length < 5
              ? true
              : false
          }
          style={{
            opacity: `${
              signupdet.username.length === 0 ||
              signupdet.email.length === 0 ||
              signupdet.password.length < 5
                ? 0.5
                : 1
            }`,
            cursor: `${
              signupdet.username.length === 0 ||
              signupdet.email.length === 0 ||
              signupdet.password.length < 5
                ? "default"
                : "pointer"
            }`,
          }}
        />
      </form>
      <div className={styles.redirect}>
        Already have an account?
        <Link to="/">Login Now!</Link>
      </div>
    </main>
  );
};

export default Login;

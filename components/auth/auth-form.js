import { useRef } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import styles from "./auth-form.module.css";

function AuthForm() {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    const result = await signIn("credentials", {
      redirect: false,
      username: enteredUsername,
      password: enteredPassword,
    });

    if (!result.error) {
      router.replace("/");
    } else {
      alert("Credentials do not match!", { type: "error" });
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input type="username" id="username" required ref={usernameInputRef} />
        <input type="password" id="password" required ref={passwordInputRef} />

        <button onClick={submitHandler}>Login</button>
      </form>
    </section>
  );
}

export default AuthForm;

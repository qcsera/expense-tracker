import { useRef, useState, useEffect } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import styles from "./auth-form.module.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { style } from "@mui/system";

function AuthForm() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  async function onSubmit(data) {
    const result = await signIn("credentials", {
      redirect: false,

      username: data.username,
      password: data.password,
    });

    if (!result.error) {
      router.replace("/");
    } else {
      alert("Credentials do not match!", { type: "error" });
    }
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <section className={styles.container}>
      <Box>
        <h1>Login</h1>
        <Grid container spacing={1} sx={{ minWidth: 300 }}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Grid item xs={12} sm={12}>
              <TextField
                size="small"
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                margin="dense"
                {...register("username")}
                error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="red">
                {errors.username?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} mb={3}>
              <TextField
                size="small"
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="dense"
                {...register("password")}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="red">
                {errors.password?.message}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Box>
    </section>
  );
}

export default AuthForm;

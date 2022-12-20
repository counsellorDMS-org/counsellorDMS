import React from "react";
import { useRef, useState, useEffect, useContext } from "react";

import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";

//Material UI imports
import {
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Container,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
} from "@mui/material";
//Formik  and Yup imports
import { useFormik } from "formik";
import * as Yup from "yup";
//Asset imports
import Logo from "../assets/Logo.png";
//Component imports
import Copyright from "../components/Copyright";

const LOGIN_URL = "/auth/";

export const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //Formik hook
  //Formik is a library that helps in building forms in React and React Native apps.
  //Formik is used to handle the form state and validation
  const formik = useFormik({
    //Formik initial values
    initialValues: {
      email: "",
      password: "",
    },
    //Formik validation
    //Yup is a JavaScript object schema description language and validator for value parsing and validation.
    //Yup is used to validate the form fields
    validationSchema: Yup.object({
      //Yup email validation of type string
      email: Yup.string()
        .email("Enter a valid email")
        .max(250, "Email should be of maximum 255 characters length")
        .required("Email is required"),
      //Yup password validation of type string
      password: Yup.string()
        .min(8, "Password should be of minimum 8 characters length")
        .max(20, "Password should be of maximum 20 characters length")
        .required("Password is required"),
    }),
    //Formik on submit
    onSubmit: (values) => {
      setEmail(values.email);
      setPassword(values.password);
      handleSignIn();
    },
  });

  /*  useEffect(() => {
    userRef.current.focus();
  }, []); */

  useEffect(() => {
    setErrMessage("");
  }, [email, password]);
  //Function to handle sign in
  const handleSignIn = async () => {
    //Axios post request to login
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ email, password, roles, accessToken });
      //set values to empty
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
    } catch (error) {
      if (!error?.response) {
        setErrMessage("Something went wrong. Please try again later");
      } else if (error?.response?.status === 400) {
        setErrMessage("Invalid email or password");
      } else if (error?.response?.status === 401) {
        setErrMessage("Unauthorized");
      } else {
        setErrMessage("Login Failed");
      }
      errRef.current.focus();
    }

    return;
  };
  return (
    //Material UI container
    <Container component='main' maxWidth='xs'>
      {/* Material UI CSS baseline. A
        CSS baseline is a set of CSS rules that are applied to all elements on a page.
        */}
      <CssBaseline />
      {/* Material UI Box */}
      {/* Box is a component that allows you to easily style and layout your content. */}
      {/*It uses the sx prop to allow you to easily style elements with both utility classes and custom CSS. */}

      <Box
        id='login'
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={Logo}
          alt='Logo'
          style={{
            height: "240px",
            width: "240px",
          }}
        />
        {/* Material UI Typography
            Typography is the text component of Material UI. It is used to display text on the screen.
         */}

        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Typography ref={errRef} aria-live='assertive' color='red'>
          {errMessage}
        </Typography>
        <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='off'
            ref={userRef}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
          />
          <TextField
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 1 }}
          >
            {" "}
            {/*mt is margin top, mb is margin bottom */}
            Sign In
          </Button>
          {/* Material UI Grid, which is used to create a responsive layout. */}
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 3, mb: 2 }} />
    </Container>
  );
};

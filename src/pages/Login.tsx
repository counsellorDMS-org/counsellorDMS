import React from "react";

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
import { SxProps } from "@mui/system";

//Formik  and Yup imports
import { useFormik } from "formik";
import * as Yup from "yup";

//Asset imports
import Logo from "../assets/Logo.png";

//Typescript requires props to have a type
//Will not be necessary when we move to normal JS
//Copyright props for the component
type CopyrightProps = {
  sx: SxProps;
};
//Login props for the function
type LoginRequestPayload = {
  email: string;
  password: string;
};

// Copyright component
const Copyright = (props: CopyrightProps) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Typography color='inherit'>
        CounsellorDMS, stratuSolve Internship 22/23
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export const Login = () => {
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
        .max(250, "Email should be of maximum 255 characters length"),
      //Yup password validation of type string
      password: Yup.string()
        .min(8, "Password should be of minimum 8 characters length")
        .max(20, "Password should be of maximum 20 characters length")
        .matches(/[0-9]/, "Password must contain a number")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[A-Z]/, "Password must contain a uppercase letter")
        .matches(/[!@#$%^&*]/, "Password must contain a special character"),
    }),
    //Formik on submit
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });
  //Function to handle sign in
  const handleSignIn = (values: LoginRequestPayload) => {
    const { email, password } = values;

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
        <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            required
            margin='normal'
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
          />
          <TextField
            required
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
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 2, mb: 1 }}
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
      <Copyright sx={{ mt: 1, mb: 1 }} />
    </Container>
  );
};

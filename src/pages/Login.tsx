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

//Asset imports
import Logo from "../assets/Logo.png";

type CopyrightProps = {
  sx: SxProps;
};

const Copyright = (props: CopyrightProps) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://councellordms.co.za'>
        www.councellordms.co.za
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export const Login = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
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
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={() => {}} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
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
            sx={{ mt: 3, mb: 1 }}
          >
            Sign In
          </Button>
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

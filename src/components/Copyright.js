import React from "react";
import { Typography } from "@mui/material";

// Copyright component
const Copyright = (props) => {
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

  export default Copyright;
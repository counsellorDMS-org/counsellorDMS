//ENVIRONMENT EXPORTS
import React from "react";
import { useState, useEffect } from "react";
//State is a way to store data in react. It is similar to a variable in javascript.
//useState is a react hook that allows us to use state in functional components.
//useEffect is a react hook that allows us to use lifecycle methods in functional components.

//COMPONENT IMPORTS
import { Box } from "@mui/material";

//ASSET IMPORTS
import background from "../assets/backgroundimage.jpg";
import Logo from "../assets/Logo.png";

type deadline = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
export const ComingSoon = () => {
  const callculateDeadline = () => {
    //Function that calculates the time left until the deadline.
    const difference = +new Date("2023-01-20T14:00:00+00:00") - +new Date();
    let timeLeft: deadline = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  //State that stores the time left until the deadline.
  const [timeLeft, setTimeLeft] = useState(callculateDeadline());

  //useEffect hook that updates the time left every second.
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(callculateDeadline());
    }, 1000);
  });

  return (
    //Box is a Material UI container that can be used to wrap other components. it is the equivalent of Div in HTML.
    //Material UI uses styled components to style components. Styled components are a way to style components using CSS.
    //Material UI uses the sx prop to style components. The sx prop is a shorthand for the style prop, which we use to certain styling elements to our liking.
    <Box
      id='container'
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        fontFamily: "Courier New",
        
      }}
    >
      <Box
        id='Logo'
        sx={{
          position: "absolute",
          top: "5%",
          left: "2.5%",
        }}
      >
        <img src={Logo} alt='Logo' height='350' />
      </Box>
      <Box
        id='text'
        sx={{
          position: "absolute",
          top: "25%",
          left: "30%",
          fontSize: "20px",
        }}
      >
        <h1>Coming Soon....</h1>
        <hr />
        <p
          id='timer'
          style={{
            fontSize: "28px",
            position:'absolute',
            left: "15%",
            top:"80%",
          }}
        >
          <span>{timeLeft.days}</span>
          <span>d </span>
          <span>{timeLeft.hours}</span>
          <span>h </span>
          <span>{timeLeft.minutes}</span>
          <span>m </span>
          <span>{timeLeft.seconds}</span>
          <span>s </span>
        </p>
      </Box>
    </Box>
  );
};

import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainAppBar from "../components/MainAppBar";

const AboutUs = () => {
  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg">
        <Typography variant="h2">About OurCattitude</Typography>
        <br />
        <br />
        <Typography paragraph>
          Cat behaviour patterns can be challenging to track. Answering vet
          questions like "when did a certain behaviour happen?" and "what else
          could have changed in their routine around the same time?" can be
          challenging and hard to remember for the busy parents of 373 million
          pet cats worldwide!
        </Typography>
        <Typography paragraph>
          Recognising a gap in available digital tools for Pet behaviour
          tracking, OurCattitude is a platform that seamlessly captures and
          stores pet behaviour patterns. With user-centric design, it allows
          registered users to manage profiles for multiple cats, covering usual
          behaviours like eating, sleeping, litter patterns and activity levels
          as well as unusual changes and behaviours. Real-time data
          visualization is offered through interactive line charts, enabling
          users to monitor their cats patterns on demand. Users can also
          retrieve older logs and generate reports on demand to share with their
          vets.
        </Typography>
        <br />
        <Typography paragraph style={{ fontWeight: "bold" }}>
          It's designed to take only one minute a day to log your cat's routine
          and behaviours, and the data can be used to help you and your vet make
          informed decisions about your cat's health.
        </Typography>
      </Container>
    </>
  );
};

export default AboutUs;

import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const AboutUs = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1">About OurCattitude</Typography>
      <Typography paragraph>
        Cat behaviour patterns can be challenging to track. Answering vet questions
        like "when did a certain behaviour happen?" and "what else could have
        changed in their routine around the same time?" can be challenging and hard 
        to remember for the busy parents of 373 million pet cats worldwide!
        
      </Typography>
      <Typography paragraph>
        Recognising a gap in available digital tools for Pet behaviour tracking,
        OurCattitude is a platform that seamlessly captures and analyzes pet
        behaviour patterns. It is built with robust front-end and back-end
        services, allows registered users to manage profiles of multiple cats,
        covering usual behaviours like eating, sleeping, litter habits and activity
        levels as well as unusual behaviours. Real-time data visualization is offered
        through interactive charts, enabling users to monitor usual and unusual 
        behaviour patterns on demand and generates reports to share with their vets.
        </Typography>

        <Typography paragraph>
        It's designed to take only a couple of minutes a day to log your cat's
        routine and behaviours, and the data can be used to help you and your vet 
        make informed decisions about your cat's health. 
      </Typography>
    </Container>
  );
};

export default AboutUs;

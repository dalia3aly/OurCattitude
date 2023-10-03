import React, { useState, useEffect } from "react";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["Slide 1", "Slide 2", "Slide 3"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // 2 seconds
    return () => clearInterval(interval);
  }, []);

  return <div>{slides[currentSlide]}</div>;
};

export default Slideshow;

import React, { useState, useEffect } from "react";
import backpacking01 from "../images/backpacking-01.webp";
import backpacking02 from "../images/backpacking-02.webp";
import backpacking03 from "../images/backpacking-03.webp";
import backpacking04 from "../images/backpacking-04.webp";
import backpacking05 from "../images/backpacking-05.webp";
import backpacking06 from "../images/backpacking-06.webp";
import backpacking07 from "../images/backpacking-07.webp";
import backpacking08 from "../images/backpacking-08.webp";
import backpacking09 from "../images/backpacking-09.webp";
import backpacking10 from "../images/backpacking-10.webp";
import backpacking11 from "../images/backpacking-11.webp";
import backpacking12 from "../images/backpacking-12.webp";
import backpacking13 from "../images/backpacking-13.webp";
import backpacking14 from "../images/backpacking-14.webp";
import backpacking15 from "../images/backpacking-15.webp";
import backpacking16 from "../images/backpacking-16.webp";
import backpacking17 from "../images/backpacking-17.webp";
import backpacking18 from "../images/backpacking-18.webp";
import backpacking19 from "../images/backpacking-19.webp";

export default function Carousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([
    backpacking01,
    backpacking02,
    backpacking03,
    backpacking04,
    backpacking05,
    backpacking06,
    backpacking07,
    backpacking08,
    backpacking09,
    backpacking10,
    backpacking11,
    backpacking12,
    backpacking13,
    backpacking14,
    backpacking15,
    backpacking16,
    backpacking17,
    backpacking18,
    backpacking19,
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="card shadow-lg image-carousel rounded-4">
      <div className="image-wrapper rounded-4">
        <img
          src={images[currentImageIndex]}
          className="card-img-top h-full image-carousel-image"
          alt={`Slide ${currentImageIndex + 1}`}
        />
      </div>
    </div>
  );
}

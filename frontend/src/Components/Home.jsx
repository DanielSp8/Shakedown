import React from "react";
import AppTitle from "./AppTitle";
import Carousel from "./Carousel";
import DisplayQuote from "./DisplayQuote";

export default function Home() {
  return (
    <div className="d-flex flex-column center-scene">
      <AppTitle />
      <Carousel />
      <DisplayQuote />
    </div>
  );
}

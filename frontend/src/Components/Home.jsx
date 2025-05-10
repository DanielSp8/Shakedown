import AppTitle from "./AppTitle";
import AppSubTitle from "./AppSubTitle";
import Carousel from "./Carousel";
import DisplayQuote from "./DisplayQuote";

export default function Home() {
  return (
    <div className="d-flex flex-column center-scene">
      <AppTitle />
      <AppSubTitle />
      <Carousel />
      <DisplayQuote />
    </div>
  );
}

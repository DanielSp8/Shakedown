import AppTitle from "./AppTitle";
import Carousel from "./Carousel";

export default function Home() {
  return (
    <div className="d-flex flex-column center-scene">
      <AppTitle />
      <Carousel />
    </div>
  );
}

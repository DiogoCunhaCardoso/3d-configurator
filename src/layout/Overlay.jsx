import Carousel from "./components/Carousel.jsx";
import StatusCard from "./components/StatsCard.jsx";
import BottomCarousel from "./components/BottomCaroussel.jsx";
import SideMenu from "./components/SideMenu.jsx";

export default function Overlay() {
  const images = [
    { src: "./coldbath.png", name: "COLDBATH", alt: "produto1" },
    { src: "./luxcorpus.png", name: "LUXCORPUS", alt: "produto2" },
    { src: "./icerehab.png", name: "ICEREHAB", alt: "produto3" },
    { src: "./senseevo.png", name: "SENSEEVO", alt: "produto4" },
  ];

  const bottomImages = [
    { src: "./acessorio1.png", name: "ENCONSTO CABEÇA", alt: "acessório 1" },
    { src: "./acessorio2.png", name: "CAPA PROTEÇÃO", alt: "acessório 2" },
    { src: "./acessorio3.png", name: "FILTRO", alt: "acessório 3" },
    { src: "./acessorio4.png", name: "LÂMPADA UV", alt: "acessório 4" },
    { src: "./acessorio2.png", name: "ENCOSTO CABEÇA", alt: "acessório 5" },
  ];

  return (
    <main className="max-w-[1440px] h-screen mx-auto relative pointer-events-none">
      <div className="absolute top-8 px-8 w-full pointer-events-auto">
        <Carousel images={images} />
      </div>

      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 pointer-events-auto">
        <SideMenu />
      </div>

      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-auto">
        <StatusCard />
      </div>

      <div className="absolute bottom-8 px-8 w-full pointer-events-auto">
        <BottomCarousel images={bottomImages} />
      </div>
    </main>
  );
}

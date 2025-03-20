import { useState, useEffect, useRef } from "react";
import useStore from "../../store/model.store.js";

const Carousel = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [scaleFactor, setScaleFactor] = useState(1);
  const { activePreset, setActivePreset } = useStore();
  const carouselRef = useRef(null);

  // TO CALCULATE RESIZE -----------------------
  const textBlockWidth = 224;
  const arrowWidth = 32;
  const galleryGap = 48;
  const imageWidth = 200;

  // HANDLE RESIZE ------------------------------
  useEffect(() => {
    const handleResize = () => {
      if (!carouselRef.current) return;

      // Width of entire component
      const componentWidth = carouselRef.current.offsetWidth;
      // Width of the images
      const availableWidth =
        componentWidth - textBlockWidth - 2 * arrowWidth - 2 * galleryGap;

      // Calculate the number of visible images that can fit in the available width
      let newVisibleCount = Math.floor(
        availableWidth / (imageWidth + galleryGap)
      );
      newVisibleCount = Math.min(newVisibleCount, 4); // Maximum of 4 images
      newVisibleCount = Math.max(newVisibleCount, 1); // Minimum of 1 image

      setVisibleCount(newVisibleCount);

      // When it is only 1 image, the component scales down.
      const scale =
        componentWidth < 650 ? Math.max(0.5, componentWidth / 650) : 1;
      setScaleFactor(scale);
    };

    // Initial calculation
    handleResize();

    // Track component width changes
    const resizeObserver = new ResizeObserver(handleResize);
    if (carouselRef.current) resizeObserver.observe(carouselRef.current);

    // Cleanup
    return () => resizeObserver.disconnect();
  }, []);

  // HANDLE NAVIGATION --------------------------
  const handleArrowClick = (direction) => {
    const totalImages = images.length;

    if (direction === "left") {
      const newActivePreset =
        activePreset === 0 ? totalImages - 1 : activePreset - 1;
      setActivePreset(newActivePreset);

      // Update startIndex if the active preset is outside the visible range
      if (
        newActivePreset < startIndex ||
        newActivePreset >= startIndex + visibleCount
      ) {
        setStartIndex(newActivePreset);
      }
    } else {
      const newActivePreset = (activePreset + 1) % totalImages;
      setActivePreset(newActivePreset);

      // Update startIndex if the active preset is outside the visible range
      if (
        newActivePreset < startIndex ||
        newActivePreset >= startIndex + visibleCount
      ) {
        setStartIndex(newActivePreset);
      }
    }
  };

  // GET VISIBLE IMAGES -------------------------
  const visibleImages = Array.from({ length: visibleCount }, (_, i) => {
    const index = (startIndex + i) % images.length;
    return { ...images[index], index };
  });

  // COMPONENT --------------------------
  return (
    <div
      ref={carouselRef}
      className="flex items-center justify-between gap-8 w-full"
      style={{ transform: `scale(${scaleFactor})` }}
    >
      {/* Text Block */}
      <span
        className={`text-white flex flex-col gap-2 whitespace-nowrap w-[${textBlockWidth}px]`}
      >
        <h2>
          ESCOLHA O <br /> SEU MODELO
        </h2>
        <p>
          Selecione no modelo que <br /> deseja personalizar
        </p>
      </span>

      {/* Images and Arrows */}
      <span
        className="flex items-center min-w-48"
        style={{ gap: `${galleryGap}px` }}
      >
        {/* Back Arrow */}
        <img
          onClick={() => handleArrowClick("left")}
          style={{ width: `${arrowWidth}px` }}
          className="aspect-square cursor-pointer shrink-0"
          src="./seta-esq.png"
          alt="Back"
        />
        {/* Images List */}
        {visibleImages.map((image, i) => (
          <span key={i} className="flex flex-col items-center gap-4">
            <img
              src={image.src}
              alt={image.alt}
              className={`w-[${imageWidth}px] h-24 object-cover cursor-pointer shrink-0`}
              style={{
                opacity: activePreset === image.index ? 1 : 0.3,
                transition: "opacity 0.3s",
              }}
              onClick={() => setActivePreset(image.index)}
            />
            <p className="text-white italic font-medium whitespace-nowrap">
              ENCOSTO <span className="text-[#6597c3]">{image.name}</span>
            </p>
          </span>
        ))}
        {/* Forward Arrow */}
        <img
          onClick={() => handleArrowClick("right")}
          style={{ width: `${arrowWidth}px` }}
          className="aspect-square cursor-pointer shrink-0"
          src="./seta-dir.png"
          alt="Forward"
        />
      </span>
    </div>
  );
};

export default Carousel;

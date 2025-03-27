import myStore from "../../../store/model.store";

const TabOne = ({ images }) => {
  const { activePreset, setActivePreset } = myStore();

  return (
    <div className="flex gap-8 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar pointer-events-auto pt-6">
      {images.map((image, i) => (
        <span
          key={i}
          className={`flex flex-col items-center justify-center gap-2 flex-shrink-0 ${
            i === 0 ? "pl-8" : i === images.length - 1 ? "pr-8" : ""
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`h-32 object-cover cursor-pointer ${
              activePreset === i ? "opacity-100" : "opacity-30"
            } transition-opacity duration-300`}
            onClick={() => setActivePreset(i)}
          />
          <p className="text-white italic font-medium text-sm">
            PADRÃO <span className="text-[#6597c3]">{image.name}</span>
          </p>
        </span>
      ))}
    </div>
  );
};

export default TabOne;

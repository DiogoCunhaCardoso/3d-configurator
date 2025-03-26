const TabOne = ({ images }) => {
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
            className="h-32 object-cover cursor-pointer"
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

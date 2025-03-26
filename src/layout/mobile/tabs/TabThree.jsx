const TabThree = ({ accessories }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-8 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar pointer-events-auto pt-12">
        {accessories.map((accessory, i) => (
          <span
            key={i}
            className={`flex flex-col items-center justify-center gap-2 flex-shrink-0 ${
              i === 0 ? "pl-8" : i === accessories.length - 1 ? "pr-8" : ""
            }`}
          >
            <img
              src={accessory.src}
              alt={accessory.alt}
              className="h-20 object-cover cursor-pointer"
            />
            <p className="text-white italic font-medium text-sm">
              {accessory.name}
            </p>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TabThree;

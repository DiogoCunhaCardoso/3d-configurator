import myStore from "../../../store/model.store";

const TabThree = ({ accessories }) => {
  const { selectedAccessories, setSelectedAccessories } = myStore();

  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-8 overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar pointer-events-auto pt-12">
        {accessories.map((accessory, i) => {
          const isSelected = selectedAccessories.includes(accessory.name);
          return (
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
                style={{
                  opacity: isSelected ? 1 : 0.3,
                  transition: "opacity 0.3s",
                }}
                onClick={() => setSelectedAccessories(accessory.name)}
              />
              <p className="text-[#6597c3] italic font-medium text-sm">
                {accessory.name}
              </p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TabThree;

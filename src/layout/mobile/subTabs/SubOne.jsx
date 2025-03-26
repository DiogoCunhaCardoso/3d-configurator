import myStore from "../../../store/model.store";

const TabTwoSubOne = () => {
  const activeGrid = myStore((state) => state.activeGrid);
  const setActiveGrid = myStore((state) => state.setActiveGrid);
  const topColors = ["black", "gray", "white", "#69a4c9"];
  return (
    <div className="flex gap-4 mt-8 ml-8">
      {topColors.map((color) => (
        <div
          key={color}
          onClick={() => setActiveGrid(color)}
          style={{ backgroundColor: color }}
          className={`w-8 h-8 rounded-full cursor-pointer select-none transition-all
                ${
                  activeGrid === color
                    ? "border-2 border-[#ccc] scale-110"
                    : "border-white"
                }`}
        />
      ))}
    </div>
  );
};

export default TabTwoSubOne;

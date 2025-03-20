import useStore from "../../../store/model.store";

const ButtonOne = ({ openColors }) => {
  const topColors = ["black", "gray", "white", "blue"];
  const activeGrid = useStore((state) => state.activeGrid);
  const setActiveGrid = useStore((state) => state.setActiveGrid);

  return (
    <div
      className={`absolute left-16 bg-gradient-to-tr from-[#3c3c3c] to-[#1c1c1c] p-4 pl-10 pr-4 rounded-r-xl flex gap-4 transition-all duration-300 ease-in-out
        ${
          openColors
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full pointer-events-none"
        }`}
    >
      {topColors.map((color) => (
        <div
          key={color}
          onClick={() => setActiveGrid(color)} // ✅ This now updates Zustand
          style={{ backgroundColor: color }}
          className={`w-8 h-8 rounded-full cursor-pointer ${
            activeGrid === color
              ? "  border-2 border-[#ccc] scale-110"
              : "border-white"
          } transition-all`}
        />
      ))}
    </div>
  );
};

export default ButtonOne;

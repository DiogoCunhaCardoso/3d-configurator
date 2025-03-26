import myStore from "../../../store/model.store";

const TabTwoSubThree = () => {
  const interiorColor = myStore((state) => state.interiorColor);
  const setInteriorColor = myStore((state) => state.setInteriorColor);

  return (
    <div className="mt-8 ml-8">
      <label
        className="w-8 h-8 rounded-full cursor-pointer border-2 border-white flex items-center justify-center"
        style={{ backgroundColor: interiorColor }}
      >
        <input
          type="color"
          onChange={(e) => setInteriorColor(e.target.value)}
          className="absolute opacity-0 w-8 h-8 cursor-pointer"
        />
      </label>
    </div>
  );
};

export default TabTwoSubThree;

const ButtonThree = ({
  openColorPicker,
  colorInputRef,
  handleColorSelect,
  interiorColor,
}) => {
  return (
    <div
      className={`absolute left-16 bg-gradient-to-tr from-[#3c3c3c] to-[#1c1c1c] p-4 pl-10 rounded-r-xl flex gap-4 transition-all duration-300 ease-in-out
        ${
          openColorPicker
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full pointer-events-none"
        }`}
    >
      <div
        onClick={() => colorInputRef.current.click()}
        style={{ backgroundColor: interiorColor }}
        className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
      />
      <input
        type="color"
        ref={colorInputRef}
        onChange={handleColorSelect}
        className="absolute opacity-0 w-8 h-8 cursor-pointer"
      />
    </div>
  );
};

export default ButtonThree;

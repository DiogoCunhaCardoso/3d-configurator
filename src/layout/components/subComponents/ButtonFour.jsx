import useStore from "../../../store/model.store";

const ButtonFour = ({ openRadio }) => {
  const topTexture = useStore((state) => state.activeTopTexture);
  const setTopTexture = useStore((state) => state.setActiveTopTexture);
  return (
    <div
      className={`absolute left-16 bg-gradient-to-tr from-[#3c3c3c] to-[#1c1c1c] p-4 pl-20 rounded-r-xl flex gap-4 transition-all duration-300 ease-in-out
        ${
          openRadio
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full pointer-events-none"
        }`}
    >
      <input
        type="radio"
        name="texture-1"
        id="texture1-1"
        className="w-6 h-6 cursor-pointer"
        checked={topTexture === 0}
        onChange={() => setTopTexture(0)}
      />
      <input
        type="radio"
        name="texture-1"
        id="texture2-1"
        className="w-6 h-6 cursor-pointer"
        checked={topTexture === 1}
        onChange={() => setTopTexture(1)}
      />
    </div>
  );
};

export default ButtonFour;

import useStore from "../../../store/model.store";

const ButtonFour = ({ openRadio }) => {
  const topTexture = useStore((state) => state.activeTopTexture);
  const setTopTexture = useStore((state) => state.setActiveTopTexture);

  const textures = [
    { src: "./buttonOneTextureOne.jpeg", id: 0 },
    { src: "./buttonOneTextureTwo.jpeg", id: 1 },
  ];

  return (
    <div
      className={`absolute left-16 bg-gradient-to-tr from-[#3c3c3c] to-[#1c1c1c] p-4 pl-20 rounded-r-xl flex gap-4 transition-all duration-300 ease-in-out
        ${
          openRadio
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full pointer-events-none"
        }`}
    >
      {textures.map((texture) => (
        <div key={texture.id} className="w-8 h-8 select-none">
          <img
            src={texture.src}
            alt={`Texture ${texture.id}`}
            onClick={() => setTopTexture(texture.id)}
            className={`w-full h-full rounded-full cursor-pointer select-none object-cover transition-all
              ${
                topTexture === texture.id
                  ? "border-2 border-[#ccc] scale-110"
                  : "border-white"
              }`}
          />
        </div>
      ))}
    </div>
  );
};

export default ButtonFour;

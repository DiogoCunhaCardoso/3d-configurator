import { useState } from "react";
import myStore from "../../../store/model.store";

const TabTwoSubFour = () => {
  const topTexture = myStore((state) => state.activeTopTexture);
  const setTopTexture = myStore((state) => state.setActiveTopTexture);

  const textures = [
    { src: "./buttonOneTextureOne.jpeg", id: 0 },
    { src: "./buttonOneTextureTwo.jpeg", id: 1 },
  ];

  return (
    <div className="flex gap-4 mt-8 ml-8">
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

export default TabTwoSubFour;

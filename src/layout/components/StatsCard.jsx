import myStore from "../../store/model.store";
import { useState } from "react";

const StatusCard = ({ acessoriosExtra = "-" }) => {
  const [showPopup, setShowPopup] = useState(false);

  const selectedTopTexture = myStore((state) => state.activeTopTexture);
  const interiorColor = myStore((state) => state.interiorColor);

  const activePreset = myStore((state) => state.activePreset);
  const presets = myStore((state) => state.presets);
  const activeFrontTexture =
    presets[activePreset] && presets[activePreset].activeFrontTexture;

  // Check if activeFrontTexture is null or undefined, then set it to "Vinyl"
  const designExterior = activeFrontTexture
    ? activeFrontTexture.startsWith("materials.")
      ? activeFrontTexture.split(".")[1]?.[0].toUpperCase() +
        activeFrontTexture.split(".")[1]?.slice(1)
      : "Personalizado"
    : "Vinyl";

  const textureName = selectedTopTexture === 0 ? "Madeira" : "Polipropeno";
  const cubaInterior = selectedTopTexture === 0 ? "Madeira" : "Polipropeno";

  const selectedAccessories = myStore((state) => state.selectedAccessories);
  const formattedAccessories = selectedAccessories.length
    ? selectedAccessories.join(", ")
    : acessoriosExtra;

  const handleOrcamentoClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="w-[240px] min-h-[360px] bg-gradient-to-tr from-[#3c3c3c] to-[#1c1c1c] p-5 rounded-2xl flex flex-col justify-between shadow-2xl shadow-black">
      <div>
        {/* Title */}
        <h3 className="text-center text-[#2596be] mb-6 font-semibold">
          YOUR <span className="text-white">PRODUCT</span>
        </h3>

        {/* Content */}
        <div className="text-white flex flex-col gap-3">
          {/* Design Exterior */}
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm">DESIGN EXTERIOR:</p>
            <strong className="text-end text-sm">{designExterior}</strong>
          </div>

          {/* Cuba Interior */}
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm">CUBA INTERIOR:</p>
            <strong className="text-end text-sm">{interiorColor}</strong>
          </div>

          {/* Tampa */}
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm">TAMPA:</p>
            <strong className="text-end text-sm">{`${textureName}`}</strong>
          </div>

          {/* Acessórios Extra */}
          <div className="flex justify-between  gap-2">
            <p className="text-sm">
              ACESSÓRIOS <br /> EXTRA:
            </p>
            <strong className="text-end text-sm">{formattedAccessories}</strong>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        className="mt-12 px-4 py-2 bg-gradient-to-r from-[#2591b7] to-[#1a6883] text-white rounded-3xl font-bold shadow-lg hover:scale-105 transition-transform"
        onClick={handleOrcamentoClick}
      >
        PEDIR ORÇAMENTO
      </button>

      {/* Fake Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-xl font-bold text-gray-900">
              Pedido de Orçamento
            </h2>
            <p className="text-gray-700 mt-2">Pedido foi gerado com sucesso!</p>

            <div className="bg-gray-100 p-3 mt-4 rounded-lg text-sm text-gray-800">
              <p>
                <strong>Design Exterior:</strong> {designExterior}
              </p>
              <p>
                <strong>Cuba Interior:</strong> {cubaInterior}
              </p>
              <p>
                <strong>Tampa:</strong> {textureName}, Grelha de Respiro
              </p>
              <p>
                <strong>Acessórios:</strong> {formattedAccessories}
              </p>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold shadow-md hover:bg-blue-600"
              onClick={() => setShowPopup(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusCard;

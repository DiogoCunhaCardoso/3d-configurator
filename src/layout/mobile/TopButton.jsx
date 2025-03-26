import { useState } from "react";
import myStore from "../../store/model.store";
const TopButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  // STORE

  const activeFrontTexture = myStore((state) => state.activeFrontTexture);
  const activeTopTexture = myStore((state) => state.activeTopTexture);
  const activeGrid = myStore((state) => state.activeGrid);

  // GET NAMES

  const cardInfo = {
    designExterior: activeFrontTexture
      ? activeFrontTexture.startsWith("materials.")
        ? activeFrontTexture.split(".")[1]
        : "Personalizado"
      : "vynil",
    cubaInterior: "cubaInterior",
    tampa: activeTopTexture === 0 ? "Madeira" : "Polipropeno",
    grelhaDeRespiro:
      activeGrid === "black"
        ? "Preto"
        : activeGrid === "gray"
        ? "Cinza"
        : activeGrid === "white"
        ? "Branco"
        : "Azul",
    acessoriosExtra: "acessoriosExtra",
  };

  return (
    <>
      {/* Button */}
      <div className="lg:hidden fixed top-5 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto">
        <button
          className="text-sm px-4 py-2 bg-gradient-to-r from-[#2591b7] to-[#1a6883] text-white rounded-3xl font-bold shadow-lg hover:scale-105 transition-transform"
          onClick={() => setShowPopup(true)}
        >
          PEDIR ORÇAMENTO
        </button>
      </div>

      {/* Overlay Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gradient-to-tr from-slate-300 to-slate-100 p-6 rounded-lg w-80">
            <p
              className="pointer-events-auto mb-4 cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              fechar
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Confirmar Pedido
            </h3>

            <Row title={"Design Exterior"} content={cardInfo.designExterior} />
            <Row title={"Cuba Interior"} content={cardInfo.cubaInterior} />
            <Row title={"Tampa"} content={cardInfo.tampa} />
            <Row
              title={"Grelha de Respiro"}
              content={cardInfo.grelhaDeRespiro}
            />
            <Row
              title={"Acessórios Extra"}
              content={cardInfo.acessoriosExtra}
            />

            <div className="flex justify-center mt-8 pointer-events-auto">
              <button
                className="text-sm w-full max-w-48 py-2 bg-gradient-to-r from-[#2591b7] to-[#1a6883] text-white rounded-3xl font-bold shadow-lg hover:scale-105 transition-transform"
                onClick={() => setShowPopup(false)}
              >
                ENVIAR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopButton;

const Row = ({ title, content }) => {
  return (
    <span className="flex justify-between mb-3">
      <p>{title}:</p>
      <p className="font-medium text-end">{content}</p>
    </span>
  );
};

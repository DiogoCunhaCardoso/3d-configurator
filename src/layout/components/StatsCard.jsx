import useStore from "../../store/model.store";

const StatusCard = ({
  designExterior = "Personalizado",
  cubaInterior = "Preta",
  acessoriosExtra = "-",
}) => {
  const selectedTopTexture = useStore((state) => state.activeTopTexture);
  const textureName = selectedTopTexture === 0 ? "madeira" : "polipropeno";

  const selectedAccessories = useStore((state) => state.selectedAccessories);
  const formattedAccessories = selectedAccessories.join(", ");

  return (
    <div className="w-[240px] bg-gradient-to-tr from-[#3c3c3c] to-[#1c1c1c] p-5 rounded-2xl flex flex-col justify-between shadow-2xl shadow-black">
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
            <strong className="text-end text-sm">{cubaInterior}</strong>
          </div>

          {/* Tampa */}
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm">TAMPA:</p>
            <strong className="text-end text-sm">{`${textureName}, Grelha de Respiro`}</strong>
          </div>

          {/* Acessórios Extra */}
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm">Acessórios Extra:</p>
            <strong className="text-end text-sm">
              {formattedAccessories || acessoriosExtra}
            </strong>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        className="mt-12 px-4 py-2 bg-gradient-to-r bg-slate-900 text-white rounded-3xl  font-bold shadow-lg"
        onClick={() => alert("Pedir Orçamento clicked!")} // Example action
      >
        PEDIR ORÇAMENTO
      </button>
    </div>
  );
};

export default StatusCard;

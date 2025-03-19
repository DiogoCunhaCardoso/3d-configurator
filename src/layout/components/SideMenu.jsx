import { useState } from "react";
import useStore from "../../store/model.store";

const buttons = [
  {
    icon: <img src="/menu1.svg" className="w-16 h-16" />,
    hoverIcon: <img src="/menu1Selected.svg" className="w-16 h-16" />,
    label: "Grelha Lateral",
  },
  {
    icon: <img src="/menu2.svg" className="w-16 h-16" />,
    hoverIcon: <img src="/menu2Selected.svg" className="w-16 h-16" />,
    label: "Design Exterior",
  },
  {
    icon: <img src="/menu3.svg" className="w-16 h-16" />,
    hoverIcon: <img src="/menu3Selected.svg" className="w-16 h-16" />,
    label: "Cuba Interior",
  },
  {
    icon: <img src="/menu4.svg" className="w-16 h-16" />,
    hoverIcon: <img src="/menu4Selected.svg" className="w-16 h-16" />,
    label: "Tampa",
  },
];

const SideMenu = () => {
  const [hovered, setHovered] = useState(null);
  const [openRadio, setOpenRadio] = useState(false);

  // Zustand store values
  const activeTopTexture = useStore((state) => state.activeTopTexture);
  const setActiveTopTexture = useStore((state) => state.setActiveTopTexture);

  const setActiveFrontTexture = useStore(
    (state) => state.setActiveFrontTexture
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        console.log("Base64 Image:", base64Image);
        setActiveFrontTexture(base64Image); // Store image in Zustand
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (index) => {
    switch (index) {
      case 0:
        console.log("clicked button 1");
        break;
      case 1:
        console.log("clicked button 2");
        break;
      case 2:
        document.getElementById("file-upload").click();
        break;
      case 3:
        setOpenRadio((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative flex justify-center flex-col gap-8">
      <img
        src="./linha.png"
        alt="Linha Background"
        className="absolute -right-24 mt-12 scale-[0.65] object-contain pointer-events-none"
      />
      {buttons.map((btn, index) => (
        <div
          key={index}
          className={`relative flex items-center gap-3 ${
            index === 0 || index === 3 ? "ml-8" : ""
          }`}
        >
          {/* Button Label */}
          <div className="text-[#fff] text-end w-32">
            <p className="text-[14px] leading-[20px]">
              Componente <br />
              <span className="font-[700] text-[#2596be]">{btn.label}</span>
            </p>
          </div>

          {/* Button + Radio Wrapper */}
          <div className="relative flex items-center">
            {/* Icon Button */}
            <div
              className="cursor-pointer transition-transform duration-200"
              style={{
                transform: hovered === index ? "scale(1.15)" : "scale(1)",
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleButtonClick(index)}
            >
              {hovered === index ? btn.hoverIcon : btn.icon}
            </div>

            {/* Hidden File Input (Triggered Automatically) */}
            {index === 2 && (
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            )}

            {/* Radio Buttons - For Button 3 */}
            {index === 3 && (
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
                  checked={activeTopTexture === 0}
                  onChange={() => setActiveTopTexture(0)}
                />
                <input
                  type="radio"
                  name="texture-1"
                  id="texture2-1"
                  className="w-6 h-6 cursor-pointer"
                  checked={activeTopTexture === 1}
                  onChange={() => setActiveTopTexture(1)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideMenu;

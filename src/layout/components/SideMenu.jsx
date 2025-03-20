import { useState, useRef } from "react";
import useStore from "../../store/model.store";
import CropperOverlay from "./CropperOverlay";
import ButtonOne from "./subComponents/ButtonOne";
import ButtonTwo from "./subComponents/ButtonTwo";
import ButtonThree from "./subComponents/ButtonThree";
import ButtonFour from "./subComponents/ButtonFour";

const SideMenu = () => {
  const [hovered, setHovered] = useState(null);
  const [openColors, setOpenColors] = useState(false);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [openRadio, setOpenRadio] = useState(false);

  const [openCrop, setOpenCrop] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const interiorColor = useStore((state) => state.interiorColor);
  const setFrontTexture = useStore((state) => state.setActiveFrontTexture);
  const setInteriorColor = useStore((state) => state.setInteriorColor);

  const setIsInteriorShowing = useStore((state) => state.setIsInteriorShowing);

  const fileInputRef = useRef(null);
  const colorInputRef = useRef(null);

  const labels = [
    "Grelha Lateral",
    "Design Exterior",
    "Cuba Interior",
    "Tampa",
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setOpenCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorSelect = (event) => {
    const color = event.target.value;
    setInteriorColor(color); // ✅ Update Zustand state instead of selectedTopColor
  };

  const handleButtonClick = (index) => {
    switch (index) {
      case 0:
        setOpenColors((prev) => !prev);
        break;
      case 1:
        fileInputRef.current.click();
        break;
      case 2:
        setIsInteriorShowing(); // ✅ This was missing!
        setOpenColorPicker((prev) => !prev);
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

      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className={`relative flex items-center gap-3 ${
            index === 0 || index === 3 ? "ml-8" : ""
          }`}
        >
          <div className="text-[#fff] text-end w-32">
            <p className="text-[14px] leading-[20px]">
              Componente <br />
              <span className="font-[700] text-[#2596be]">{labels[index]}</span>
            </p>
          </div>

          <div className="relative flex items-center">
            <div
              className="cursor-pointer transition-transform duration-200"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleButtonClick(index)}
            >
              {hovered === index ? (
                <img
                  src={`/menu${index + 1}Selected.svg`}
                  className="w-16 h-16"
                />
              ) : (
                <img src={`/menu${index + 1}.svg`} className="w-16 h-16" />
              )}
            </div>

            {index === 0 && (
              <ButtonOne
                {...{
                  openColors,
                }}
              />
            )}
            {index === 1 && (
              <ButtonTwo {...{ fileInputRef, handleFileUpload }} />
            )}
            {index === 2 && (
              <ButtonThree
                {...{
                  openColorPicker,
                  colorInputRef,
                  handleColorSelect,
                  interiorColor,
                }}
              />
            )}
            {index === 3 && <ButtonFour {...{ openRadio }} />}
          </div>
        </div>
      ))}

      {/* ✅ Cropper Overlay */}
      {openCrop && (
        <CropperOverlay
          imageSrc={imageSrc}
          onSave={(croppedImage) => {
            setFrontTexture(croppedImage);
            setOpenCrop(false);
          }}
          onCancel={() => setOpenCrop(false)}
          aspectRatio={1.8 / 0.8}
        />
      )}
    </div>
  );
};

export default SideMenu;

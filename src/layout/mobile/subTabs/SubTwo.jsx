import { useState, useRef } from "react";
import myStore from "../../../store/model.store";
import CropperOverlay from "../../components/CropperOverlay";

const TabTwoSubTwo = () => {
  const fileInputRef = useRef(null);
  const setFrontTexture = myStore((state) => state.setActiveFrontTexture);
  const [imageSrc, setImageSrc] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

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

  return (
    <div className="mt-8 ml-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
      />
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

export default TabTwoSubTwo;

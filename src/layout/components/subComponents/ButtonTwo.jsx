const ButtonTwo = ({ fileInputRef, handleFileUpload }) => {
  return (
    <input
      ref={fileInputRef}
      type="file"
      className="hidden"
      accept="image/*"
      onChange={handleFileUpload}
    />
  );
};

export default ButtonTwo;

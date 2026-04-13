import React from "react";

const ImagePreview = ({ file }) => {
  if (!file) return null;

  const imageUrl = URL.createObjectURL(file);

  return (
    <div style={{ margin: "10px 0" }}>
      <img
        src={imageUrl}
        alt="preview"
        width="200"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default ImagePreview;
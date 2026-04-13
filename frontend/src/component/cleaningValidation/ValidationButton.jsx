import React from "react";

const ValidateButton = ({ onClick, loading }) => {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? "Checking..." : "Validate Cleaning"}
    </button>
  );
};

export default ValidateButton;
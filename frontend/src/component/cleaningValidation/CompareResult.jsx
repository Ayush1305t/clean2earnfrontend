import React from "react";

const CompareResult = ({ result }) => {
  if (!result) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Result: {result}</h3>
    </div>
  );
};

export default CompareResult;
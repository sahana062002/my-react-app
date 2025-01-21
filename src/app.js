import React from "react";

function App() {
  // Button click handler
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Simple React Button Example</h1>
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default app;

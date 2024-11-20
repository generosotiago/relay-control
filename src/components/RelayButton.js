import React from "react";

const RelayButton = ({ isOn, onClick, disabled }) => {
  return (
    <button
      className={`relay-button ${isOn ? "active" : "inactive"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isOn ? " Ligar" : "Desligar"}
    </button>
  );
};

export default RelayButton;

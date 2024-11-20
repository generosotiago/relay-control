import React, { useEffect, useState } from "react";
import "./SidebarModal.css";

const SidebarModal = ({ isOpen, onClose }) => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Detectar cliques fora do modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("sidebar-modal")) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleSend = async () => { 
    const wifiConfig = {
      SSID: ssid,
      Password: password,
    };

    try {
      const response = await fetch("http://SEU_DISPOSITIVO_IP/config", { // Substitua pelo IP ou URL do dispositivo
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wifiConfig),
      });

      if (response.ok) {
        alert("Configurações enviadas com sucesso!");
      } else {
        alert(`Erro ao enviar configurações: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao enviar configurações. Verifique a conexão.");
    }

    console.log("Enviando JSON:", wifiConfig);
    onClose(); // Fechar o modal após envio
  };

  return (
    <div className={`sidebar-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Configurar Rede Wi-Fi</h2>
        <label>
          Nome da Rede (SSID):
          <input
            type="text"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="Digite o nome da rede"
          />
        </label>
        <label>
          Senha:
          <input
            type={showPassword ? "text" : "password"} // Alternar entre password e text
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha"
          />
        </label>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="show-password">Mostrar senha</label>
        </div>
        <button className="send-btn" onClick={handleSend}>
          Enviar Dados
        </button>
      </div>
    </div>
  );
};

export default SidebarModal;
import React, { useState, useEffect } from "react";
import RelayButton from "./RelayButton";
import "./RelayControl.css";

const RelayControl = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const wsUrl = "ws://192.168.68.135:81/";
  const [websocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      console.log("Conexão estabelecida com o WebSocket.");
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("Conexão encerrada com o WebSocket.");
    };

    ws.onerror = (error) => {
      console.error("Erro na conexão WebSocket:", error);
    };

    ws.onmessage = (event) => {
      console.log("Mensagem recebida do WebSocket:", event.data);
    };

    setWebSocket(ws);

    return () => {
      if (ws) {
        ws.close();
        console.log("Conexão WebSocket encerrada.");
      }
    };
  }, []);

  const handleToggle = () => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      const command = isOn ? { relay: "off" } : { relay: "on" };
      websocket.send(JSON.stringify(command));
      console.log("Comando enviado:", command);
      setIsOn(!isOn);
    } else {
      console.warn("WebSocket não está conectado.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Controle de Luz da Nave</h1>
      <RelayButton 
        isOn={isOn} 
        onClick={handleToggle} 
        disabled={!isConnected} 
      />

      <div className="connection-status">
        <span
          className={`status-bubble ${isConnected ? "connected" : "disconnected"}`}
        ></span>
        <span>{isConnected ? "Conectado" : "Desconectado"}</span>
      </div>
    </div>
  );
};

export default RelayControl;

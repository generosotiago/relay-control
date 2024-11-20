import React from "react";
import Header from "./components/Header"; // Importa o cabeçalho
import RelayControl from "./components/RelayControl"; // Importa o controle do relé

function App() {
  return (
    <div className="App">
      <Header /> {/* Cabeçalho */}
      <RelayControl /> {/* Componente de controle de relé */}
    </div>
  );
}

export default App;

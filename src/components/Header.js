import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/images.png";
import SidebarModal from "./SidebarModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 id="title">Vida Nova Dev</h1>
        <nav className="nav">
          <a href="#home" onClick={toggleModal}>Configurar Wi-Fi</a>
        </nav>
      </header>
      <SidebarModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default Header;

import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">

      <a href="/inicio" className="logo-link">
        <img 
          src="https://i.pinimg.com/1200x/b7/5b/29/b75b29441bbd967deda4365441497221.jpg"  // só imagem dexemplo
          alt="Logo do Anjos Urbanos" 
          className="header-logo"
        />
      </a>

      <input type="text" placeholder="Pesquisar sobre..." className="search-bar" />
      <nav>
        <a href="/inicio">INÍCIO</a>
        <a href="/Mensagem">MENSAGENS</a>
        <a href="/Notificações">NOTIFICAÇÕES</a>
      </nav>
    </header>
  );
}

export default Header;


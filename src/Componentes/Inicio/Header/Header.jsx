import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <input type="text" placeholder="Pesquisar sobre..." className="search-bar" />
      <nav>
        <a href="/inicio">INÍCIO</a>
        {/* <a href="/sobre">Serviços</a> */}
        <a href="/Mensagem">MENSAGENS</a>
        <a href="/Notificações">NOTIFICAÇÕES</a>
      </nav>
    </header>
  );
}

export default Header;

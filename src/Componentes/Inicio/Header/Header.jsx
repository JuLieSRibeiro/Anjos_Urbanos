import React from 'react';
import './Header.css';
import { Link, useNavigate }
from 'react-router-dom';

function Header() {
  const navigate = useNavigate();//nesse trabalho a gnt tá usando link para navegação e usenavegate pra logout

  const handleLogout = () => {
    console.log("Usuário deslogado.");
    navigate('/'); 
  };

  return (
    <header className="header">
      
    
      <Link to="/feed" className="header-logo-link">
        <img 
          src="/logo-anjos-urbanos.png" 
          alt="Logo Anjos Urbanos" 
          className="header-logo"
        />
      </Link>
      

      <nav className="header-nav">
        
        <Link to="/feed" className="nav-link">
          Feed
        </Link>
        <Link to="/mensagens" className="nav-link">
          Mensagens
        </Link>
        <Link to="/notificacoes" className="nav-link">
          Notificações
        </Link>
        <Link to="/perfil" className="nav-link">
          Perfil
        </Link>
        
        <button onClick={handleLogout} className="nav-button logout-button">
          Log out
        </button>
      </nav>

    </header>
  );
}

export default Header;
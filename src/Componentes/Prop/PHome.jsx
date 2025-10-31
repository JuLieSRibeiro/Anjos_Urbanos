import React from 'react';
// Importamos o Link e o useNavigate para a navegação
import { Link, useNavigate } from 'react-router-dom';
import './PHome.css'; // Vamos criar este arquivo de estilo

function PHome() {
  // O useNavigate é ótimo para ações de botões
  const navigate = useNavigate();

  // Função que será chamada ao clicar no botão principal
  const handleComeceAjudar = () => {
    navigate('/login'); 
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Logo</div>
        <nav>
          {/* Link para a página de cadastro */}
          <Link to="/cadastro" className="nav-link signup-link">
            sign up
          </Link>
          {/* Link para a página de login  */}
          <Link to="/login" className="nav-link login-button">
            Login
          </Link>
        </nav>
      </header>

      <main className="home-main">
        <h1>Anjos Urbanos conectando quem precisa a quem pode ajudar.</h1>
        <p>Uma rede de apoio feita para ajudar e receber acolhimento e contruir laços.</p>
        
        {/* Botão que chama a função de navegação */}
        <button onClick={handleComeceAjudar} className="cta-button">
          Comece ajudar!
        </button>
      </main>
    </div>
  );
}

export default PHome;
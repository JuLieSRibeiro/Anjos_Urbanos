
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PHome.css'; 

function PHome() {
  const navigate = useNavigate();

  const handleComeceAjudar = () => {
    navigate('/login'); 
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Logo</div>
        <nav>
          <Link to="/cadastro" className="nav-link signup-link">
            sign up
          </Link>
          <Link to="/login" className="nav-link login-button">
            Login
          </Link>
        </nav>
      </header>

      <main className="home-main">
        
        <div className="home-text-content">
          <h1>Anjos Urbanos conectando quem precisa a quem pode ajudar.</h1>
          <p>Uma rede de apoio feita para ajudar e receber acolhimento e contruir laços.</p>
          <button onClick={handleComeceAjudar} className="cta-button">
            Comece ajudar!
          </button>
        </div>

        <div className="home-image-content">
          <img 
            src="/PropImgC3.png" 
            alt="Um pequeno gesto, uma grande mudança" 
          />
        </div>

      </main>
    </div>
  );
}

export default PHome;

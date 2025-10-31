import React from 'react';
import './LoginStyle.css';
import { Link } from 'react-router-dom'; // <-- Importe o Link

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <p>Preencha seus dados:</p>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" />
          </div>
          <button type="submit" className="login-button">Logar</button>
        </form>
        <a href="#" className="forgot-password">Esqueci a senha.</a>
        <p className="signup-link">
          Não tem uma conta?{' '}
          {/* Mude de <a> para <Link> para uma navegação mais rápida */}
          <Link to="/cadastro">Cadastre-se</Link> 
        </p>
      </div>
    </div>
  );
}

export default Login;
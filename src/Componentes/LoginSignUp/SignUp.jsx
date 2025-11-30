// src/Componentes/LoginSignUp/SignUp.jsx

// 1. Importe 'useState' para controlar o formulário
import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './SignUpStyle.css'; 

// 2. Importe o nosso novo serviço de autenticação
import authService from '../../services/authService';

function SignUp() {
  
  const navigate = useNavigate();

  // 3. Crie um 'useState' para CADA CAMPO do formulário
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    estado: '',
    cidade: '',
    email: '',
    senha: '',
    senhaRepetida: ''
  });

  // 4. Crie estados para 'error' (erro) e 'loading' (carregando)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 5. Função 'onChange' genérica para atualizar o estado 'formData'
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // 6. ATUALIZE A FUNÇÃO 'handleSubmit'
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento
    setError(null); // Limpa erros antigos

    // 7. Validação de senha no frontend
    if (formData.senha !== formData.senhaRepetida) {
      setError("As senhas não coincidem!");
      return;
    }

    setLoading(true); // Ativa o "carregando"

    try {
      // 8. CHAMA A API DO BACKEND
      const response = await authService.register(
        `${formData.nome} ${formData.sobrenome}`, // Junta nome e sobrenome
        formData.email,
        formData.senha,
        `${formData.cidade} - ${formData.estado}` // Junta cidade e estado
      );

      // 9. SE TIVER SUCESSO (Backend respondeu)
      if (response.data && response.data.token) {
        // 10. SALVA O "PASSE DE LOGIN" (TOKEN) NO NAVEGADOR
        //    Isto é o que "mantém o usuário logado"
        localStorage.setItem('userToken', response.data.token);
        
        setLoading(false);
        alert("Cadastro realizado com sucesso!");
        navigate('/feed'); // Redireciona para o feed
      }

    } catch (err) {
      // 11. SE O BACKEND DER ERRO (ex: "Usuário já existe")
      const errorMessage = err.response?.data?.message || "Ocorreu um erro no cadastro.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form-wrapper">

        <Link to="/login" className="back-link">‹ Voltar para o Login</Link>

        <h1>Cadastro</h1>
        
        {/* 12. Mostra a mensagem de erro, se ela existir */}
        {error && <p className="form-error-message">{error}</p>}

        {/* 13. Conecta o 'onSubmit' e os inputs ao 'useState' */}
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="primeiro-nome">Primeiro nome:</label>
            <input 
              type="text" 
              id="primeiro-nome" 
              name="nome" // O 'name' deve ser igual à chave no 'useState'
              value={formData.nome} // Amarrado ao estado
              onChange={onChange} // Amarrado à função
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input 
              type="text" 
              id="sobrenome" 
              name="sobrenome" 
              value={formData.sobrenome}
              onChange={onChange}
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="estado">Estado (sigla):</label>
              <input 
                type="text" 
                id="estado" 
                name="estado" 
                value={formData.estado}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cidade">Cidade:</label>
              <input 
                type="text" 
                id="cidade" 
                name="cidade" 
                value={formData.cidade}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={onChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              value={formData.senha}
              onChange={onChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="repetir-senha">Repetir senha:</label>
            <input 
              type="password" 
              id="repetir-senha" 
              name="senhaRepetida" 
              value={formData.senhaRepetida}
              onChange={onChange}
              required 
            />
          </div>

           {/* ... Checkboxes ... */}
           <div className="checkbox-group">
             <input type="checkbox" id="terms-consent" name="terms-consent" required />
             <label htmlFor="terms-consent">
               <b>Eu li e concordo com os Termos de Uso</b>
             </label>
           </div>
          
          {/* 14. Desabilita o botão enquanto estiver "carregando" */}
          <button type="submit" className="cadastro-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default SignUp;
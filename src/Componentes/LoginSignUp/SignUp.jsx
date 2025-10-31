// import React from 'react';
// import { Link } from 'react-router-dom'; 
// import './SignUpStyle.css'; 

// function SignUp() {
//    return (
//     <div className="cadastro-container">
//       <div className="cadastro-form-wrapper">

//          <Link to="/login" className="back-link">‹ Voltar para o Login</Link>

//        <h1>Cadastro</h1>
//        <form>
         
//          <div className="form-group">
//            <label htmlFor="primeiro-nome">Primeiro nome:</label>
//            <input type="text" id="primeiro-nome" name="primeiro-nome" />
//          </div>

//          <div className="form-group">
//            <label htmlFor="sobrenome">Sobrenome:</label>
//            <input type="text" id="sobrenome" name="sobrenome" />
//          </div>

//          <div className="form-row">
//            <div className="form-group half-width">
//              <label htmlFor="estado">Estado a onde vive:</label>
//              <input type="text" id="estado" name="estado" />
//            </div>
//            <div className="form-group half-width">
//              <label htmlFor="cidade">Cidade a onde vive:</label>
//              <input type="text" id="cidade" name="cidade" />
//            </div>
//          </div>

//          <div className="form-group">
//            <label htmlFor="email">Email:</label>
//            <input type="email" id="email" name="email" />
//          </div>

//          <div className="form-group">
//            <label htmlFor="senha">Senha:</label>
//            <input type="password" id="senha" name="senha" />
//          </div>

//          <div className="form-group">
//            <label htmlFor="repetir-senha">Repetir senha:</label>
//            <input type="password" id="repetir-senha" name="repetir-senha" />
//          </div>

//          <div className="checkbox-group">
//            <input type="checkbox" id="info-consent" name="info-consent" />
//            <label htmlFor="info-consent">
//              As informações fornecidas são utilizadas apenas para viabilizar o funcionamento da Plataforma e não serão compartilhadas com terceiros sem o devido consentimento.
//            </label>
//          </div>

//          <div className="checkbox-group">
//            <input type="checkbox" id="ethics-consent" name="ethics-consent" />
//            <label htmlFor="ethics-consent">
//              O usuário compromete-se a utilizar a Plataforma de forma ética e responsável, abstendo-se de publicar conteúdo ofensivo, discriminatório, violento, divulgando mensagens de ódio, assédio, ameaças ou incentivo a práticas criminosas.
//            </label>
//          </div>
         
//          <div className="checkbox-group">
//            <input type="checkbox" id="terms-consent" name="terms-consent" />
//            <label htmlFor="terms-consent">
//              <b>Ao acessar ou utilizar nossos serviços, você declara que leu, compreendeu e concorda com os presentes Termos de Uso</b>
//            </label>
//          </div>

//          <button type="submit" className="cadastro-button">Cadastrar</button>
//        </form>
//      </div>
//    </div>
//  );
// }

// export default SignUp;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './SignUpStyle.css'; 

function SignUp() {
  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    
    event.preventDefault(); 
   
    console.log("Formulário enviado! (Simulação)");
    alert("Cadastro realizado com sucesso! Redirecionando para a página inicial...");

    navigate('/paginainicial'); 
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form-wrapper">

        <Link to="/login" className="back-link">‹ Voltar para o Login</Link>

        <h1>Cadastro</h1>
        
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="primeiro-nome">Primeiro nome:</label>
            <input type="text" id="primeiro-nome" name="primeiro-nome" required /> {/* Adicionei 'required' como boa prática */}
          </div>

          <div className="form-group">
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input type="text" id="sobrenome" name="sobrenome" required />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="estado">Estado a onde vive:</label>
              <input type="text" id="estado" name="estado" />
            </div>
            <div className="form-group half-width">
              <label htmlFor="cidade">Cidade a onde vive:</label>
              <input type="text" id="cidade" name="cidade" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required />
          </div>

          <div className="form-group">
            <label htmlFor="repetir-senha">Repetir senha:</label>
            <input type="password" id="repetir-senha" name="repetir-senha" required />
          </div>

           <div className="checkbox-group">
            <input type="checkbox" id="info-consent" name="info-consent" />
            <label htmlFor="info-consent">
              As informações fornecidas são utilizadas apenas para viabilizar o funcionamento da Plataforma e não serão compartilhadas com terceiros sem o devido consentimento.
            </label>
         </div>
          <div className="checkbox-group">
            <input type="checkbox" id="ethics-consent" name="ethics-consent" />
            <label htmlFor="ethics-consent">
              O usuário compromete-se a utilizar a Plataforma de forma ética e responsável, abstendo-se de publicar conteúdo ofensivo, discriminatório, violento, divulgando mensagens de ódio, assédio, ameaças ou incentivo a práticas criminosas.
            </label>
          </div>
         
          <div className="checkbox-group">
            <input type="checkbox" id="terms-consent" name="terms-consent" />
            <label htmlFor="terms-consent">
              <b>Ao acessar ou utilizar nossos serviços, você declara que leu, compreendeu e concorda com os presentes Termos de Uso</b>
            </label>
          </div>
          
          <button type="submit" className="cadastro-button">Cadastrar</button>
        </form>
        
      </div>
    </div>
  );
}

export default SignUp;
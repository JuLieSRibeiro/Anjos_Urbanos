// import React from 'react';
// import './PostItem.css';
// function PostItem({ nome, cidade, mensagem, botao, tags = [] }) {
//   return (
//     <div className="post">
//       <h4>{nome}</h4>
//       <p>{cidade}</p>
//       <p>{mensagem}</p>

//         <div className="tags">
//         {tags.map((tag, i) => (
//           <span key={i} className="tag">{tag}</span>
//         ))}
//         </div>

//         <div className="post-button">
//           <button>{botao}</button>
//         </div>
//     </div>
//   );
// }

// export default PostItem;



// import React from 'react';
// import './PostItem.css';

// function PostItem({ nome, cidade, mensagem, tags, botao }) {
//   return (
//     <div className="post-card">
      
//       {/* TAGS */}
//       <div className="post-tags">
//         {tags.map((tag, index) => (
//           <span key={index} className="tag-pill">{tag}</span>
//         ))}
//       </div>

//       {/* CONTEÚDO */}
//       <div className="post-content">
        
//         {/* IMAGEM / AVATAR */}
//         <div className="post-avatar"></div>

//         {/* TEXTO */}
//         <div className="post-text">
//           <h3>{nome}</h3>
//           <p className="cidade">📍 {cidade}</p>
//           <p className="mensagem">{mensagem}</p>
          
//           {/* Botão alinhado à direita */}
//           <div className="post-actions">
//             <button className="btn-comentar">{botao}</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PostItem;

import React from 'react';
import './PostItem.css';

function PostItem({ nome, cidade, mensagem, tags, botao }) {
  return (
<div className="post-card">
  {/* TAGS */}
  <div className="post-tags">
    {tags.map((tag, index) => (
      <span key={index} className="tag-pill">{tag}</span>
    ))}
  </div>

  {/* CONTEÚDO */}
  <div className="post-header">
    <img
      className="post-avatar"
      src="https://via.placeholder.com/60"  // depois substitui pela imagem de cada usuário
      alt="Foto de perfil"
    />
    <div className="post-user-info">
      <h3>{nome}</h3>
      <p className="cidade">📍 {cidade}</p>
    </div>
  </div>

  {/* MENSAGEM */}
  <p className="mensagem">{mensagem}</p>

  {/* BOTÃO */}
  <div className="post-actions">
    <button className="btn-comentar">{botao}</button>
  </div>
</div>
);
}
export default PostItem;
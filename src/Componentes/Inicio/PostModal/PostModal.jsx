// 1. Importe "useState"
import React, { useState } from 'react';
import './PostModal.css';

// 2. Receba a nova prop "onAddPost"
function PostModal({ onCloseModal, onAddPost }) {

  // 3. Crie estados para controlar os campos do formulário
  const [postType, setPostType] = useState('pedido'); // 'pedido' ou 'oferta'
  const [mensagem, setMensagem] = useState('');
  const [tags, setTags] = useState('');
  

  // 4. Modifique a função "handleSubmit"
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // 5. Validação simples (não deixa postar em branco)
    if (!mensagem.trim()) {
      alert("Por favor, escreva uma mensagem.");
      return;
    }

    // 6. Formata as tags (transforma "A, B, C" em ["#A", "#B", "#C"])
    const tagsArray = tags.split(',')
                          .map(tag => `#${tag.trim()}`) // Adiciona #
                          .filter(tag => tag !== '#'); // Remove tags vazias

    // 7. Chama a função "onAddPost" com os dados do estado
    onAddPost({
      type: postType,
      mensagem: mensagem,
      tags: tagsArray
    });
    
    // (A PaginaInicial vai fechar o modal, então não precisamos mais do onCloseModal() aqui)
  };

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>Criar Publicação</h2>
          <button onClick={onCloseModal} className="modal-close-button">×</button>
        </div>
        
        {/* 8. Conecte o formulário aos estados */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            {/* TIPO */}
            <div className="form-group">
              <label>O que você deseja fazer?</label>
              <div className="type-options">
                <label>
                  <input 
                    type="radio" name="postType" value="pedido" 
                    checked={postType === 'pedido'} // Controlado
                    onChange={(e) => setPostType(e.target.value)} // Controlado
                  />
                  Preciso de Ajuda (Pedido)
                </label>
                <label>
                  <input 
                    type="radio" name="postType" value="oferta" 
                    checked={postType === 'oferta'} // Controlado
                    onChange={(e) => setPostType(e.target.value)} // Controlado
                  />
                  Quero Ajudar (Oferta)
                </label>
              </div>
            </div>

            {/* MENSAGEM */}
            <div className="form-group">
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea
                id="mensagem"
                placeholder="Descreva seu pedido ou sua oferta de ajuda..."
                rows="5"
                value={mensagem} // Controlado
                onChange={(e) => setMensagem(e.target.value)} // Controlado
                required // Adiciona validação HTML
              ></textarea>
            </div>

            {/* TAGS */}
            <div className="form-group">
              <label htmlFor="tags">Tags (separadas por vírgula):</label>
              <input
                type="text"
                id="tags"
                placeholder="Ex: Alimentos, Roupas, Trabalho"
                value={tags} // Controlado
                onChange={(e) => setTags(e.target.value)} // Controlado
              />
            </div>
            
          </div>
          
          <div className="modal-footer">
            <button type="submit" className="modal-publish-button">Publicar</button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default PostModal;
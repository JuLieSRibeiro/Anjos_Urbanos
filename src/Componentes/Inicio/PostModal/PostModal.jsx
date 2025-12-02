import React, { useState } from 'react';
import './PostModal.css';

function PostModal({ onCloseModal, onAddPost }) {

  const [postType, setPostType] = useState('pedido'); 
  const [mensagem, setMensagem] = useState('');
  const [tags, setTags] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!mensagem.trim()) {
      alert("Por favor, escreva uma mensagem.");
      return;
    }

    const tagsArray = tags.split(',')
                          .map(tag => `#${tag.trim()}`) 
                          .filter(tag => tag !== '#'); 

    onAddPost({
      type: postType,
      mensagem: mensagem,
      tags: tagsArray
    });
      };

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>Criar Publicação</h2>
          <button onClick={onCloseModal} className="modal-close-button">×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          
          <div className="modal-body">
            
            <div className="form-group">
              <label>O que você deseja fazer?</label>
              <div className="type-options">
                <label>
                  <input 
                    type="radio" name="postType" value="pedido" 
                    checked={postType === 'pedido'} 
                    onChange={(e) => setPostType(e.target.value)} 
                  />
                  Preciso de Ajuda (Pedido)
                </label>
                <label>
                  <input 
                    type="radio" name="postType" value="oferta" 
                    checked={postType === 'oferta'} 
                    onChange={(e) => setPostType(e.target.value)} 
                  />
                  Quero Ajudar (Oferta)
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea
                id="mensagem"
                placeholder="Descreva seu pedido ou sua oferta de ajuda..."
                rows="5"
                value={mensagem} 
                onChange={(e) => setMensagem(e.target.value)} 
                required 
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (separadas por vírgula):</label>
              <input
                type="text"
                id="tags"
                placeholder="Ex: Alimentos, Roupas, Trabalho"
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
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
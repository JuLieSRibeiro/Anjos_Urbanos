import React, { useState } from 'react';
import CommentSection from '../CommentSection/CommentSection';
import postService from '../../../services/postService';
import './PostItem.css';

// 1. Recebe 'postId' e 'initialComments' (com valor padrão)
function PostItem({ postId, nome, cidade, mensagem, tags, botao, type, comments: initialComments = [], avatar }) {
  
  const [comments, setComments] = useState(initialComments);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const userToken = localStorage.getItem('userToken');

  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  // 2. --- FUNÇÃO 'handleAddComment' CORRIGIDA ---
  const handleAddComment = async (newCommentObject) => {
    
    // 3. Adiciona as propriedades que faltavam (likes) ao objeto local
    //    para que o 'handleLike' funcione nele imediatamente.
    const commentToPost = {
      ...newCommentObject,
      likes: [], // O backend vai criar isso, mas precisamos localmente
      _id: `temp-${Date.now()}` // Um ID temporário
    };

    // 4. ATUALIZAÇÃO OTIMISTA: Adiciona o novo comentário ao estado local IMEDIATAMENTE.
    setComments([commentToPost, ...comments]);

    try {
      // 5. Envia para o backend em segundo plano
      const response = await postService.addComment(
        postId,
        newCommentObject.text,
        userToken
      );
      
      // 6. Atualiza o estado com a resposta real do backend
      //    (que agora tem o _id correto do banco)
      setComments(response.data.comments);
      
    } catch (err) {
      console.error("Erro ao adicionar comentário:", err);
      // Reverte o estado se o backend falhar (opcional)
      setComments(initialComments); 
    }
  };

  // 7. --- FUNÇÃO 'handleLike' (CURTIR) TOTALMENTE REESCRITA ---
  const handleLike = async (indexToLike) => {
    
    // --- ATUALIZAÇÃO OTIMISTA (Parte 1) ---
    // 8. Cria uma cópia profunda do estado atual
    const newComments = comments.map(c => ({ ...c, likes: [...c.likes] }));
    const commentToUpdate = newComments[indexToLike];
    const commentId = commentToUpdate._id;

    // 9. Verifica se o usuário JÁ curtiu (baseado no ID do token)
    //    Não podemos pegar o ID do token de forma 100% segura no frontend,
    //    então vamos basear a lógica otimista no estado 'isLiked'
    
    // 10. Atualiza o 'isLiked' e 'likeCount' LOCALMENTE
    if (commentToUpdate.isLiked) {
      commentToUpdate.likeCount -= 1;
      commentToUpdate.isLiked = false;
    } else {
      commentToUpdate.likeCount += 1;
      commentToUpdate.isLiked = true;
    }
    
    // 11. Atualiza o estado do React IMEDIATAMENTE
    setComments(newComments);
    
    // --- CHAMADA DE API (Parte 2) ---
    try {
      // 12. Envia a requisição para o backend em segundo plano
      await postService.toggleLikeOnComment(
        postId,
        commentId,
        userToken
      );
      // O backend atualizou o banco, mas não precisamos fazer nada,
      // pois nosso estado local já está correto (otimista).
      
    } catch (err) {
      console.error("Erro ao curtir comentário:", err);
      // Se a API falhar, reverte o estado para o original (opcional)
      setComments(initialComments);
      alert("Não foi possível processar a curtida.");
    }
  };

  // ... (Lógica da badge) ...
  const badgeClass = type === 'pedido' ? 'post-type-pedido' : 'post-type-oferta';
  const badgeText = type === 'pedido' ? 'Pedido' : 'Oferta';

  return (
    <div className="post-card">
      {/* ... (Badge, Tags, Header, Mensagem) ... */}
      <div className={`post-type-badge ${badgeClass}`}>{badgeText}</div>
      <div className="post-tags">
        {tags.map((tag, index) => (<span key={index} className="tag-pill">{tag}</span>))}
      </div>
      <div className="post-header">
        <img className="post-avatar" src={avatar} alt="Foto de perfil" />
        <div className="post-user-info">
          <h3>{nome}</h3>
          <p className="cidade">📍 {cidade}</p>
        </div>
      </div>
      <p className="mensagem">{mensagem}</p>

      <div className="post-actions">
        <button className="btn-comentar" onClick={toggleComments}>
          {botao} ({comments.length})
        </button>
      </div>
      
      {/* 13. O CommentSection continua recebendo os dados do estado 'comments' */}
      {isCommentsVisible && (
        <CommentSection 
          comments={comments}
          onAddComment={handleAddComment}
          onLikeComment={handleLike}
        />
      )}
    </div>
  );
}

export default PostItem;
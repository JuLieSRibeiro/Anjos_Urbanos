import React, { useState } from 'react';
import './CommentSection.css';

// aqui vai ter duas functions importantes 
function Comment({ author, text, avatar, likeCount, isLiked, onLike }) {
  return (
    <div className="comment">
      {/* usa foto*/}
      <img src={avatar} alt="avatar" className="comment-avatar" />
      <div className="comment-content">{/* o conteudo do comentario*/}
        <p className="comment-author">{author}</p>
        <p className="comment-text">{text}</p>
        <div className="comment-actions">{/* o like*/}
          <button 
            className={`comment-like-button ${isLiked ? 'liked' : ''}`}
            onClick={onLike}
          >
            {isLiked ? 'Curtido' : 'Curtir'}{/* verifica e mostra a contagem de curtidas nos comentários*/}
          </button>
          {likeCount > 0 && (
            <span className="comment-like-count">
              {likeCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// a function "CommentSection" que faz o componente funcionar 
function CommentSection({ comments = [], onAddComment, onLikeComment }) {
  //é só sobre novos comentários 
  const [newCommentText, setNewCommentText] = useState("");
  // função pra enviar o comentário (tudo que tem submit envia alguma coisa)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newCommentText.trim()) return; 
      //parte dos comentários gerado pelo perfil 
    const newComment = {
      author: "Marcela Silva", 
      text: newCommentText,
      // link de fotos aleatórias pra usar nos perfis, e aqui mostra nos comentários que eu estou fazendo 
      avatar: "https://picsum.photos/seed/marcela/32/32", 
      likeCount: 0,
      isLiked: false
    };
    //aqui chama as funções de novo comentrário que está no post item 
    onAddComment(newComment);
    setNewCommentText(""); //limpa campos
  };

  return (
    <div className="comment-section">
      <h4>Comentários</h4>
      {/* form para adicionar outro comentário */}
      <form onSubmit={handleSubmit} className="add-comment-form">
        <input
          type="text"
          className="add-comment-input"
          placeholder="Escreva um comentário..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button type="submit" className="add-comment-button">
          Enviar
        </button>
      </form>
      {/* os comentarios existentes passa por uma lista aqui  */}
      <div className="comment-list">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            author={comment.author}
            text={comment.text}
            avatar={comment.avatar}
            likeCount={comment.likeCount}
            isLiked={comment.isLiked}
            // on like mostra qual deve ser curtido
            onLike={() => onLikeComment(index)} 
          />
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
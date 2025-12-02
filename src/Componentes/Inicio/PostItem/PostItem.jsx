import React, { useState } from 'react';
import CommentSection from '../CommentSection/CommentSection';
import postService from '../../../services/postService';
import './PostItem.css';

function PostItem({ postId, nome, cidade, mensagem, tags, botao, type, comments: initialComments = [], avatar }) {
  
  const [comments, setComments] = useState(initialComments);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const userToken = localStorage.getItem('userToken');

  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  const handleAddComment = async (newCommentObject) => {

    const commentToPost = {
      ...newCommentObject,
      likes: [], 
      _id: `temp-${Date.now()}` 
    };

    setComments([commentToPost, ...comments]);

    try {
      const response = await postService.addComment(
        postId,
        newCommentObject.text,
        userToken
      );

      setComments(response.data.comments);
      
    } catch (err) {
      console.error("Erro ao adicionar comentário:", err);
      setComments(initialComments); 
    }
  };

  const handleLike = async (indexToLike) => {
 
    const newComments = comments.map(c => ({ ...c, likes: [...c.likes] }));
    const commentToUpdate = newComments[indexToLike];
    const commentId = commentToUpdate._id;

    if (commentToUpdate.isLiked) {
      commentToUpdate.likeCount -= 1;
      commentToUpdate.isLiked = false;
    } else {
      commentToUpdate.likeCount += 1;
      commentToUpdate.isLiked = true;
    }
    
    setComments(newComments);
    
    try {
      await postService.toggleLikeOnComment(
        postId,
        commentId,
        userToken
      );
      
    } catch (err) {
      console.error("Erro ao curtir comentário:", err);
      setComments(initialComments);
      alert("Não foi possível processar a curtida.");
    }
  };

  const badgeClass = type === 'pedido' ? 'post-type-pedido' : 'post-type-oferta';
  const badgeText = type === 'pedido' ? 'Pedido' : 'Oferta';

  return (
    <div className="post-card">
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
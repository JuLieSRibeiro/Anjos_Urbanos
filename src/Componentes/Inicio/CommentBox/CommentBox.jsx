import React from 'react';
import './CommentBox.css';

// função "onOpenModal" tipo um call back
function CommentBox({ onOpenModal }) {
  return (
    //  essa div é a box de comentarios, mas é mais visual por que o que cria mesmo é outro
    <div className="comment-box-trigger" onClick={onOpenModal}>
      <div className="user-avatar-placeholder"></div>
      <span>Comece uma publicação...</span>
    </div>
  );
}

export default CommentBox;
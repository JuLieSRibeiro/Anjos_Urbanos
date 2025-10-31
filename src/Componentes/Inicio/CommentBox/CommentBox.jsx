import React from 'react';
import './CommentBox.css';

function CommentBox() {
  return (
    <div className="comment-box">
      <div className="user-avatar"></div>
      <input type="text" placeholder="Escreva seu comentário..." />
      <button>➤</button>
      <button>📷</button>
      <button>🎥</button>
    </div>
  );
}

export default CommentBox;

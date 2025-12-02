import React from 'react';
import PostItem from '../PostItem/PostItem';
import './PostList.css';

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => ( 
        <PostItem 
          key={post._id} 
          postId={post._id} 
          nome={post.nome}
          mensagem={post.mensagem}
          cidade={post.cidade}
          botao="Comentar" 
          tags={post.tags}
          type={post.type}
          comments={post.comments}
          avatar={post.avatar}
        />
      ))}
    </div>
  );
}

export default PostList;
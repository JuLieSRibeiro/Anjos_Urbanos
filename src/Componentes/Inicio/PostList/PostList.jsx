import React from 'react';
import PostItem from '../PostItem/PostItem';
import './PostList.css';

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => ( // 1. Removido 'index'
        <PostItem 
          key={post._id} // 2. Usa o '_id' do banco como 'key' (muito melhor!)

          // 3. Passa o ID do post como uma prop 'postId'
          postId={post._id} 

          // 4. Passa o resto dos dados (como antes)
          nome={post.nome}
          mensagem={post.mensagem}
          cidade={post.cidade}
          botao="Comentar" // (O 'botao' agora está fixo)
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
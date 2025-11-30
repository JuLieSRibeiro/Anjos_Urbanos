import React, { useState } from 'react';
import Header from '../Header/Header';
import './PaginaMensagens.css';

import ConversationList from './ConversationList';
// 1. IMPORTE O NOVO COMPONENTE DE JANELA DE CHAT
import ChatWindow from './ChatWindow';

function PaginaMensagens() {
  
  // Recebe o ID da ConversationList
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  return (
    <div className="pagina-mensagens">
      <Header />
      
      <div className="chat-container">
        
        <div className="conversation-list-container">
          <ConversationList onSelectConversation={setSelectedConversationId} />
        </div>
        
        {/* 2. SUBSTITUA O PLACEHOLDER PELO COMPONENTE */}
        <div className="chat-window-container">
          <ChatWindow conversationId={selectedConversationId} />
        </div>
        
      </div>
    </div>
  );
}

export default PaginaMensagens;
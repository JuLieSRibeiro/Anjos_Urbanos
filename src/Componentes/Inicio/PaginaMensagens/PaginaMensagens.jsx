import React, { useState } from 'react';
import Header from '../Header/Header';
import './PaginaMensagens.css';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

function PaginaMensagens() {
  
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  return (
    <div className="pagina-mensagens">
      <Header />
      
      <div className="chat-container">
        
        <div className="conversation-list-container">
          <ConversationList onSelectConversation={setSelectedConversationId} />
        </div>
        
        <div className="chat-window-container">
          <ChatWindow conversationId={selectedConversationId} />
        </div>
        
      </div>
    </div>
  );
}

export default PaginaMensagens;
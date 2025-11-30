import React, { useState, useEffect } from 'react';
import './ChatWindow.css';

// DADOS ATUALIZADOS COM FOTOS
const allMessagesData = {
  1: { 
    name: "Roberto Santos",
    avatar: "https://picsum.photos/seed/roberto/40/40", // <-- FOTO
    messages: [
      { id: 'a', sender: 'other', text: 'Roberto, me manda seu contato. Consigo uma cesta básica para você.' },
      { id: 'b', sender: 'me', text: 'Sério? Muito obrigado! Meu número é...' },
      { id: 'c', sender: 'other', text: 'Muito obrigado pela ajuda! Não sei nem como agradecer.' },
    ]
  },
  2: { 
    name: "Angela Rodrigues",
    avatar: "https://picsum.photos/seed/angela/40/40", // <-- FOTO
    messages: [
      { id: 'd', sender: 'me', text: 'Olá Angela, vi seu post sobre o material escolar. Como posso ajudar?' },
      { id: 'e', sender: 'other', text: 'Sim, por favor! O material escolar é para o meu filho de 8 anos...' },
    ]
  },
  3: { 
    name: "João Pedro",
    avatar: "https://picsum.photos/seed/joao/40/40", // <-- FOTO
    messages: [
      { id: 'f', sender: 'other', text: 'Você pode buscar as roupas amanhã à tarde?' },
    ]
  }
};

// Componente "ChatWindow"
function ChatWindow({ conversationId }) {

  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [conversationInfo, setConversationInfo] = useState(null);

  useEffect(() => {
    if (conversationId) {
      const data = allMessagesData[conversationId];
      setConversationInfo(data);
      setMessages(data.messages);
    } else {
      setConversationInfo(null);
      setMessages([]);
    }
  }, [conversationId]); 

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!newMessageText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: newMessageText,
    };
    setMessages([...messages, newMessage]);
    setNewMessageText("");
  };

  if (!conversationId || !conversationInfo) {
    return (
      <div className="chat-window">
        <div className="no-chat-selected">
          <p>Selecione uma conversa para começar a conversar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      
      <div className="chat-header">
        <img src={conversationInfo.avatar} alt="Avatar" className="chat-header-avatar" />
        <h3 className="chat-header-name">{conversationInfo.name}</h3>
      </div>

      <div className="message-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${msg.sender === 'me' ? 'message-sent' : 'message-received'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder="Digite sua mensagem..."
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <button type="submit" className="message-send-button">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
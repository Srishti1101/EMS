import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [eid, setEid] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isChatActive) {
      fetchMessages();
    }
  }, [isChatActive, receiverId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const enterChat = () => {
    // Check if `eid` is not empty before entering the chat
    if (eid.trim() !== '') {
      setReceiverId(eid);
      setIsChatActive(true);
    }
  };

  const fetchMessages = () => {
    if (receiverId) {
      axios.get(`http://localhost:3000/auth/messages/${receiverId}`)
        .then((response) => {
          if (Array.isArray(response.data.Result)) {
            setMessages(response.data.Result);
          } else {
            console.error('Invalid response format:', response);
          }
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3000/auth/messages', {
        senderId: 'admin',
        receiverId: receiverId,
        content: newMessage,
      });

      // Clear input and fetch updated messages
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exitChat = () => {
    setIsChatActive(false);
    setReceiverId('');
    setMessages([]);
    setEid('');
  };

  return (
    <div className='m-3 p-3'>
      {!isChatActive && (
        <div className='m-3 p-3'>
          <label htmlFor="eid">Enter Employee ID</label>
          <input className='m-3'
            type="text"
            id="eid"
            placeholder='Enter employee ID'
            value={eid}
            onChange={(e) => setEid(e.target.value)}
          />
          <div className='m-3 p-3'>
          <button className='button btn btn-primary' onClick={enterChat}>Enter Chat</button>
          </div>
        </div>
      )}

<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
{isChatActive && (
  <div className='m-3 p-3' style={{ flex: 1, overflowY: 'scroll' }}>
    <div>
      {messages.map((message) => (
        <div
          key={message.id}
          style={{
            textAlign: message.senderId === 'admin' ? 'right' : 'left',
            margin: '5px',
          }}
        >
          <span
            style={{
              background: message.senderId === 'admin' ? '#d3e0ea' : '#f0f0f0',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div>{message.content}</div>
            <div style={{ fontSize: '10px', color: '#888' }}>
              {new Date(message.timestamp).toLocaleString()} {/* Display timestamp */}
            </div>
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  </div>
      
        )}


        {isChatActive && (
          <div style={{ position: 'sticky', bottom: 0, width: '100%', background: '#fff', padding: '10px', marginTop: '20px' }}>
            <input
              type="text"
              value={newMessage}
              placeholder='Enter message here'
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ width: '60%' }}
              onKeyPress={handleKeyPress}
            />
            <button className="button btn btn-primary m-3" onClick={sendMessage}>Send</button>
            <button className='button btn btn-secondary m-3' onClick={exitChat}>Exit Chat</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
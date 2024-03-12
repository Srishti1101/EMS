import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const [eid, setEid] = useState('');
  const [senderId, setSenderId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => {
        setEmployee(result.data[0]);
      })
      .catch(err => console.log(err))
  }, [id]);

  useEffect(() => {
    if (employee && employee.eid) {
      setSenderId(employee.eid);
    }
  }, [employee, setSenderId]);

  useEffect(() => {
    // Fetch messages when the component mounts and when senderId changes
    fetchMessages();
  }, [senderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = () => {
    if (senderId) {
      axios.get(`http://localhost:3000/auth/messages/${senderId}`)
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

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3000/auth/messages', {
        senderId: senderId,
        receiverId: 'admin',
        content: newMessage,
      });

      // Clear input and fetch updated messages
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className='m-3 p-3' style={{ flex: 1, overflowY: 'scroll' }}>
      {messages.map((message) => (
  <div
    key={message.id}
    style={{
      textAlign: message.senderId === senderId ? 'right' : 'left',
      margin: '5px', // Add margin for better spacing
    }}
  >
    <span
      style={{
        background: message.senderId === senderId ? '#d3e0ea' : '#f0f0f0', // Different background for sender and receiver
        padding: '8px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span>{message.content}</span>
      <span style={{ fontSize: '0.8em', color: '#555' }}>{new Date(message.timestamp).toLocaleString()}</span>
    </span>
  </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ position: 'sticky', bottom: 0, width: '100%', background: '#fff', padding: '10px' }}>
        <input
          type="text"
          value={newMessage}
          placeholder='Enter message here'
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ width: '75%' }}
        />
        <button className="button btn btn-primary m-3" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
import React, { useState } from 'react';
import { fetchCropData } from '../api';

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: 'Hello farmer! I am Osim. What crop do you want help with today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const userMsg = input.trim();
    if (!userMsg) return;

    setMessages([...messages, { text: userMsg, sender: 'user' }]);
    setInput('');

    try {
      const data = await fetchCropData(userMsg.toLowerCase());
      const botReply = `
Crop: ${data.name}

🌱 Planting: ${data.planting}
💧 Fertilizer: ${data.fertilizer}
🐛 Pest Management: ${data.pest_management}
🌾 Harvest: ${data.harvest}
      `;
      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I don't have info on that crop yet.", sender: 'bot' }]);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded shadow">
      <div className="h-80 overflow-y-auto mb-4 border p-2">
        {messages.map((msg, i) => (
          <div key={i} className={\`mb-2 \${msg.sender === 'bot' ? 'text-left' : 'text-right'}\`}>
            <span className={msg.sender === 'bot' ? 'bg-green-100 p-2 rounded' : 'bg-blue-100 p-2 rounded'}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded mr-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type crop name (e.g., maize)..."
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;

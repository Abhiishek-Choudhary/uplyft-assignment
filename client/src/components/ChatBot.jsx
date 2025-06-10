import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:8000/api/chat', { message: input });
      const botReply = { sender: 'bot', text: res.data.reply, timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorMsg = { sender: 'bot', text: 'Error fetching reply.', timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 mt-6 border border-blue-200 relative">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Ask our Smart Sales Bot</h2>
      <div className="h-[28rem] overflow-y-auto border p-4 rounded-lg bg-gradient-to-br from-gray-100 to-white">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div className="text-xs text-gray-400 mb-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
              <div
                className={`inline-block px-5 py-3 rounded-xl max-w-xs break-words shadow-sm ${
                  msg.sender === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-200 text-gray-900'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef}></div>
      </div>
      <div className="flex gap-3 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask something about the product..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform active:scale-95"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

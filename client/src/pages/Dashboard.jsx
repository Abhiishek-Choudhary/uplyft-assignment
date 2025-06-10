import React from 'react';
import ChatBot from '../components/ChatBot';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl p-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Sales Chatbot Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      <ChatBot />
    </div>
  );
};

export default Dashboard;
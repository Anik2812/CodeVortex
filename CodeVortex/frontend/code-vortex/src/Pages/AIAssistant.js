import React, { useState } from 'react';
import { sendAIMessage } from '../api/api';

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setConversation([...conversation, { role: 'user', content: input }]);
    setLoading(true);

    try {
      const response = await sendAIMessage(input);
      setConversation(prev => [...prev, 
        { role: 'user', content: input },
        { role: 'assistant', content: response.data.message }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setConversation(prev => [...prev, 
        { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">AI Coding Assistant</h1>
      <div className="card">
        <div className="bg-gray-100 rounded-lg p-4 mb-4 h-96 overflow-y-auto">
          {conversation.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                {message.content}
              </span>
            </div>
          ))}
          {loading && <div className="text-center text-gray-500">AI is thinking...</div>}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input flex-grow mr-2"
            placeholder="Ask a coding question..."
          />
          <button
            onClick={handleSendMessage}
            className="btn btn-primary"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
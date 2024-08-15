import React, { useState } from 'react';
import axios from 'axios';

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setConversation([...conversation, { role: 'user', content: input }]);
    setLoading(true);

    try {
      const response = await axios.post('/api/ai-assistant', { message: input });
      setConversation([...conversation, 
        { role: 'user', content: input },
        { role: 'assistant', content: response.data.message }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Coding Assistant</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 h-96 overflow-y-auto">
        {conversation.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              {message.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-center">AI is thinking...</div>}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Ask a coding question..."
        />
        <button
          onClick={sendMessage}
          className="bg-secondary text-white px-4 py-2 rounded-r"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
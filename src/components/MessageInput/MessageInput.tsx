import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

type MessageInputProps = {
  disabled: boolean;
  onSendMessage: (message: string) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center pt-4 bg-white rounded-xl mx-4 mb-4">
      <input
        type="text"
        className="flex-grow p-3 text-sm rounded-full bg-gray-100 border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
        placeholder="Type a message..."
        disabled={disabled}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSendMessage();
        }}
      />
      <button
        onClick={handleSendMessage}
        disabled={disabled}
        className="ml-3 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <FiSend size={20} />
      </button>
    </div>
  );
};

export default MessageInput;

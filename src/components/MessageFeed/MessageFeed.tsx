import React from 'react';
import Markdown from 'react-markdown'

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
};

type MessagesFeedProps = {
  messages: Message[];
};

const MessagesFeed: React.FC<MessagesFeedProps> = ({ messages }) => {
  return (
    <div className="flex flex-col justify-end p-4 space-y-4 h-[80vh] overflow-y-scroll relative">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-md p-3 text-left rounded-3xl ${
              message.sender === 'me'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } shadow-sm`}
          >
            <p className="text-sm">{message.sender === "other" ? <Markdown>{message.text}</Markdown> : message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesFeed;

import './App.css';

import { useEffect, useState } from 'react';

import MessageFeed from './components/MessageFeed';
import MessageInput from './components/MessageInput';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
};

function App() {
  const [aiReady, setAiReady] = useState<boolean>(false);
  const [thinking, setThinking] = useState<boolean>(false);
  const [aiSession, setAiSession] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleUserMessage = async (message: string) => {
    setThinking(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length,
        text: message,
        sender: 'me',
      },
    ]);

    const aiResponse = await aiSession.prompt(message);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length,
        text: aiResponse,
        sender: 'other',
      }
    ]);
    setThinking(false);
  }

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const aiStatus = (await ai.languageModel.capabilities()).available;

      if (aiStatus === "readily") {
        setAiReady(true);
        // @ts-ignore
        setAiSession(await ai.languageModel.create())
      }
    })();
  }, []);

  return (
    <div className="App">
      {
        aiReady ? (
          <MessageFeed messages={messages} />
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-2xl text-gray-800">AI Model Unavailable</p>
          </div>
        )
      }
      <MessageInput disabled={thinking} onSendMessage={handleUserMessage} />
    </div>
  );
}

export default App;

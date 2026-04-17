import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs'
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  function saveInputText(event) {
      setInputText(event.target.value)
  }

  function keyPressed(event) {
      if (!inputText || isLoading) return;
      if (event.key === 'Enter') {
          sendMessage();
          setInputText('');
      }
      if (event.key === 'Escape') {
          setInputText('');
      }
  }

  async function sendMessage() {
    if (!inputText || isLoading) return;
    setInputText('');
    const time = dayjs().valueOf();

    const newChatMessages = [
        ...chatMessages,
        {
            message: inputText,
            sender: 'user',
            time: time,
            id: crypto.randomUUID()
        },
        {
            message: <img src={LoadingSpinner} className="loading-spinner" />,
            sender: 'robot',
            id: crypto.randomUUID()
        }
    ];

    setChatMessages(newChatMessages);

    setIsLoading(true);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
        ...newChatMessages.slice(0, newChatMessages.length - 1),
        {
            message: response,
            sender: 'robot',
            time: time,
            id: crypto.randomUUID()
        }
    ]);

    setIsLoading(false);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
      <div className="chat-input-container">
          <input 
              placeholder="Send a message to Chatbot" 
              size="30" 
              onChange={saveInputText}
              value={inputText}
              onKeyDown={keyPressed}
              className="chat-input"
          />
          <button
              onClick={sendMessage}
              className="send-button"
          >Send</button>
          <button
              onClick={clearMessages}
              className="clear-messages-button"
          >Clear</button>
      </div>
  );
}
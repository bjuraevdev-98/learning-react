import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import {Chatbot} from 'supersimpledev'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  useEffect(() => {
    Chatbot.addResponses({
        "bye":"Goodbye and see you next time!",
        "give a unique id":() => {
            return `Here it is ${crypto.randomUUID()}`;
        }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages])

  return (
      <div className="app-container">
          <ChatMessages 
              chatMessages={ chatMessages }
          />
          <ChatInput 
              chatMessages={ chatMessages }
              setChatMessages={ setChatMessages }
          />
      </div>
  )
}

export default App

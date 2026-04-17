import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);
  
  if (chatMessages.length === 0) {
      return (
          <p className='welcome-text'>
              Welcome to the chatbot project! Send a message using the textbox below.
          </p>
      )
  }

  return (
      <div 
          className="chat-messages-container"
          ref={chatMessagesRef}
      >
          { chatMessages.map(({ message, sender, time, id }) => {
          return (
              <ChatMessage 
                  message={ message }
                  sender={ sender }
                  time={ time }
                  key={ id }
              />
          )
          })}
      </div>
  )
}

export default ChatMessages;

function useAutoScroll(dependencies) {
    const containerRef = useRef(null);

    useEffect(() => {
        const containerElem = containerRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [dependencies]);

    return containerRef;
}

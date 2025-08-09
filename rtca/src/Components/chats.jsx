import React from 'react'
import { useRef,useEffect } from 'react'




 const chats = ({messages,timestamp}) => {
    const bottomRef = useRef()
    useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); // Automatically scroll to bottom
   
  }, [messages]);


  return (
   <div className="flex-1 overflow-y-auto p-2 md:p-7 space-y-1 bg-gray-50 h-[100%] py-25 md:py-40">
  {messages.map((msg, index) => {
    // Use createdAt if available, else current time
    const dateObj = msg.createdAt ? new Date(msg.createdAt) : new Date();

    // Format: DD/MM/YYYY HH:MM AM/PM
    const formattedDateTime = dateObj.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return (
     
       
      <div 
        key={index}
        className={`w-fit px-5 py-2 md:pr-14 text-sm md:text-lg bottom-0 max-w-[65%]   ${
          msg.type === 'send'
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-black self-end ml-auto text-start rounded-bl-xl rounded-tl-xl rounded-tr-xl'
            : 'bg-gradient-to-bl from-gray-200 to-gray-300 text-black self-start rounded-br-xl rounded-tl-xl rounded-tr-xl'
        }`}
      >
        <h1 className="whitespace-pre-wrap break-words font-roboto text-[15px] md:text-[18px]">{msg.text}</h1>
       <p className={`text-[10px] tracking-wide font-inter ${msg.type === 'send' ?  `text-white` : `text-gray-600`}   `}>{formattedDateTime}</p>
      </div>
      
    );
  })}
  <div ref={bottomRef} />
</div>

  )
}
export default chats
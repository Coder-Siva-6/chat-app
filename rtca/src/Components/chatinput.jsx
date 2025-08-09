import React from 'react'
import { IoIosSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';


 const chatinput = ({selectedContact,sendMessage,setSendMessage,sendMessageToServer,setEmoji,emoji}) => {
  return (
    <div>
          {selectedContact && (
          <div className=" w-[100%] absolute border-0 p-4 border-t border-gray-300 flex items-center gap-2 bg-white bottom-0 md:bottom-17 ">
            <input
              type="text"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              className="flex-1 border-[#ccc] border outline-none rounded-full px-4 py-3 focus:outline-none focus:ring "
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessageToServer()}
            />
            <button onClick={() => setEmoji(!emoji)} className='text-3xl' > 😉</button>



            <IoIosSend type='button' onClick={sendMessageToServer} className="bg-green-500 flex items-end  gap-2 text-white rounded-full size-10 md:size-10 p-2" />

            {
              emoji && (<div className=" right-2 bottom-21 z-10 fixed  ">
                <EmojiPicker onEmojiClick={(e)=>setSendMessage((prev) => prev += e.emoji)} />
              </div>)
            }





          </div>
        )}

    </div>
  )
}

export default chatinput
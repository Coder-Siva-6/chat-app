
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { Settings2 } from 'lucide-react';
import { IoMdPersonAdd } from "react-icons/io";
import Addcontact from './Addcontact';
import { IoIosSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import { GrEmoji } from "react-icons/gr";




const Data = ({ user }) => {
  const [contacts, setContacts] = useState(user.contacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [profileUrl, setProfileUrl] = useState(user.profileUrl || '');
  const [add,setAdd] = useState(false);
  const [emoji,setEmoji] = useState(false);
  const socketRef = useRef();

const backendUrl = import.meta.env.VITE_BACKEND_URL 

  useEffect(() => {
    socketRef.current = io(`${backendUrl}`, {
      auth: { phone: user.phone },
      withCredentials: true,
    });

    socketRef.current.on('receive_message', (data) => {
      const { from, sendMessage } = data;
      if (selectedContact && from === selectedContact.phone) {
        setMessages((prev) => [...prev, { text: sendMessage, type: 'recived' }]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user.phone, selectedContact]);

  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
    try {
      const res = await axios.post(`${backendUrl}/fetch-messages`, {
        myPhone: user.phone,
        contactPhone: contact.phone,
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessageToServer = () => {
    if (sendMessage.trim() === '' || !selectedContact) return;
    const data = { toNumber: selectedContact.phone, sendMessage };
    socketRef.current.emit('send_message', data);
    setMessages((prev) => [...prev, { text: sendMessage, type: 'send' }]);
    setSendMessage('');
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const updatedUrl = reader.result;
        setProfileUrl(updatedUrl);
        // Optionally send to server
        await axios.patch(`${backendUrl}/update-profile`, {
          phone: user.phone,
          profileUrl: updatedUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };


function handleEmojiClick(emojiData){
  const emoji = emojiData.emoji;
  setSendMessage((prev) => prev += emoji);
  console.log(sendMessage)

}




  return (
    <div className="h-screen w-full flex">

      {/* Sidebar  left*/}
      <div className="w-1/6 bg-white border-r border-gray-300 flex flex-col">


        <div className="p-4 border-b border-gray-200 flex items-center justify-between mx-5">
          <h2 className="text-xl font-bold text-gray-800">Contacts</h2>
          <div className='flex gap-2  '>
          <IoMdPersonAdd type='btn' onClick={()=>setAdd(!add)} className="w-5 h-5 cursor-pointer"/>

          <Settings2
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShowSettings(!showSettings)}
          />
          </div>
        </div>


        {showSettings && (
          <div className="p-4 border-b border-gray-200 space-y-2">
            <div className="flex flex-col items-center">
              <img
                src={profileUrl || `https://api.dicebear.com/7.x/personas/svg?seed=${user.phone}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="mt-2 text-sm"
              />
            </div>
          </div>
        )}

{/*......................................Contact adder .......................... */}
{
        add && <Addcontact id='add' user={user} setAdd={setAdd} />
}
       

       
















{/* ------------------------- Contact list-------------------------------------- */}

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              onClick={() => handleContactClick(contact)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                selectedContact?.phone === contact.phone ? 'bg-gray-200' : ''
              }`}
            >
              <img
                src={contact.profileUrl || `https://api.dicebear.com/7.x/personas/svg?seed=${contact.phone}`}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Sidebar  left   end*/}

      {/*------------------------------- --------Chat Window------------------------------------ */}
      <div className="w-full  flex flex-col">
        {/* Header */}
        <div className="h-16 bg-gray-100 border-b border-gray-300 px-4 flex items-center gap-3">
          {selectedContact && (
            <img
              src={selectedContact.profileUrl || `https://api.dicebear.com/7.x/personas/svg?seed=${selectedContact.phone}`}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <h3 className="text-lg font-semibold">
            {selectedContact ? selectedContact.name : 'Select a contact'}
          </h3>
        </div>

        {/*------------------------------------------ Messages======================== */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-fit px-5 py-2 pr-14 rounded-lg text-lg   ${
                msg.type === 'send'
                  ? 'bg-blue-600 text-white self-end ml-auto text-start'
                  : 'bg-gray-300 text-black self-start '
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        {selectedContact && (
          <div className="p-4 border-t border-gray-300 flex items-center gap-2 bg-white">
            <input
              type="text"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              className="flex-1 border-[#ccc] border outline-none rounded-full px-4 py-3 focus:outline-none focus:ring"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessageToServer()}
            />
            <button onClick={()=>setEmoji(!emoji)} className='text-3xl' > 😉</button>
            <button
              onClick={sendMessageToServer}
              className="bg-green-500 flex items-end  gap-2 text-white px-10 py-3 rounded-[10px]"
            >
              Send <IoIosSend  className='size-7'/>

            </button>
   {
    emoji &&  ( <div className=" right-2 bottom-21 z-10 fixed  ">
          <EmojiPicker onEmojiClick={handleEmojiClick}/>
        </div>)
   }





          </div>
        )}
      </div>
    </div>
  );
};

export default Data;
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { FaCheck } from "react-icons/fa6";
import userImg from '../assets/user.webp'


const ContactList = ({ contacts, handleContactClick, selectedContact, user, inonline }) => {

  const send = <FaCheck />


  return (
    <div className="flex-1 bg-gray-100  overflow-y-auto">
      {contacts.map((contact) => {
        // Find the matching user's profile picture


        return (
          <div
            key={contact._id}
            onClick={() => handleContactClick(contact)}
            className={`flex items-center gap-5 px-4 py-3 cursor-pointer  hover:bg-gray-100 ${selectedContact?.phone === contact.phone ? "bg-gray-200" : ""
              }`}
          >
            <div className="flex relative ">
              <img
                src={
                  contact?.profilePicture?.data
                    ? `data:${contact.profilePicture.contentType};base64,${contact.profilePicture.data}`
                    : userImg
                }
                alt="Profile"
                className="w-15 h-15 md:w-14 md:h-14 rounded-full object-cover shadow-[0pc_0px_0.5px_0.5px_gray]"
              />
              <div className={`w-3 h-3  rounded-full bottom-[5%] absolute right-[11%] ${contact.phone === inonline.phone && inonline.online ? 'bg-green-500' : 'bg-red-400'}`}></div>

            </div>

            <div >
              <h1 className=" text-lg  text-gray-900 font-roboto-slab">
                {contact.name}
              </h1>
              <p className="text-gray-500 font-inter text-[14px]  ">
                {contact?.message?.length > 0
                  ? (() => {
                    const lastMessage = contact.message[contact.message.length - 1];
                    const text =
                      lastMessage.type === "send"
                        ? '🗸' + lastMessage.text
                        : lastMessage.type === "recived"
                          ? lastMessage.text
                          : lastMessage.text;

                    return text.length > 20 ? text.slice(0, 14) + "..." : text;
                  })()
                  : "no message"}
              </p>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;

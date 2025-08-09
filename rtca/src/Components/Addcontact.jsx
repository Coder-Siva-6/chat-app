import React from 'react'
import { IoMdPersonAdd } from "react-icons/io"
import { useState} from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';






const Addcontact = ({ user,add,setAdd }) => {
  
  const [name,setName]=useState("")
  const [phone, setPhone] = useState('');
  const [popup, setPopup] = useState(false);
  const [popupmess, setPopupMess] = useState('');
  const [popupmessinfo, setPopupMessInfo] = useState('');
  const [popupmessErr, setPopupMessErr] = useState('');

const backendUrl = import.meta.env.VITE_BACKEND_URL 
 


// Function to handle form submission
  async function handleSubmit() {
    const myphone = user.phone;
    await axios.post(`${backendUrl}/add-contact`, { name, phone, myphone })
      .then((response) => {
        //handle success responses
         setPopup(true)
         setPopupMess(response.data.message)
        

         setTimeout(() => {
         setPopup(false)
         setPopupMess("")
       
        }, 5000)
      
        
         const add = document.getElementById('add-contact');
         add.style.visibility = 'hidden';
      })
      
      
      .catch((error) => {
        //handle error responses
        if (error.response.status === 401) { 
         setPopup(true)
         setPopupMessErr(error.response.data.message)
         setTimeout(() => {
         setPopup(false)
         setPopupMessErr("")
        }, 5000)
         return
      
      }

      // Handle other error responses
        if (error.response.status === 400){ 
         setPopup(true)
         setPopupMessInfo(error.response.data.message)
         setTimeout(() => {
         setPopup(false)
         setPopupMessInfo("")
        }, 5000)
         return
      }

      //handle server error responses
      if (error.response.status === 500){ 
         setPopup(true)
         setPopupMessErr(error.response.data.message)
         setTimeout(() => {
         setPopup(false)
         setPopupMessErr("")
        }, 5000)
         return
      
      }
      })
  }


//handle click function to hide the add contact box
  function handleClick() {
    const add = document.getElementById('add-contact');
    add.style.visibility = 'hidden';
    

  }







  return (
    <div className='flex justify-center flex-col'>
      {popup && <div className='fixed flex  flex-col gap-2 items-center w-screen mt-5 z-40'>
        {popupmess && <Alert className=' w-[90%] md:w-190' variant="filled" severity="success">
          {popupmess}

        </Alert>}
        {popupmessErr &&
          <Alert className=' w-[90%] md:w-190' variant="filled" severity="error">
            {popupmessErr}
          </Alert>}
           {popupmessinfo &&
          <Alert className=' w-[90%] md:w-190' variant="filled" severity="warning">
            {popupmessinfo}
          </Alert>}
      </div>}









      {<div id='add-contact' className='fixed block translate-x-[-50%]  translate-y-[-50%] top-[50%] left-[50%] border-[1px] w-[90%] md:w-120 h-90 rounded-3xl backdrop-blur-xs backdrop-grayscale drop-shadow-lg z-50'>
        <div className='mt-5  w-full'><h1 className=' text-center text-2xl font-bold '>ADD CONTACT</h1></div>
        <div className='flex flex-col items-start h-full gap-2 p-5  '>
          <h2 className='mx-10 text-[17px] font-semibold '>Name</h2>
          <input className='border outline-0 border-gray-400 hover:border-black rounded-[7px] p-3  w-[90%] mx-5' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Contact Name' />
          <h2 className='mx-10 text-[17px] font-semibold '>Phone</h2>
          <input className='border outline-0 border-gray-400 hover:border-black  rounded-[7px] p-3  w-[90%] mx-5' value={phone} onChange={(e) => setPhone(e.target.value.trim())} type="Number" placeholder='Number' />
          <div className='flex gap-5 self-end mt-5 mx-10'>
            <button className=' flex gap-2 content-center bg-red-500 px-4 py-2 rounded-[7px]' onClick={() => setAdd(!add)}>cancel  </button>
            <button className=' flex gap-2 content-center bg-blue-500 px-4 py-2 rounded-[7px]' onClick={() => handleSubmit()}>Add  <IoMdPersonAdd className="w-5 h-5 cursor-pointer" /> </button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Addcontact
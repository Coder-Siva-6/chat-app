
import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

// const socket = io('http://localhost:5000')

const hero = () => {
   
   const[toNumber,setToNumber] = useState('')
   const[yourNumber,setYourNumber] = useState('')
   const[toMessage,setToMessage] = useState('')
   const[recevieMessage,setRecevieMessage] = useState(['hii'])
   const[sendMessage,setSendMessage]=useState('')




   useEffect(()=>{
    socket.on('receive_message',(data)=>{
      const{from,toMessage} = data
      console.log(toMessage)
      setRecevieMessage((prev)=>[...prev,{text:toMessage,type:'rec'}])

    })
    return () => {
      socket.off('receive_message');
    };
   },[])


  


  
   async function sentMessage(){
       socket.emit('phone',yourNumber)
      const data = {toNumber,toMessage}
      socket.emit('send_message',data)
      console.log(toNumber,toMessage)
      setToMessage('')
      setRecevieMessage((prev)=>[...prev,{text:toMessage,type:'send'}])
    }




  return (
    <div className='flex justify-center items-center'>
      <div className='bg-red-400 h-screen w-[60%] flex flex-col items-center justify-between '>
        <div className='mt-5 flex flex-col items-center w-full gap-y-5'>
          <input value={yourNumber} type="text" className='border-2 w-[90%]  py-3  px-2' placeholder='Your Number' onChange={(e)=>setYourNumber(e.target.value)} />
        </div>
        <div className='bg-amber-300 w-[90%] h-[70%] overflow-y-scrollscroll mt-5 flex flex-col'>
           {
            recevieMessage.map((data,index)=>(
            <h1 className={`text-white  max-w-[70%] px-3 mt-1 mx-2 rounded-lg ${data.type=== 'send'?'bg-blue-500 self-end text-right':'bg-green-500 self-start text-left' }`} key={index}>{data.text}</h1>
          ))
           }
        </div>
        <div className='flex flex-col items-center w-full gap-y-5 mt-5'>
          <input value={toNumber} type="text" className='border-2 w-[90%]  py-2  px-2' placeholder='toNumber' onChange={(e)=>setToNumber(e.target.value)} />
           <input value={toMessage} type="text" className='border-2 w-[90%]  py-5  px-2' placeholder='Message' onChange={(e)=>setToMessage(e.target.value)} />
            <button onClick={()=>sentMessage()} className='px-35 py-3 bg-blue-600 text-2xl font-semibold rounded-[5px] mb-5 '>SEND</button>
        </div>

      </div>
    </div>
  )
}

export default hero
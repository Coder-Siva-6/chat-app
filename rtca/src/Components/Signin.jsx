import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import log from '../assets/log.png'
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';  // material ui
import Stack from '@mui/material/Stack';  // material ui
import { backdropClasses } from '@mui/material/Backdrop';

const Signin = () => {
  const [signin, setSignin] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [warning, setWarning] = useState('')
  const [popup, setPopup] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [success, setSuccess] = useState('')

const backendUrl = import.meta.env.VITE_BACKEND_URL 

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      axios.post(`${backendUrl}/signin`, signin
      )
        .then((res) => {
         
          setSuccess(res.data.message)
          setPopup(true)

          setTimeout(() => {
            setPopup(false)
            setSuccess('')
          }, 4000);
          window.open('/login')

        }).catch((err) => {

          if (err.response.status === 400) {
            setPopup(true)
            setInfo(err.response.data.message)
            setTimeout(() => {
              setPopup(false)
              setInfo('')
            }, 4000)
          }
          if (err.response.status === 405) {
            setPopup(true)
            setWarning(err.response.data.message)
            setTimeout(() => {
              setPopup(false)
              setWarning('')
            }, 4000)
          }

          if (err.response.status === 406 || err.response.status === 500) {
            setPopup(true)
            setError(err.response.data.message)
            setTimeout(() => {
              setPopup(false)
              setError('')
            }, 4000)
          }




        })

    } catch (error) {
      console.log('api connection error', error.message)
    }







  }

  return (
    <div>



      {/* --------------------- alert------------------------ */}
      {popup && <div className='fixed top-5  flex flex-col   items-center w-full z-10 ' >
        <Stack sx={{ width: '40%' }} spacing={2} >
          {success && <Alert variant="filled" severity="success" className='transition-all ease-in-out '> {success}</Alert>}      

          {info && <Alert variant="filled" severity="info" className='transition-all ease-in-out duration-1500'> {info}</Alert>  }         

          {warning && <Alert variant="filled" severity="warning" >{warning}</Alert>}
           {error && <Alert variant="filled" severity="error" >{error}</Alert>  }

        </Stack>
      </div>}






      <div className='flex p-10 justify-center gap-20 w-[80%] mx-40 overflow-hidden rounded-4xl mt-15'>

       {/* -------------------------image ------------------------------------- */}
        <div className='flex '>                                  
          <img className='bg-cover w-180' src={log} alt="" />   
        </div>

     {/*  ------------------------------------------------------form---------------------------------------- */}
        <form onSubmit={(e) => handleSubmit(e)} action="" method='POST' className='flex   flex-col gap-5 items-center  backdrop-blur-2xl bg-transparent px-15  py-15 rounded-br-4xl rounded-tl-4xl  shadow-2xl  my-12   '>

          <h1 className='font-bold font-engaement text-6xl mb-2    '>Talk Lynk</h1>

          
          <div className='flex flex-col gap-4 '>
            <input onChange={(e) => setSignin({ ...signin, name: e.target.value })} value={signin.name} type="text" placeholder='User Name' className='border-2 px-10 py-4 rounded-2xl border-[#ccc] hover:border-black w-85 font-roboto ' />
            <input onChange={(e) => setSignin({ ...signin, email: e.target.value.trim() })} value={signin.email} type="text" placeholder='Email' className='border-2 px-10 py-4 rounded-2xl border-[#ccc] hover:border-black w-85 font-roboto ' />
            <input onChange={(e) => setSignin({ ...signin, phone: e.target.value.trim() })} value={signin.phone} type="text" placeholder='Phone Number' className='border-2 px-10 py-4 rounded-2xl border-[#ccc] hover:border-black w-85  font-roboto' />
            <input onChange={(e) => setSignin({ ...signin, password: e.target.value.trim() })} value={signin.password} type="text" placeholder='Password' className='border-2 px-10 py-4 rounded-2xl border-[#ccc] hover:border-black w-85  font-roboto' />
            
            <div className='self-end flex  flex-col items-end mx-2'>
              <p className='self-end font-roboto text-gray-600'>  Have an account?  <Link to={'/login'}> <span className='text-blue-600 font-semibold'>Login</span></Link></p>
              {/* <p  className='self-end font-roboto text-gray-600'>Forgot passowrd</p> */}
            </div>

          </div>
          <button value={signin.name} className='bg-gradient-to-br from-red-600 to-red-900  px-32 py-3  text-amber-50 rounded-[5px] mt-5 text-[18px] font-semibold hover:scale-99 '>SUBMIT</button>
        </form>


      </div>








    </div>
  )
}
export default Signin
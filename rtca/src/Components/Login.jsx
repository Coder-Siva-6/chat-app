import React from 'react'
import axios from 'axios'
import { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import log from '../assets/log.png'
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';  // material ui
import Stack from '@mui/material/Stack';  // material ui


const Login = () => {
     
      const [loading, setLoading] = useState(true);
      const [user, setUser] = useState(null);
      const navigate = useNavigate();
      const [logIn, setLogin] = useState({ phone:'',password:''})
      const [warning, setWarning] = useState('')
      const [popup, setPopup] = useState(false)
      const [error, setError] = useState('')
      const [success, setSuccess] = useState('')
      
    const backendUrl = import.meta.env.VITE_BACKEND_URL 
//...................... after Login to navigate home page..........................// 
       

//......................LOGIN FORM SUBMISSION...............................................//


    
     async function handleSubmit(e){
        e.preventDefault()
        const{phone,password} =logIn
        const num = phone.trim()
        const pass =password.trim()
       
         try{
        

            //...................SENT LOGIN CREDENTIALS TO BACKEND............................//

        await  axios.post(`${backendUrl}/login`,{num,pass},{ withCredentials: true }
          )
          .then((res)=>{
         
            
            setSuccess(res,'LOGIN SUCCESSFULLY')
            setPopup(true)
            setTimeout(() => {
            setPopup(true)
            setSuccess('')
          }, 4000);
            
            navigate("/data")

    
          }).catch((err)=>{
            console.log(err.response.status)
             if (err.response.status === 401 ){
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
           
        }catch(err){
          console.log("error in login controller",err.message)
          
        }
        
    
       
      }
//......................................................................................................///
    
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-white'>
      
            {/* --------------------- alert------------------------ */}
            {popup && <div className='fixed top-5  flex flex-col   items-center w-full z-10 ' >
              <Stack sx={{ width: '40%' }} spacing={2} >
                {success && <Alert variant="filled" severity="success" className='transition-all ease-in-out '> {success}</Alert>}      
      
               
      
                {warning && <Alert variant="filled" severity="warning" >{warning}</Alert>}
                 {error && <Alert variant="filled" severity="error" >{error}</Alert>  }
      
              </Stack>
            </div>}











      <div className='flex p-10 justify-center gap-20 w-[80%] mx-40 overflow-hidden rounded-4xl '>
        <div className='flex '>
          <img className='bg-cover w-160' src={log} alt="" />

        </div>


        
         <form onSubmit={(e)=>handleSubmit(e)} action="" method='POST' className='flex   flex-col gap-5 items-center  backdrop-blur-2xl bg-transparent px-15  py-15 rounded-br-4xl rounded-tl-4xl  shadow-2xl  my-10  '>

                    <h1 className='font-bold font-engaement text-6xl mb-2    '>Talk Lynk</h1>
                    <div className='flex flex-col gap-4 '>
                     
                  <input onChange={(e)=>setLogin({...logIn,phone:e.target.value})} value={logIn.phone} type="text" placeholder='phone'  className='border-2 px-10 py-4 rounded-2xl border-[#ccc] hover:border-black w-80 ' />
                  <input onChange={(e)=>setLogin({...logIn,password:e.target.value})} value={logIn.password} type="text" placeholder='password' className='border-2 px-10 py-4 rounded-2xl border-[#ccc] hover:border-black  ' />
                 <div className='self-end flex  flex-col items-end mx-2'>
                  <p className='self-end font-roboto text-gray-600'> Don't Have  account?  <Link to={'/'}> <span className='text-blue-600 font-semibold'>Sign up</span></Link></p>
                     {/* <p  className='self-end font-roboto text-gray-600'>Forgot passowrd</p> */}
                  </div>
                  </div>

                  <button   className='bg-gradient-to-br from-red-600 to-red-900  px-32 py-3  text-amber-50 rounded-[5px] mt-5 text-[18px] font-semibold hover:scale-99 '>LOGIN</button>

              </form>

      </div>
        
      
  </div>
    

  )
}

export default Login
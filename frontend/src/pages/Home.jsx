import React from 'react'
import homelogo from '../assets/homelogo.png'
import {useNavigate} from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
  return (
    <div className='bg-white flex flex-row '>
     <div>
        <img src={homelogo} alt="image" className='h-[500px] w-[500px] mt-4 ml-2'/>
     </div>
     <div  className='flex flex-col space-y-10 mt-10'>
        <h1 className='text-4xl font-bold  mt-10'>
            Farmly is a place where you can
             <p><span className='text-5xl'>buy and sell agro products</span></p>
        </h1>
        <h1 className='text-4xl font-bold mt-4'>Buy and Sell seamlessly</h1>
        <button onClick={()=>navigate('/login')} className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4 w-20 transition-transform duration-500 ease-in-out hover:scale-110 '>login</button>
     </div>
    </div>
  )
}

export default Home
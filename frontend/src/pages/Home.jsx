import React from 'react';
import homelogo from '../assets/homelogo.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-white flex flex-col md:flex-row items-center justify-center p-4 md:p-8'>
            <div className="flex justify-center mb-6 md:mb-0 md:mr-6">
                <img
                    src={homelogo}
                    alt="image"
                    className='h-60 w-60 sm:h-80 sm:w-80 md:h-[500px] md:w-[500px]'
                    loading="lazy"
                />
            </div>
            <div className='flex flex-col space-y-6 md:space-y-10 mt-4 md:mt-10 text-center md:text-left'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
                    Farmly is a place where you can
                    <p><span className='text-3xl sm:text-4xl md:text-5xl'>buy and sell agro products</span></p>
                </h1>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Buy and Sell seamlessly</h1>
                <button
                    onClick={() => navigate('/login')}
                    className='bg-green-500 text-white px-6 py-2 rounded-lg mt-2 md:mt-4 w-full sm:w-32 mx-auto md:mx-0 transition-transform duration-500 ease-in-out hover:scale-110'
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Home;

import React from 'react';
import homelogo from '../assets/homelogo.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                    <div className='flex justify-center'>
                        <img
                            src={homelogo}
                            alt="Farmly"
                            className='w-full max-w-md h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900'>
                            Farmly is a place where you can
                            <span className='block text-green-600 mt-2'>buy and sell agro products</span>
                        </h1>
                        <p className='text-lg text-gray-700'>Buy and sell seamlessly with a marketplace built for farmers and consumers.</p>
                        <div>
                            <button
                                onClick={() => navigate('/login')}
                                className='bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors'
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
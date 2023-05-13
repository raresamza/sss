import React from 'react'

const Solutions = () => {
    return (
        <div className='px-[6.5rem]'>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <textarea spellCheck={false} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4' defaultValue="Add	 a solution"></textarea>
            </div>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4' defaultValue="base java program"></textarea>
            </div>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4' defaultValue="nase java prgoram"></textarea>

            </div>
            <div className='flex items-center justify-center mb-10 '>
                <img className='rounded-full w-14 mr-4 ' src="/raton.jpeg" alt="Raton"></img>
                <textarea spellCheck={false} readOnly={true} className='bg-black  w-full rounded-lg decoration-none border-none outline-none h-[600px] resize-none text-white px-4 py-4' defaultValue="base java program"></textarea>
            </div>
        </div>
    )
}

export default Solutions
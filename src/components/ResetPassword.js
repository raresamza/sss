import React from 'react'

const ResetPassword = () => {
  return (
    <>
    <h1 className='px-44 text-4xl font-bold py-10 mb-16'>Reset Password</h1>
    <div className='flex items-center justify-center'>
        <div className='text-center'>
            <p className='py-6 text-lg font-semibold'>Enter new password</p>
            <div>
                <input type="password"  className="border-[2px] w-[28rem] border-gray-900 rounded-md p-2 mb-6"  id="oldPassword"  name="oldPassword"/>
            </div>
            <button  className="bg-green-600 rounded-lg h-12  w-36 align-left text-white hover:bg-green-700 font-semibold ">Update</button> 
        </div>
    </div>
    </>
  )
}

export default ResetPassword
import {ErrorCard} from '@/components/auth/ErrorCard'
import React from 'react'

const AuthErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 overflow-x-hidden">
    <div className="lg:w-3/5 flex-1 relative flex justify-center items-center">
      <div className=" bg-contain md:bg-fixed bg-center absolute inset-0 bg-[url('/showcase/cat.png')] md:bg-[url('/showcase/plant.png')]" />
      <div className="bg-white bg-opacity-45 rounded-lg shadow-md p-8 md:mx-8 relative z-10">
        <ErrorCard />
      </div>
    </div>
  </div>
  )
}

export default AuthErrorPage
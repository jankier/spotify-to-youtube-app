import React from 'react'

function SomethingWentWrong() {
  return (
    <div className="mt-40 md:mt-60 grow-0 flex flex-col items-center justify-center">
      <img width="100" height="100" src="https://img.icons8.com/ios/100/broken-robot.png" alt="broken-robot"/>
      <div className="p-2 md:p-2 rounded-2xl">
        <h1 className="text-l text-center text-black dark:text-white font-semibold duration-500">
          Something went wrong ...<br></br>
          Try again later
        </h1>
      </div>
    </div>
  )
}

export default SomethingWentWrong
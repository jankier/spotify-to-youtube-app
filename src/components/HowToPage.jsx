import React from 'react'

function HowToPage() {
  return (
    <div className="mt-20 md:mt-48 grow-0 flex items-center justify-center">
    <div className="p-8 md:p-10 rounded-2xl">
      <h1 className="text-2xl text-center text-black dark:text-white font-semibold duration-500">
        This is the app that allows to transfer users playlist between two different music providers.
      </h1>
      <h2 className="mt-5 justify-center text-center text-xl text-black dark:text-white font-semibold duration-500">
        To move the playlist, one have to log in to <span className="text-custom-red">YouTube</span> account and complete authentication.
      </h2>
      <h2 className="justify-center text-center text-xl text-black dark:text-white font-semibold duration-500">
        In order to use the application input the link to <span className="text-custom-green">Spotify
            </span> playlist.<br></br>
            App will automatically iterate through playlist and find couterpart song on <span className="text-custom-red">YouTube</span><br></br>
            creating playlist of specified name or adding new songs to already existing playlist.
      </h2>
    </div>
  </div>
  )
}

export default HowToPage
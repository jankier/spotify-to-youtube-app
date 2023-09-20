import React from 'react'

function YoutubeLogoutPage() {

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  }

  return (
    <div className="mt-56 md:mt-52 items-center justify-center flex-col ">
      <div className="log-in mt-2 align-middle mx-auto max-w-sm md:max-w-xl border p-6 md:p-8 rounded-2xl shadow-md dark:shadow-neutral-800">
        <h1 className="text-3xl text-center text-black dark:text-white font-semibold duration-500">
            Sign out from <span className="text-custom-red">YouTube</span>
        </h1>
        <div className=" pt-4 max-w-md m-auto flex flex-col">
          <button onClick={logout} className="bg-custom-green p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500 select-none">Sign out</button>
          <div className="text-xs text-center mt-3 text-gray-500">
            Click Sign out to logout from YouTube account.
          </div>
        </div>
      </div>
    </div>
  )
}

export default YoutubeLogoutPage
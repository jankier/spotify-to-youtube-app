import React from "react";
import "./YoutubeLoginPage.css";

function YoutubeLoginPage() {
  const google = () => {
    window.open("http://localhost:5000/auth/youtube", "_self");
  };

  return (
    <div className="mt-56 md:mt-52 items-center justify-center flex-col ">
      <div className="log-in mt-2 align-middle mx-auto max-w-sm md:max-w-xl border p-6 md:p-8 rounded-2xl shadow-md dark:shadow-neutral-800">
        <h1 className="text-3xl text-center text-black dark:text-white font-semibold duration-500">
          Sign in to <span className="text-custom-red">YouTube</span>
        </h1>
        <div className=" pt-4 max-w-md m-auto flex flex-col">
          <button
            onClick={google}
            className="bg-custom-green p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500 select-none"
          >
            Sign in
          </button>
          <div className="text-xs text-center mt-3 text-gray-500">
            Click Sign in to proceed to YouTube authentication.
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubeLoginPage;

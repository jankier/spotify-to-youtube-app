function IndexPage() {

    return (
      <div className="mt-20 md:mt-44 grow-0 flex items-center justify-center">
        <div className="border p-8 md:p-10 rounded-2xl shadow-md dark:shadow-neutral-800">
          <h1 className="text-3xl text-center text-black dark:text-white font-semibold duration-500">
            Convert <span className="text-custom-green">Spotify
            </span> Playlist to <span className="text-custom-red">Youtube</span>
          </h1>
          <form className="pt-4 max-w-md mx-auto">
            <input className="w-full border my-3 py-2 px-3 rounded-2xl outline-none" 
            type="text"
            placeholder="Link to playlist"/>
          <button className="bg-custom-green p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500">Convert</button>
          <div className="text-xs text-center py-2 text-gray-500">
            CLick to convert your playlist.
          </div>
          </form>
        </div>
      </div>
    )
  }
  
  export default IndexPage
import { useEffect, useState } from "react";
import './IndexPage.css'
function IndexPage() {

  var error_bar = document.getElementsByClassName("error-bar");
  var spotify_link = document.getElementsByClassName("spotify-link");

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [visibleDiv, setVisibleDiv] = useState(false);


  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials&client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID + "&client_secret=" + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
    }
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  const enterPressed = (event) => {
    if(event.keyCode === 13){
      getPlaylist();
    }
  }

  async function getPlaylist() {
    if(searchInput === ""){
      error_bar[0].style.display = "flex";
      return;
    }
    try{
      var playlistID = searchInput.split("/").pop().split("?")[0];
      var playlistParameters = {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + accessToken
        }
      }
    await fetch("https://api.spotify.com/v1/playlists/" + playlistID + "/tracks/" +
    "?fields=items%28track%28id%2Cname%2Cexternal_urls%2Cartists%28name%29%2Calbum%28images%2Cname%29%29%29", playlistParameters)
      .then(response => response.json())
      .then(data => {
        if(!data.error){
          error_bar[0].style.display = "none";
          setTracks(data.items);
        }
        else{
          console.log(data.error);
          error_bar[0].style.display = "flex";
          spotify_link[0].value = "";
        }
      });
      spotify_link[0].value = "";
      setVisibleDiv(true);
    }
    catch(error){
      console.log(error);
      error_bar[0].style.display = "block";
      spotify_link[0].value = "";
    }
    return;
  }

  const removeTrack = (id) => { 
    const newTracks = tracks.filter((track) => track.track.id !== id); 
    setTracks(newTracks); 
  }

  const getTitles = () => {
    var interval = 1000;
    tracks.forEach((track, idx) => {
      setTimeout(() => {
        fetchYoutubeSong(track.track.artists[0].name + "%20" + track.track.name);
      }, idx * interval)
    })
  }

  async function fetchYoutubeSong(element) {
    
    var songParameters = {
      method: "GET"
    }
    await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=viewCount&q=" + element + "%C3%A1&key=" + process.env.REACT_APP_YOUTUBE_API_KEY, songParameters)
      .then(response => response.json())
      .then(data => {console.log(data.items)})
  }
    return (
      <div className="mt-20 md:mt-44 items-center justify-center flex-col">
        <div className="m-auto max-w-sm md:max-w-xl border p-6 md:p-8 rounded-2xl shadow-md dark:shadow-neutral-800">
          <h1 className="text-3xl text-center text-black dark:text-white font-semibold duration-500">
            Convert <span className="text-custom-green">Spotify
            </span> Playlist to <span className="text-custom-red">YouTube</span>
          </h1>
          <div className=" pt-4 max-w-md m-auto flex flex-col">
            <input onChange={event => setSearchInput(event.target.value)} 
                   onKeyDown={enterPressed} 
                   className="spotify-link w-full border my-3 py-2 px-3 rounded-2xl outline-none" 
            type="text"
            placeholder="Link to playlist"/>
            <div className="error-bar text-orange-500 flex mb-3 duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <div className='error-text ml-2'>Please enter valid Spotify playlist link.</div>
            </div>
            <button onClick={getPlaylist} className="bg-custom-green p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500">Load playlist</button>
            <button onClick={getTitles} className="bg-custom-green mt-3 p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500">Convert</button>
            <div className="text-xs text-center mt-3 text-gray-500">
              Click Load playlist to obtain the tracks.<br></br>
              Click Convert to transfer your playlist.
            </div>
          </div>
        </div>
        <div className="m-auto flex-col justify-center bg-stone-50 dark:bg-gray-800">
          <div className={`visible-div ${visibleDiv ? 'active' : 'inactive'} text-xs text-center mt-3 text-gray-500`}>
            Click on a song banner to open it with Spotify.<br></br>
            Click the trashcan icon to delete a song from the playlist.
          </div>
          {tracks.map((track) =>{
            return(
              <>
              <div key={track.track.id} className="flex justify-center items-center m-2">
                <div className="w-80 md:w-1/4 h-20 flex items-center border rounded-md shadow-md dark:shadow-neutral-800 text-black dark:text-white font-semibold hover:">
                  <a href={track.track.external_urls.spotify} target="_blank" rel="noreferrer" className="pl-2 shrink-0">
                    <img src={track.track.album.images[2].url} alt="song cover"></img>
                  </a>
                  <span className="ml-2 truncate overflow-hidden">
                    {track.track.name}<br></br>
                    {track.track.artists[0].name}
                  </span>
                </div>
                <div className="ml-2">
                  <button onClick={() => removeTrack(track.track.id)} className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              </>
            )
          })}
        </div>
      </div>
    )
  }

  export default IndexPage
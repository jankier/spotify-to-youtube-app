import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaylistFinalizationPage.css";

function PlaylistFinalizationPage({user, playlist}) {

  const navigate = useNavigate();

  var error_bar = document.getElementsByClassName("error-bar");
  var name_used = document.getElementsByClassName("name-used");
  var playlist_name = document.getElementsByClassName("playlist-name");

  var newPlaylistData = [];
  // name_used[0].style.display = "none";

  const [input, setInput] = useState("");
  const [playlistList, setPlaylistList] = useState("");

  useEffect(() => {
    var playParameters = {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + user[1],
        "Accept": "application/json"
      }
    }
    fetch("https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&key=" + process.env.REACT_APP_YOUTUBE_API_KEY, playParameters)
      .then(result => result.json())
      .then(data => {
        if(!data.error){
          setPlaylistList(data.items)
        }
        else{
          console.log(data.error);
          navigate("/SomethingWentWrong")
        }
      });
  }, [])

  const enterPressed = (event) => {
    if(event.keyCode === 13){
        createPlaylist();
    }
  }

  const addToPlaylist = () => {
    const interval = 1000;
    const promises = [];
    playlist.forEach((song, idx) => {
      setTimeout(() => {
        var videoId = song.id.videoId;
        promises.push(postToAddToPlaylist(videoId));
      }, idx * interval)
    })
    Promise.all(promises)
    .then(() => navigate("/"))
  }

  async function createPlaylist() {
    if(input === ""){
      error_bar[0].style.display = "flex";
      return;
    }
    var i = playlistList.length;
    while (i--) {
      if (playlistList[i].snippet.title === input){
        name_used[0].style.display = "flex";
        return;
      }
    }
    var playlistParameters = {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + user[1],
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "snippet": {
          "title": input
        }
      })
    }
    await fetch("https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&key=" + process.env.REACT_APP_YOUTUBE_API_KEY, playlistParameters)
      .then(response => response.json())
      .then(data => {
        if(!data.error){
          newPlaylistData = data;
        }
        else{
          console.log(data.error);
          playlist_name[0].value = "";
        }
      })
      .then(() => addToPlaylist());
      error_bar[0].style.display = "none";
      name_used[0].style.display = "none";
  }

  async function postToAddToPlaylist(songId) {
    var playlistParameters = {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + user[1],
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "snippet": {
          "playlistId": newPlaylistData.id,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": songId
          }
        }
      })
    }
    return fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=" + process.env.REACT_APP_YOUTUBE_API_KEY, playlistParameters)
      .then(response => response.json())
      .then(data => {
        if(!data.error){
          console.log(data);
        }
        else{
          console.log(data.error);
          navigate("/SomethingWentWrong")
        }
      });
  }

  return (
      <div className="mt-40 md:mt-44 items-center justify-center flex-col">
        <div className="m-auto max-w-sm md:max-w-xl border p-6 md:p-8 rounded-2xl shadow-md dark:shadow-neutral-800">
          <h1 className="text-3xl text-center text-black dark:text-white font-semibold duration-500">
            Specify name of the playlist
          </h1>
          <div className="pt-4 max-w-md m-auto flex flex-col">
            <input onChange={event => setInput(event.target.value)} 
                   onKeyDown={enterPressed} 
                   className="playlist-name w-full border my-3 py-2 px-3 rounded-2xl outline-none select-none" 
            type="text"
            placeholder="Name"/>
            <div className="error-bar text-orange-500 flex mb-3 duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div className='ml-2'>This field cannot be empty.</div>
            </div>
            <div className="name-used text-orange-500 flex mb-3 duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div className='ml-2'>Playlist of this name already exist.</div>
            </div>
            <button onClick={createPlaylist} className="bg-custom-green p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500 select-none">Proceed</button>
            <div className="text-xs text-center mt-3 text-gray-500">
              Click Proceed to obtain playlist.<br></br>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PlaylistFinalizationPage
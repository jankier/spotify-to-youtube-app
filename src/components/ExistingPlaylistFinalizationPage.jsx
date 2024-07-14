import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExistingPlaylistFinalizationPage.css";

function ExistingPlaylistFinalizationPage({ user, playlist }) {
  const navigate = useNavigate();

  var error_bar = document.getElementsByClassName("error-bar");

  const [playlistList, setPlaylistList] = useState([]);
  const [newPlaylistData, setnewPlaylistData] = useState({});
  const [menuState, setMenuState] = useState(false);
  const [menuText, setmenuText] = useState("Select");
  console.log(newPlaylistData);

  function handleSelect(name, playlist) {
    setMenuState(!menuState);
    setmenuText(name);
    setnewPlaylistData(playlist);
  }

  useEffect(() => {
    var playParameters = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user[1],
        Accept: "application/json",
      },
    };
    fetch(
      "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&key=" +
        process.env.REACT_APP_YOUTUBE_API_KEY,
      playParameters
    )
      .then((result) => result.json())
      .then((data) => {
        if (!data.error) {
          // console.log(data);
          setPlaylistList(data.items);
        } else {
          console.log(data.error);
          navigate("/SomethingWentWrong");
        }
      });
  }, [user, navigate]);

  const addToPlaylist = () => {
    if (Object.keys(newPlaylistData).length === 0) {
      error_bar[0].style.display = "flex";
      return;
    }
    const interval = 1000;
    const promises = [];
    playlist.forEach((song, idx) => {
      setTimeout(() => {
        var videoId = song.id.videoId;
        promises.push(postToAddToPlaylist(videoId));
      }, idx * interval);
    });
    Promise.all(promises).then(() => navigate("/"));
  };

  async function postToAddToPlaylist(songId) {
    var playlistParameters = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user[1],
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          playlistId: newPlaylistData.id,
          resourceId: {
            kind: "youtube#video",
            videoId: songId,
          },
        },
      }),
    };
    return fetch(
      "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=" +
        process.env.REACT_APP_YOUTUBE_API_KEY,
      playlistParameters
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
        } else {
          console.log(data.error);
          navigate("/SomethingWentWrong");
        }
      });
  }

  return (
    <div className="mt-40 md:mt-44 items-center justify-center flex-col">
      <div className="m-auto max-w-sm md:max-w-xl border p-6 md:p-8 rounded-2xl shadow-md dark:shadow-neutral-800">
        <h1 className="text-3xl text-center text-black dark:text-white font-semibold duration-500">
          Select one of the existing playlists
        </h1>
        <div className="pt-4 max-w-md m-auto flex flex-col">
          <div className="select-none duration-500">
            <div
              className={`border my-3 py-2 px-3 rounded-2xl outline-none text-gray-400 bg-stone-50 cursor-pointer drop-menu ${
                menuState === false ? "" : "border-b-0 rounded-b-none"
              }`}
            >
              <div
                className="flex justify-between"
                onClick={() => {
                  setMenuState(!menuState);
                }}
              >
                {menuText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-5 duration-500 drop-icon ${
                    menuState === false ? "open" : "close"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <ul
                className={`absolute z-10 border border-t-0 pb-2 px-3 rounded-t-none rounded-2xl outline-none bg-stone-50 drop-list ${
                  menuState === false ? "open" : "close"
                }`}
              >
                {playlistList.map((element, index) => {
                  if (element === null) {
                    console.log(index);
                    console.log(element);
                  }
                  return (
                    <li
                      key={index}
                      className="hover:text-black my-3"
                      onClick={() => {
                        handleSelect(element.snippet.localized.title, element);
                      }}
                    >
                      {element.snippet.localized.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="error-bar text-orange-500 flex mb-3 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <div className="ml-2">
              You must select one of existing playlists.
            </div>
          </div>
          <button
            onClick={addToPlaylist}
            className="bg-custom-green p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500 select-none"
          >
            Proceed
          </button>
          <div className="text-xs text-center mt-3 text-gray-500">
            Click Proceed to obtain playlist.<br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExistingPlaylistFinalizationPage;

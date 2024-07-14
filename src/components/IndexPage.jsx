import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IndexPage.css";

function IndexPage({ user, setPlaylist }) {
  const navigate = useNavigate();

  var error_bar = document.getElementsByClassName("error-bar");
  var no_user = document.getElementsByClassName("no-user");
  var spotify_link = document.getElementsByClassName("spotify-link");
  var no_preview = document.getElementsByClassName("no-preview");
  var play_button = document.getElementsByClassName("play-button");
  var stop_button = document.getElementsByClassName("stop-button");
  const audio = new Audio();
  const youtubeplaylist = [];

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [visibleDiv, setVisibleDiv] = useState(false);

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        process.env.REACT_APP_SPOTIFY_CLIENT_ID +
        "&client_secret=" +
        process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  const enterPressed = (event) => {
    if (event.keyCode === 13) {
      getPlaylist();
    }
  };

  async function getPlaylist() {
    if (searchInput === "") {
      error_bar[0].style.display = "flex";
      return;
    }
    try {
      var playlistID = searchInput.split("/").pop().split("?")[0];
      var playlistParameters = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      // items(track(id,name,external_urls,duration_ms,preview_url,artists(name),album(images,name)))
      await fetch(
        "https://api.spotify.com/v1/playlists/" +
          playlistID +
          "/tracks" +
          "?fields=items%28track%28id%2Cname%2Cexternal_urls%2Cduration_ms%2Cpreview_url%2Cartists%28name%29%2Calbum%28images%2Cname%29%29%29",
        playlistParameters
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            error_bar[0].style.display = "none";
            setTracks(data.items);
            setVisibleDiv(true);
          } else {
            console.log(data.error);
            error_bar[0].style.display = "flex";
            spotify_link[0].value = "";
            setVisibleDiv(false);
          }
        });
      spotify_link[0].value = "";
    } catch (error) {
      console.log(error);
      error_bar[0].style.display = "flex";
      spotify_link[0].value = "";
      setVisibleDiv(false);
    }
  }

  const removeTrack = (id) => {
    const newTracks = tracks.filter((track) => track.track.id !== id);
    setTracks(newTracks);
  };

  const playPreview = (song, id) => {
    audio.src = song;
    if (play_button[id].classList.contains("hidden")) {
      audio.pause();
      play_button[id].classList.remove("hidden");
      play_button[id].classList.add("block");
      stop_button[id].classList.remove("block");
      stop_button[id].classList.add("hidden");
    } else {
      audio.volume = 0.2;
      var playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            play_button[id].classList.remove("block");
            play_button[id].classList.add("hidden");
            stop_button[id].classList.remove("hidden");
            stop_button[id].classList.add("block");
          })
          .catch((error) => {
            play_button[id].classList.remove("hidden");
            play_button[id].classList.add("block");
            stop_button[id].classList.remove("block");
            stop_button[id].classList.add("hidden");
            no_preview[id].style.display = "flex";
            console.log(error);
          });
      }
      tracks.forEach((track, idx) => {
        if (idx !== id) {
          play_button[idx].classList.remove("hidden");
          play_button[idx].classList.add("block");
          stop_button[idx].classList.remove("block");
          stop_button[idx].classList.add("hidden");
        }
      });
      audio.addEventListener("ended", () => {
        play_button[id].classList.remove("hidden");
        play_button[id].classList.add("block");
        stop_button[id].classList.remove("block");
        stop_button[id].classList.add("hidden");
      });
    }
  };

  const getTitlesToNewPlaylist = () => {
    if (user) {
      const interval = 1000;
      no_user[0].style.display = "none";
      const promises = [];
      tracks.forEach((track, idx) => {
        setTimeout(() => {
          var artistName = track.track.artists[0].name.replaceAll(" ", "%20");
          var songName = track.track.name.replaceAll(" ", "%20");
          promises.push(fetchYoutubeSong(artistName + "%20" + songName));
        }, idx * interval);
      });
      Promise.all(promises)
        .then(() => setPlaylist(youtubeplaylist))
        .then(() => navigate("/NewPlaylistFinalizationPage"));
    } else {
      no_user[0].style.display = "flex";
    }
  };

  const getTitlesToExistingPlaylist = () => {
    if (user) {
      const interval = 1000;
      no_user[0].style.display = "none";
      const promises = [];
      tracks.forEach((track, idx) => {
        setTimeout(() => {
          var artistName = track.track.artists[0].name.replaceAll(" ", "%20");
          var songName = track.track.name.replaceAll(" ", "%20");
          promises.push(fetchYoutubeSong(artistName + "%20" + songName));
        }, idx * interval);
      });
      Promise.all(promises)
        .then(() => setPlaylist(youtubeplaylist))
        .then(() => navigate("/ExistingPlaylistFinalizationPage"));
    } else {
      no_user[0].style.display = "flex";
    }
  };

  async function fetchYoutubeSong(element) {
    var songParameters = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user[1],
      },
    };
    return fetch(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=" +
        element +
        "&key=" +
        process.env.REACT_APP_YOUTUBE_API_KEY,
      songParameters
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          youtubeplaylist.push(data.items[0]);
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
          Convert <span className="text-custom-green">Spotify</span> Playlist to{" "}
          <span className="text-custom-red">YouTube</span>
        </h1>
        <div className="pt-4 max-w-md m-auto flex flex-col">
          <input
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyDown={enterPressed}
            className="spotify-link w-full border my-3 py-2 px-3 rounded-2xl outline-none select-none"
            type="text"
            placeholder="Link to playlist"
          />
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
              Please enter valid Spotify playlist link.
            </div>
          </div>
          <button
            onClick={getPlaylist}
            className="bg-custom-green p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500 select-none"
          >
            Load spotify playlist
          </button>
          <button
            onClick={getTitlesToNewPlaylist}
            className="bg-custom-green mt-3 p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500 select-none"
          >
            Convert and create new playlist
          </button>
          <button
            onClick={getTitlesToExistingPlaylist}
            className="bg-custom-green mt-3 p-2 w-full text-white rounded-2xl hover:bg-custom-red duration-500 select-none"
          >
            Convert and add to existing playlist
          </button>
          <div className="no-user hidden text-orange-500 mt-3 duration-500">
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
              Please sign in to YouTube account to convert playlist.
            </div>
          </div>
          <div className="text-xs text-center mt-3 text-gray-500">
            Click Load playlist to obtain the tracks.<br></br>
            Select suitable convertion method.
          </div>
        </div>
      </div>
      <div className="m-auto flex-col justify-center bg-stone-50 dark:bg-gray-800">
        <div
          className={`visible-div ${
            visibleDiv ? "active" : "inactive"
          } text-xs text-center mt-3 text-gray-500`}
        >
          Click on song banner to preview the song.<br></br>
          Click on song name/artist to open it with Spotify.<br></br>
          Click the trashcan icon to remove song from playlist.<br></br>
        </div>
        {tracks.map((track, index) => {
          if (
            track === null ||
            track.track === null ||
            track.track.name === null
          ) {
            console.log(index);
            console.log(track);
          }
          return (
            <>
              <div
                key={track.track.id}
                className="flex flex-col justify-center items-center m-2"
              >
                <div className="flex justify-center items-center">
                  <div className="ml-8 w-2/3 md:w-96 h-20 flex items-center border rounded-md shadow-md dark:shadow-neutral-800 text-black dark:text-white font-semibold">
                    <div className="song-cover shrink-0">
                      <img
                        className="pl-2"
                        src={track.track.album.images[2].url}
                        alt="song cover"
                      ></img>
                      <button
                        tabIndex="0"
                        className="play-button block absolute pl-1 text-white"
                      >
                        <svg
                          onClick={() => {
                            playPreview(
                              track.track.preview_url,
                              index,
                              track.track.duration_ms
                            );
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        tabIndex="0"
                        className="stop-button hidden absolute pl-1 text-white"
                      >
                        <svg
                          onClick={() => {
                            playPreview(track.track.preview_url, index);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <a
                      href={track.track.external_urls.spotify}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 mr-2 truncate flex flex-col"
                    >
                      <span>{track.track.name}</span>
                      <span>{track.track.artists[0].name}</span>
                    </a>
                  </div>
                  <div className="ml-2">
                    <button
                      onClick={() => removeTrack(track.track.id)}
                      className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="no-preview text-orange-500 flex justify-center items-center mb-1 duration-500">
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
                      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                  <div className="ml-2">
                    Sorry Spotify didn't provide preview for that song.
                  </div>
                </div>
              </div>
              {/* {isLoading ? <div>Loading</div> : <div>Content</div>} */}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default IndexPage;

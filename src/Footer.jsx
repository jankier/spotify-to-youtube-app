function Footer() {
    return (
      <div className="text-xs md:text-lg font-semibold mt-auto p-5 bg-amber-300 dark:bg-gray-900 flex items-center justify-between shadow border-t">
          <span className="duration-500 text-black dark:text-stone-50">
              © 2023 SpotifyToYoutube™
          </span>
          <div className="flex gap-3 mr-4 items-center">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-black dark:text-stone-50 hover:text-blue-500 dark:hover:text-blue-500 duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256">
                      <g fill="currentColor"  stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{'mixBlendMode': 'normal'}}><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z"></path></g></g>
                  </svg>
              </a>
              <a href="https://open.spotify.com/" target="_blank" rel="noreferrer" className="text-black dark:text-stone-50 hover:text-custom-green dark:hover:text-custom-green duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0,0,256,256">
                      <g fill="currentColor" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{'mixBlendMode': 'normal'}}><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.6,0 -12,5.4 -12,12c0,6.6 5.4,12 12,12c6.6,0 12,-5.4 12,-12c0,-6.6 -5.4,-12 -12,-12zM19.731,21c-0.22,0 -0.33,-0.11 -0.55,-0.22c-1.65,-0.991 -3.74,-1.54 -5.94,-1.54c-1.21,0 -2.53,0.22 -3.63,0.44c-0.22,0 -0.44,0.11 -0.55,0.11c-0.44,0 -0.77,-0.33 -0.77,-0.77c0,-0.44 0.22,-0.77 0.66,-0.77c1.43,-0.33 2.861,-0.55 4.401,-0.55c2.53,0 4.84,0.66 6.82,1.76c0.22,0.22 0.44,0.33 0.44,0.77c-0.222,0.55 -0.552,0.77 -0.881,0.77zM20.94,17.921c-0.22,0 -0.44,-0.11 -0.66,-0.22c-1.87,-1.21 -4.511,-1.87 -7.37,-1.87c-1.43,0 -2.751,0.22 -3.74,0.44c-0.22,0.11 -0.33,0.11 -0.55,0.11c-0.55,0 -0.881,-0.44 -0.881,-0.881c0,-0.55 0.22,-0.77 0.77,-0.991c1.32,-0.33 2.641,-0.66 4.511,-0.66c3.08,0 5.94,0.77 8.361,2.2c0.33,0.22 0.55,0.55 0.55,0.881c-0.111,0.55 -0.44,0.991 -0.991,0.991zM22.37,14.4c-0.22,0 -0.33,-0.11 -0.66,-0.22c-2.2,-1.21 -5.39,-1.98 -8.47,-1.98c-1.54,0 -3.19,0.22 -4.621,0.55c-0.22,0 -0.33,0.11 -0.66,0.11c-0.66,0.111 -1.1,-0.44 -1.1,-1.099c0,-0.659 0.33,-0.991 0.77,-1.1c1.761,-0.441 3.631,-0.661 5.611,-0.661c3.41,0 6.93,0.77 9.681,2.2c0.33,0.22 0.66,0.55 0.66,1.1c-0.11,0.66 -0.551,1.1 -1.211,1.1z"></path></g></g>
                  </svg>
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="text-black dark:text-stone-50 hover:text-custom-red dark:hover:text-custom-red duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="45" height="45" viewBox="0 0 64 64">
                      <g fill="currentColor"><path d="M53.527,17.427C55.714,19.677,56,23.252,56,32s-0.286,12.323-2.473,14.573C51.34,48.822,49.062,49,32,49	s-19.34-0.178-21.527-2.427C8.286,44.323,8,40.748,8,32s0.286-12.323,2.473-14.573S14.938,15,32,15S51.34,15.178,53.527,17.427z M27.95,39.417l12.146-7.038L27.95,25.451V39.417z"></path></g>
                  </svg>
              </a>
          </div>
      </div>
    )
  }
  
  export default Footer
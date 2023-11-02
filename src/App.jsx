import { Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import PlaylistFinalizationPage from './components/PlaylistFinalizationPage';
import YoutubeLoginPage from './components/YoutubeLoginPage';
import YoutubeLogoutPage from './components/YoutubeLogoutPage';
import SomethingWentWrong from './components/SomethingWentWrong';
import HowToPage from './components/HowToPage';
import Footer from './Footer';
import Header from './Header';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success",{
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(response => {
        if(response.status === 200) return response.json();
        throw new Error("authentication failed")
      }).then(resObject => {
        setUser(resObject.user);
      }).catch(err => {
        console.log(err);
      })
    };
    getUser();
  }, []);

  return (
    <div className='h-screen flex flex-col bg-stone-50 dark:bg-gray-800'>
      <Header user={user}/>
      <div className='bg-stone-50 dark:bg-gray-800 overflow-auto'>
        <Routes>
          <Route index element={<IndexPage user={user} setPlaylist={setPlaylist}/>}/>
          <Route path='/PlaylistFinalizationPage' element={<PlaylistFinalizationPage user={user} playlist={playlist}/>}/>
          <Route path='/YoutubeLogin' element={<YoutubeLoginPage/>}/>
          <Route path='/YoutubeLogout' element={<YoutubeLogoutPage/>}/>
          <Route path='/SomethingWentWrong' element={<SomethingWentWrong/>}/>
          <Route path='/Howto' element={<HowToPage/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
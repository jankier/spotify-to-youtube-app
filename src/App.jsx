import { Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import SpotifyLoginPage from './components/SpotifyLoginPage';
import YoutubeLoginPage from './components/YoutubeLoginPage';
import AboutUs from './components/AboutUs';
import HowToPage from './components/HowToPage';
import Footer from './Footer';
import Header from './Header';

function App() {
  return (
    <div className='h-screen flex flex-col bg-stone-50 dark:bg-gray-800'>
      <Header/>
      <div className='bg-stone-50 dark:bg-gray-800 overflow-auto'>
        <Routes>
          <Route index element={<IndexPage/>}/>
          <Route path='/SpotifyLogin' element={<SpotifyLoginPage/>}/>
          <Route path='/YoutubeLogin' element={<YoutubeLoginPage/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/Howto' element={<HowToPage/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;

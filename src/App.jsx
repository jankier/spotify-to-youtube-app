import { Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Layout from './Layout';
import SpotifyLoginPage from './components/SpotifyLoginPage';
import YoutubeLoginPage from './components/YoutubeLoginPage';
import AboutUs from './components/AboutUs';
import HowToPage from './components/HowToPage';

function App() {
  return (
    <div className='bg-stone-50 dark:bg-gray-800'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='/SpotifyLogin' element={<SpotifyLoginPage/>}/>
          <Route path='/YoutubeLogin' element={<YoutubeLoginPage/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/Howto' element={<HowToPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

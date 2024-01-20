import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Write from './pages/Write';
import Header from './components/Header';
import Footers from './components/Footers';
import Profile from './pages/Profile';
import SinglePage from './pages/SinglePage';
import IndividualPosts from './pages/IndividualPosts';
import IndividualCategories from './pages/IndividualCategories';
import { ContextProvider } from '../context/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          <main className='flex-grow'>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/write' element={<Write />} />
              <Route path='/post/:id' element={<SinglePage />} />
              <Route path='/individual-posts' element={<IndividualPosts />} />
              <Route
                path='/individual-categories'
                element={<IndividualCategories />}
              />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </main>
          <Footers />
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;

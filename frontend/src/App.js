import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Search from './pages/Search';
import Series from './pages/Series';
import Movies from './pages/Movies';
import Footer from './components/Footer';
import Trending from './pages/Trending';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

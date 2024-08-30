import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MyNav from './components/MyNav';
import MyFooter from './components/MyFooter';
import MeteoList from './components/MeteoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound';
import MeteoDetails from './components/MeteoDetails';

function App() {
  return (
    <BrowserRouter>
    <header>
      <MyNav></MyNav>
    </header>
    <main>
    
      <Routes>
     
      <Route path="/" element={ <MeteoList></MeteoList>  } />
      
      <Route path="*" element={<NotFound />} />
      <Route path="/city-details/:cityId" element={<MeteoDetails />} />
      </Routes>
  
    </main>
    <footer>
      <MyFooter></MyFooter>
    </footer>
    </BrowserRouter>
  );
}

export default App;

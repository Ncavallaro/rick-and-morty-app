import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/header/nav';
import ItemListContainer from './components/body/itemListContainer';
import CharacterDetail from './components/body/characterDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<ItemListContainer />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
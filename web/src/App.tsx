import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import Home from './paginas/Home';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/admin' element={<PaginaBaseAdmin />}>
      </Route>
    </Routes>
  );
}

export default App;

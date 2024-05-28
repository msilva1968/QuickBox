import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import Home from './paginas/Home';
import NotFound from './paginas/NotFound';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/admin' element={<PaginaBaseAdmin />}>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import Home from './paginas/Home';
import NotFound from './paginas/NotFound';
import PaginaBase from './componentes/PaginaBase';
import React, { Suspense } from 'react';
import { paginaBaseAdmin } from './types/PaginaAdministracao';
import { useItemPagina } from './state/hooks/useItemPagina';
import Login from './paginas/Administracao/Login';
import Confirmar_Entrega from './paginas/Administracao/Confirmar_Entrega';

function App() {
  const itemsPaginaAdmin = useItemPagina()

  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PaginaBase />} >
              <Route index element={<Home />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={`${paginaBaseAdmin}Confirmar_Entrega`} element={<Confirmar_Entrega />} />
              <Route path={`${paginaBaseAdmin}`} element={<PaginaBaseAdmin />} >
                {itemsPaginaAdmin.menu.map(item => {
                  const Component = React.lazy(() => import(`./paginas/Administracao/${item}`));
                  return (
                    <>
                      <Route
                        key={`${itemsPaginaAdmin.nomePagina}${item}`}
                        path={`${paginaBaseAdmin}/${item}`}
                        element={<Component />} />
                      <Route
                        key={`${itemsPaginaAdmin.nomePagina}${item}/:id`}
                        path={`${paginaBaseAdmin}${item}/:id`}
                        element={<Component />} />
                    </>
                  );
                })}
              </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
  );
}

export default App;

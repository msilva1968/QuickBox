import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../componentes/Banner';
import NavBar from '../../componentes/NavBar';
import Rodape from '../../componentes/Rodape';
import estilos from './Home.module.scss';

function App() {
  return (
    <>
      <NavBar />
      <Banner />
      <div className={estilos.MiniBanners}>
        <div className={estilos.CardCentral}>
          <h2>Quick Box</h2>
          <div>
            <p>seja um parceiro agora:</p>
            <p>ligue para <a href="callto:99999999999">(99) 99999-999</a></p>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
}

export default App;

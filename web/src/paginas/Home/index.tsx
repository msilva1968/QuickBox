import Banner from '../../componentes/Banner';
import estilos from './Home.module.scss';

function App() {
  return (
    <section>
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
    </section>
  );
}

export default App;

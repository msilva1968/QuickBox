
import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom'
import { IItemPagina } from '../../Interfaces/IItemPagina';
import { useSetItemPagina } from '../../state/hooks/useSetItemPagina';

const NavBar = () => {
  const setItemPagina = useSetItemPagina()
  function quandoClicar(itemPagina: IItemPagina) {
    if (itemPagina){
      setItemPagina(itemPagina);
    }
  }
  return (<nav className={estilos.Link}>
    <ul>
      <li>
        <Link to="/"
          onClick={evento => quandoClicar({ nomePagina: 'Home', menu: [''] })}
        >Home</Link>
      </li>
      <li>
        <Link to="/admin" 
            onClick={evento => quandoClicar({ nomePagina: 'Empresas', menu: ['Listar', 'Cadastrar'] })} >
            Empresas
        </Link>
      </li>
      <li>
        <Link to="/admin" 
          onClick={evento => quandoClicar({ nomePagina: 'Entregadores', menu: ['Listar', 'Cadastrar'] })} >
          Entregadores
        </Link>
      </li>
    </ul>
  </nav>)
}

export default NavBar
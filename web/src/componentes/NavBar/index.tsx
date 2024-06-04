
import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom'
import { IItemPagina } from '../../Interfaces/IItemPagina';
import { useSetItemPagina } from '../../state/hooks/useSetItemPagina';
import { useToken } from '../../state/hooks/useToken';

const NavBar = () => {
  const setItemPagina = useSetItemPagina()
  const tokenLogin = useToken()
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
            onClick={evento => quandoClicar(
              tokenLogin === 'EMPRESA' ?
              { nomePagina: 'Empresas', menu: 
            [//'Listar', 
             'Cadastrar', 
             'Cadastro_Entregas'
             ] } : {nomePagina: 'Empresas', menu: ['Cadastrar'] })} >
            Empresas
        </Link>
      </li>
      <li>
        <Link to="/admin" 
          onClick={evento => quandoClicar(
            tokenLogin === 'ENTREGADOR' ? { nomePagina: 'Entregadores', menu: 
          [//'Listar', 
          'Cadastrar',
          'Confirmar_Entrega'] } : {nomePagina: 'Entregadores', menu: ['Cadastrar'] })} >
          Entregadores
        </Link>
      </li>
      <Link to="/Login" className={estilos.Botao}
          onClick={evento => quandoClicar({ nomePagina: 'Login', menu: ['Login'] })}
      >
        Login
      </Link>
    </ul>
  </nav>)
}

export default NavBar

import estilos from './NavBar.module.scss';
import { Link  } from 'react-router-dom'
import { IItemPagina } from '../../Interfaces/IItemPagina';
import { useSetItemPagina } from '../../state/hooks/useSetItemPagina';
import { useToken } from '../../state/hooks/useToken';
import { useIdLogado } from '../../state/hooks/useIdLogado';
import { useSetToken } from '../../state/hooks/useSetToken';
import { useSetIdLogado } from '../../state/hooks/useSetIdLogado';

const NavBar = () => {
  const setItemPagina = useSetItemPagina()
  const setTokenLogin = useSetToken()
  const setIdLogado = useSetIdLogado()
  const tokenLogin = useToken()
  const idLogado = useIdLogado().nome


  function quandoClicar(itemPagina: IItemPagina) {
    if (idLogado.length > 0 && itemPagina.menu[0] === 'Login') {
      setTokenLogin('');
      setIdLogado({id: '', nome: ''});
    } 
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
            ['Dados_Empresa',
             'Dashboard', 
             'Cadastro_Entregas'
             ] } : {nomePagina: 'Empresas', menu: ['Cadastrar'] })} >
            Empresas
        </Link>
      </li>
      <li>
        <Link to="/admin" 
          onClick={evento => quandoClicar(
            tokenLogin === 'ENTREGADOR' ? { nomePagina: 'Entregadores', menu: 
          [ 'Dados_Entregador',
            'Dashboard', 
            'Coletar',
          ] } : {nomePagina: 'Entregadores', menu: ['Cadastrar'] })} >
          Entregadores
        </Link>
      </li>
      <Link to="/Login" className={estilos.Botao}
          onClick={evento => quandoClicar({ nomePagina: 'Login', menu: ['Login'] })}
      >
        {tokenLogin.length > 0 ? 'Sair' : 'Login'}
      </Link>
      {tokenLogin.length > 0 ? (<label className={estilos.Label}>{tokenLogin}: {idLogado}</label>) : null}
    </ul>
  </nav>)
}

export default NavBar
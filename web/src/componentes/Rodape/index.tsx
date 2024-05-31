import estilos from './Rodape.module.scss';

const Rodape = () => {
  return (<footer className={estilos.Rodape}>
    <div>
      <p>Copyright &copy; {new Date().getFullYear()} Quick Box</p>
    </div>
    <div>
      <ul className="social-icons">
        <li><i className="fa fa-facebook"></i></li>
        <li><i className="fa fa-twitter"></i></li>
        <li><i className="fa fa-linkedin"></i></li>
        <li><i className="fa fa-rss"></i></li>
        <li><i className="fa fa-dribbble"></i></li>
      </ul>
    </div>
    <div>
      <p>A entrega <em>mais segura!</em></p>
    </div>
  </footer>)
}

export default Rodape
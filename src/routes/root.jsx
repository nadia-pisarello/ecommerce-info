import { Link, Outlet } from "react-router-dom";
import "../styles/App.css";
export default function Root() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/login">Ingresar</Link>
          </li>
          <li>
            <Link to="/register">Registrarse</Link>
          </li>
          <li>
            <Link to="/categories">Categorias</Link>
          </li>
          <li>
            <Link to="/products">Productos</Link>
          </li>
          <li>
            <Link to="/cart-detail">Carrito</Link>
          </li>
          <li>
            <Link to="/products/create">Agregar</Link>
          </li>
          <li>
            <Link to="/products/edit/:id">Editar</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

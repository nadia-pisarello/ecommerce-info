import { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

export default function Home() {
  const { handleLogut, user } = useContext(AuthContext);
  return (
    <header className="header-home">
      <div>
        <img
          className="logo"
          src="src/assets/VERSATILIS.png"
          alt="VERSATILIS RIDE"
        />
        <h2 className="eslogan">Los mejores productos los encontrás acá</h2>
      </div>
      {/* {user.email && <button onClick={handleLogut}>Salir</button>} */}
      {user.email ? (
        <button onClick={handleLogut}>Salir</button>
      ) : (
        <Link to="/login"></Link>
      )}
    </header>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "../App.jsx";
import { URL_API } from "../constants/url-api";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const { data, loading, error } = useFetch(URL_API + "/auth/login/");
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (data && data.id) {
      console.log("ID del usuario:", data.id);
      navigate("/");
    }
    if (error) {
      console.log("Error al iniciar sesión:", error);
    }
  }, [data, error]);
  if (loading) {
    return <h2>Cargando...</h2>;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <p>Bienvenido</p>
      {!loading && (
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              handleLogin(email);
              navigate(from, { replace: true });
            }}
          >
            Iniciar sesión
          </button>
        </form>
      )}
      <div className="login-button">
        <p>Crea una cuenta si aún no la tienes</p>
        <Link to="/register">
          <button>Registrarse</button>
        </Link>
        <br />
        <Link to="/">
          <button>Cancelar</button>
        </Link>
      </div>
    </>
  );
}

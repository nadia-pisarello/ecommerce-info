import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { URL_API } from "../constants/url-api";
import "../styles/login.css";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { data, loading, error } = useFetch(URL_API + "/users");

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
      <h2>Registrarse</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        <button onClick={() => handleLogin(email)}>Aceptar</button>
      </form>
      <Link to="/">
        <button>Cancelar</button>
      </Link>
    </>
  );
}

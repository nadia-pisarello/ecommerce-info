import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";
import Root from "./routes/root";
import Home from "./routes/home";
import Login from "./routes/login";
import Registro from "./routes/register";
import Productos from "./routes/products";
import Producto from "./routes/product";
import Categorias from "./routes/categories";
import Carrito from "./routes/cart-detail";
import ProtectedRoute from "./routes/protected-route";
import Products_by_Category from "./routes/products-by-category";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AuthContext = createContext(null);
const queryClient = new QueryClient();
export default function App() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    role: "",
  });
  const [message, setMessage] = useState(null);

  const handleLogin = (email, name, role) => {
    setUser({ email, name, role });
    localStorage.setItem("user", JSON.stringify({ email, name, role }));
  };

  const handleLogout = () => {
    setUser({ email: "", name: "", role: "" });
    localStorage.removeItem("user");
  };

  const value = {
    user,
    handleLogin,
    handleLogout,
    setUser,
  };

  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );
    if (isConfirmed) {
      removeFromCart(product);
      setMessage("Producto eliminado del carrito");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Productos />} />
              <Route
                path="/product/:id"
                element={
                  <Producto
                    addToCart={addToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    removeFromCart={removeFromCart}
                  />
                }
              />
              <Route path="/categories" element={<Categorias />} />
              <Route
                path="/categories/:category/products-by-category"
                element={<Products_by_Category />}
              />
              <Route
                path="/cart-detail"
                element={
                  <Carrito
                    cart={cart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    removeFromCart={removeFromCart}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registro />} />
              <Route path="*" element={<NoMatch />} />
              <Route
                path="/products/create"
                element={
                  <ProtectedRoute>
                    <Crear-Producto />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/edit/:id"
                element={
                  <ProtectedRoute>
                    <Editar-Producto />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404!</h2>
      <p>
        <Link to="/">Oops! A ocurrido un error. Vuelva al inicio</Link>
      </p>
    </div>
  );
}

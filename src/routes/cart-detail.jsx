import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";
import { getProduct } from "./product";

export default function CartDetail({
  cart,
  setCart,
  addToCart,
  handleRemoveFromCart,
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const [showSuccessCheckout, setShowSuccessCheckout] = useState(false); // Cambiado a false inicialmente

  useEffect(() => {
    const totalPrice = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(totalPrice);

    const totalItems = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setTotalItems(totalItems);
  }, [cart]);

  const handleCheckout = () => {
    setTotalPrice(0);
    setTotalItems(0);
    setShowSuccessCheckout(true);
    setTimeout(() => {
      setCart([]);
      navigate("/");
    }, 2000);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <p>Cantidad de productos en el carrito: {totalItems}</p>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {getProduct(product)}
            Cantidad: {product.quantity}
            <button onClick={() => addToCart(product)}>Agregar uno más</button>
            <button onClick={() => handleRemoveFromCart(product)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {totalPrice > 0 && (
        <>
          <p>Total: ${totalPrice}</p>
          <button onClick={handleCheckout}>Finalizar Compra</button>
        </>
      )}
      {showSuccessCheckout && (
        <div className="success-message">
          La compra se ha realizado con éxito! Gracias por elegirnos!
        </div>
      )}
    </div>
  );
}

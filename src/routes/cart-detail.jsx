import { useEffect, useState } from "react";
import "../styles/App.css";
import { getProduct } from "./product";
export default function CartDetail({ cart, handleRemoveFromCart }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (total, product) => total + product.price,
      0
    );
    setTotalPrice(totalPrice);
  }, [cart]);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <p>Cantidad de productos en el carrito: {cart.length}</p>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {getProduct(product)}
            <button onClick={() => handleRemoveFromCart(product)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalPrice}</p>
    </div>
  );
}

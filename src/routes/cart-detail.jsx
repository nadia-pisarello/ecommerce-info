import { useEffect, useState } from "react";
import "../styles/App.css";
import { getProduct } from "./product";

export default function CartDetail({ cart, addToCart, handleRemoveFromCart }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

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
      <p>Total: ${totalPrice}</p>
    </div>
  );
}

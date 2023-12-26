import { useParams, useNavigate } from "react-router-dom";
import { URL_API } from "../constants/url-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Product({ addToCart, handleRemoveFromCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const { data: product, status } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const handleAddToCart = async (product) => {
    addToCart(product);

    setMessage("Producto agregado al carrito. Redireccionando");
    await new Promise((resolve) => {
      setTimeout(() => {
        setMessage(null);
        resolve();
      }, 2000);
    });
    navigate("/cart-detail");
  };

  if (status === "loading") {
    return <h2>Cargando...</h2>;
  }

  if (status === "error") {
    return <div>Error al cargar los datos.</div>;
  }

  return (
    <div>
      {product ? getProduct(product) : <p>El producto no está disponible.</p>}
      <button onClick={() => handleAddToCart(product)}>
        Agregar al carrito
      </button>
      <button onClick={() => handleRemoveFromCart(product)}>
        Eliminar del carrito
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export function getProduct(product) {
  const handleError = (e) => {
    e.target.onError = null;
    e.target.src = "../src/assets/photo-off.png";
  };
  return (
    <div>
      <h3>{product.title}</h3>
      <h4>$ {product.price}</h4>
      <p>{product.description}</p>
      <p>{product.category && product.category.name}</p>
      <div>
        {product.images &&
          Array.isArray(product.images) &&
          product.images.map((image) => {
            if (image !== null) {
              return (
                <div key={image} className="image-container">
                  <img
                    key={image}
                    src={image}
                    alt={product.title}
                    style={{ maxWidth: "150px" }}
                    onError={handleError}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
const fetchProduct = async (productId) => {
  const res = await fetch(`${URL_API}/products/${productId}`);
  const json = await res.json();

  if (json.error) {
    console.error(json.error);
    throw new Error(json.error);
  }
  return json;
};

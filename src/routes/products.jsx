import { URL_API } from "../constants/url-api";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { useQuery } from "@tanstack/react-query";

export default function Productos() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (query.status === "pending") {
    return <h2>Cargando... </h2>;
  }
  const handleError = (e) => {
    e.target.onError = null;
    e.target.src = "../src/assets/photo-off.png";
  };

  return (
    <div>
      <div className="productos">
        {query.data?.map((product) => (
          <div className="producto" key={product.id}>
            <h4>{product.title}</h4>
            <div>
              {product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  style={{ maxWidth: "150px" }}
                  onError={handleError}
                />
              )}
            </div>

            <h4>$ {product.price}</h4>
            <div className="description">
              <p>{product.description}</p>
              <h6>{product.category && product.category.name}</h6>
              <Link to={`/product/${product.id}`}>Ver detalle</Link>
            </div>
          </div>
        ))}{" "}
        {query.isError && <div>Error: {query.error.message}</div>}
        {query.isSuccess && query.data === undefined && (
          <div>Error: Data is undefined</div>
        )}
      </div>
    </div>
  );
}

const getProducts = async () => {
  try {
    const res = await fetch(URL_API + "/products");
    const json = await res.json();

    if (json.error) {
      console.error(json.error);
      throw new Error(json.error);
    }

    if (!Array.isArray(json)) {
      console.error("API response is not an array:", json);
      throw new Error("Unexpected API response");
    }

    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import { URL_API } from "../constants/url-api";
import { useParams, Link } from "react-router-dom";
import "../styles/App.css";
import { useQuery } from "@tanstack/react-query";

export default function Products_by_Category() {
  const { category } = useParams();

  const { data: categoryData, status: categoryStatus } = useQuery({
    queryKey: ["category", category],
    queryFn: () => fetchCategory(category),
    enabled: !!category,
  });

  const { data: products, status: productsStatus } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (categoryStatus === "loading" || productsStatus === "loading") {
    return <h2>Cargando...</h2>;
  }

  if (categoryStatus === "error" || productsStatus === "error") {
    return <h2>No existe la categoría</h2>;
  }

  if (!products) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <>
      <header>
        <Link to="/">
          <button>Inicio</button>
        </Link>
        <h2>{categoryData ? categoryData.name : "Nombre no disponible"}</h2>
      </header>
      <div className="productos">
        {products.map((product) =>
          product.category.id == category ? (
            <div className="producto" key={product.id}>
              <h4>{product.title}</h4>
              <h4>$ {product.price}</h4>
              <Link to={`/product/${product.id}`}>Ver detalle</Link>
            </div>
          ) : null
        )}
      </div>
    </>
  );
}

const fetchCategory = async (categoryId) => {
  const res = await fetch(`${URL_API}/categories/${categoryId}`);
  const json = await res.json();

  if (json.error) {
    console.error(json.error);
    throw new Error(json.error);
  }

  return json;
};

const fetchProducts = async () => {
  const res = await fetch(`${URL_API}/products/`);
  const json = await res.json();

  if (json.error) {
    console.error(json.error);
    throw new Error(json.error);
  }

  return json;
};

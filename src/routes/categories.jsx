import React from "react";
import { URL_API } from "../constants/url-api";
import { Link } from "react-router-dom";
import "../styles/category.css";
import { useQuery } from "@tanstack/react-query";

export default function Categorias() {
  const { data: categories, status } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (status === "loading") {
    return <h2>Cargando...</h2>;
  }

  if (status === "error") {
    return <div>Error al cargar las categorías.</div>;
  }

  return (
    <>
      <div className="categories-container">
        <h2>Categorías Disponibles</h2>
        <div className="categories">
          {categories?.map((category) => (
            <div className="category" key={category.id}>
              <Link to={`/categories/${category.id}/products-by-category`}>
                {category.name}
              </Link>
              <div className="img-category">
                <img src={category.image} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
const fetchCategories = async () => {
  const res = await fetch(`${URL_API}/categories`);
  const json = await res.json();
  if (json.error) {
    console.error(json.error);
    throw new Error(json.error);
  }
  return json;
};

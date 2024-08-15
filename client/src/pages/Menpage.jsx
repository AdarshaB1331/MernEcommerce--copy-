import React, { useEffect, useState } from "react";
import SortBy from "../components/SortBy";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

const Menpage = () => {
  const [mensItems, setMensItems] = useState([]);
  const [sort, setSort] = useState(true);
  const onChanges = () => {
    setSort((prev) => !prev);
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setMensItems(json);
      })
      .catch((error) => console.error("Error fetching mens items:", error));
  }, []);

  let filteredMen;

  if (mensItems) {
    filteredMen = mensItems.filter(
      (item) =>
        item.category === "men's clothing" || item.category === "electronics"
    );

    if (sort) {
      filteredMen.sort((a, b) => a.price - b.price);
    } else {
      filteredMen.sort((a, b) => b.price - a.price);
    }
  }

  return (
    <>
      <SortBy onChanges={onChanges} />

      <div
        style={{
          marginTop: "-100px",
          marginLeft: "350px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          padding: "10px",
          gridColumnGap: "40px",
          gridRowGap: "100px",
        }}
      >
        {mensItems.length === 0 ? <Spinner /> : ""}
        {filteredMen &&
          filteredMen.map((item) => <ProductCard key={item.id} item={item} />)}
      </div>
    </>
  );
};

export default Menpage;

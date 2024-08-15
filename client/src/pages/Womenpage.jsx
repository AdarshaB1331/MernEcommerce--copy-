import React from "react";
import SortBy from "../components/SortBy";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
const Womenpage = () => {
  const [womensItems, setWomensItems] = useState([]);
  const [sort, setSort] = useState(true);
  const onChanges = () => {
    setSort((prev) => !prev);
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setWomensItems(json);
      })
      .catch((error) => console.error("Error fetching mens items:", error));
  }, []);
  let filteredWomen;
  if (womensItems) {
    filteredWomen = womensItems.filter(
      (items) =>
        items.category === "women's clothing" || items.category === "jewelery"
    );
    if (sort) {
      filteredWomen.sort((a, b) => a.price - b.price);
    } else {
      filteredWomen.sort((a, b) => b.price - a.price);
    }
  }
  return (
    <>
      <SortBy onChanges={onChanges} />
      <div
        style={{
          marginTop: "-90px",
          marginLeft: "350px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          padding: "10px",
          gridColumnGap: "40px",
          gridRowGap: "100px",
        }}
      >
        {womensItems.length === 0 ? <Spinner /> : ""}
        {filteredWomen &&
          filteredWomen.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
      </div>
    </>
  );
};

export default Womenpage;

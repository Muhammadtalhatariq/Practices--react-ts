import React from "react";
import Card from "../components/Card";

const ProductCard: React.FC = () => {
  return (
    <div className="p-5 font-sans">
      {console.log("parent render...")}
      <h1 className="text-2xl font-bold mb-6 text-center">Product Shop</h1>
      <Card />
    </div>
  );
};

export default ProductCard;

import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductCard: React.FC = () => {
  return (
    <div className=" font-sans">
      <Header />
      {/* {console.log("parent render...")} */}
      <h1 className="text-2xl font-bold mb-6 text-center">Product Shop</h1>
      <Card />
      <Footer />
    </div>
  );
};

export default ProductCard;

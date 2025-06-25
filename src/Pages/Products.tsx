import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductCard: React.FC = () => {
  return (
    <div className=" font-sans">
      <Header  />
      {/* {console.log("parent render...")} */}
      <Card />
      <Footer />
    </div>
  );
};

export default ProductCard;

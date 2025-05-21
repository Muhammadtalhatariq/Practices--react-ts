import React, { useEffect, useState } from "react";
import ShoppingList from "./ShoppingList";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity:number
}
 interface List {
  product: Product;
  quantity: number;
}

const Card: React.FC = () => {
  const [cart, setCart] = useState<List[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=7"
        );
        const data = await response.json();
        // console.log(data);
        setProducts(data);
      } catch (err) {
        alert("API Error:", err);
      }
    };
    fetchProducts();
  }, []);

  type CartAction = "add" | "remove";

  const createCartHandler =
    (action: CartAction) =>
    (
      productId: number,
      currentCart: Product[],
      updateCart: (items: Product[]) => void
    ) => {
      if (action === "add") {
        updateCart([...currentCart, products.find((p) => p.id === productId)! ]);
        updateCart([...currentCart, ])
      } else {
        updateCart(currentCart.filter((item) => item.id !== productId));
      }
    };

  const handleAddToCart = createCartHandler("add");
  const handleRemoveFromCart = createCartHandler("remove");

  return (
    <>
      <div>
        {console.log("card render ...")}
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4 w-72 shadow-sm"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-2"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-800">PKR{Math.floor(product.price)}</p>
              <p className="text-gray-500 ">{product.category}</p> <p>    Quantity: 1</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAddToCart(product.id, cart, setCart)}
                  className="px-3 py-2 bg-blue-100 rounded hover:bg-blue-200"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    handleRemoveFromCart(product.id, cart, setCart)
                  }
                  className="px-3 py-2 bg-red-50 rounded hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <ShoppingList cart={cart} />
      </div>
    </>
  );
};

export default Card;

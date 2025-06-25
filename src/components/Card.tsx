import React, { useEffect, useState, useMemo, useCallback } from "react";
import ShoppingList from "./ShoppingList";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Card: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=6"
        );
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    fetchProducts();
  }, []);

  const cartTotal = useMemo(() => {
    console.log("calculation .....");
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }, [cart]);

  const createCartHandler = useCallback(
    (action: "add" | "remove") => {
      return (productId: number) => {
        setCart((prevCart) => {
          if (action === "add") {
            const existingItem = prevCart.find(
              (item) => item.product.id === productId
            );
            if (existingItem) {
              return prevCart.map((item) =>
                item.product.id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {
              const product = products.find((p) => p.id === productId)!;
              return [...prevCart, { product, quantity: 1 }];
            }
          } else {
            return prevCart
              .map((item) =>
                item.product.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
              .filter((item) => item.quantity > 0);
          }
        });
      };
    },
    [products]
  );
  const handleAddToCart = useMemo(
    () => createCartHandler("add"),
    [createCartHandler]
  );
  const handleRemoveFromCart = useMemo(
    () => createCartHandler("remove"),
    [createCartHandler]
  );

  const productCards = useMemo(
    () =>
      products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-300 rounded-md p-4 w-[360px] md:w-72 shadow-sm md:my-4 my-2"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-contain mb-2"
          />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-800">PKR {Math.floor(product.price)}</p>
          <p className="text-gray-500">{product.category}</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleAddToCart(product.id)}
              className="px-3 py-2 bg-blue-100 rounded hover:bg-blue-200 cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleRemoveFromCart(product.id)}
              className="px-3 py-2 bg-red-50 rounded hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        </div>
      )),
    [products, handleAddToCart, handleRemoveFromCart]
  );

  return (
    <div>
      {console.log("card render ...")}
      <div className="flex flex-wrap justify-center md:gap-4 pt-20">
        {productCards}
      </div>
      <ShoppingList cart={cart} total={cartTotal} />
    </div>
  );
};

export default Card;

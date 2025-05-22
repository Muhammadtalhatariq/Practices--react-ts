import React, { memo, useMemo } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingListProps {
  cart: CartItem[];
  total: number;
}

const ShoppingList: React.FC<ShoppingListProps> = memo(({ cart, total }) => {
  console.log("shopping cart render ...");
  const cartItems = useMemo(
    () =>
      cart.map((item) => (
        <li
          key={`${item.product.id}-${item.quantity}`}
          className="py-2 border-b border-gray-200 bg-green-200 flex items-center justify-between px-4"
        >
          <div>
            Title: {item.product.title} - Quantity {item.quantity}
          </div>
          <div className="font-semibold">
            PKR : {Math.floor(item.product.price * item.quantity)}
          </div>
        </li>
      )),
    [cart]
  );

  return (
    <div className="border-t flex items-center justify-center flex-col border-gray-200 pt-5 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)}
        items)
      </h2>
      {cart.length > 0 ? (
        <div className="w-full">
          <ul className="list-none p-0">{cartItems}</ul>
          <div className="flex justify-between items-center p-4 bg-blue-100 mt-4 rounded">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">PKR {Math.floor(total)}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty</p>
      )}
    </div>
  );
});

export default ShoppingList;

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
          className="py-2 border-b border-gray-200 bg-neutral-50 flex items-center px-4 mx-2 md:mx-0"
        >
          <div className="flex flex-col md:items-center justify-between md:flex-row gap-2">
            <div className="flex items-center gap-2 ">
              <span className="text-lg font-semibold ">Title : </span>
              {item.product.title.split(" ").slice(0,4).join(" ")}
            </div>
          <div className="flex items-center gap-2 ">
              <span className="text-md font-semibold">Quantity : </span>
            {item.quantity}
          </div>
            <div className="font-semibold flex items-center gap-2">
             <span> PKR :</span> <span>{Math.floor(item.product.price * item.quantity)}</span>
            </div>
          </div>
        </li>
      )),
    [cart]
  );

  return (
    <div className=" flex items-center justify-center flex-col pt-5 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)}
        items)
      </h2>
      {cart.length > 0 ? (
        <div className="w-full my-4">
          <ul className="list-none p-0 ">{cartItems}</ul>
          <div className="flex justify-between items-center p-4 bg-neutral-200 mt-4 rounded mx-2 md:mx-0">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">PKR {Math.floor(total)}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 my-4">Your cart is empty</p>
      )}
    </div>
  );
});

export default ShoppingList;

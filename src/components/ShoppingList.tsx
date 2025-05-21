import React from "react";
const ShoppingList = ({ cart }) => {
  return (
    <>
      {console.log("shopping catd render ...")}
      <div className="border-t flex items-center justify-center flex-col border-gray-200 pt-5">
        <h2 className="text-xl font-semibold">Cart ({cart.length} items)</h2>
        {cart.length > 0 ? (
          <ul className="list-none p-0">
            {cart.map((item) => (
              <li key={item.id} className="py-2 border-b border-gray-200">
                {item.title} - PKR{Math.floor(item.price)}
              </li>
            ))}
        
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>
    </>
  );
};

export default ShoppingList;

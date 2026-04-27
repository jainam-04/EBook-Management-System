import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Cart = () => {
  const nav = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/cart", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          email: localStorage.getItem("email"),
        },
      });
      setCart(result.data);
    } catch (error) {
      alert("Failed to load cart");
    }
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1) {
      return;
    }
    await axios.put(
      `http://localhost:8080/api/cart/${id}`,
      {
        quantity: qty,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          email: localStorage.getItem("email"),
        },
      },
    );
    loadCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:8080/api/cart/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      },
    });
    loadCart();
  };

  const clearCart = async () => {
    await axios.delete("http://localhost:8080/api/cart/clear", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      },
    });
    loadCart();
  };

  const subTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>

              <button
                onClick={() => nav("/books")}
                className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b py-5 flex gap-5 items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-28 h-36 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.title}</h2>

                    <p className="text-gray-600">{item.author}</p>

                    <p className="text-green-600 font-semibold mt-1">
                      In Stock
                    </p>

                    <p className="text-lg font-bold mt-2">₹{item.price}</p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 ml-6 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="text-xl font-bold">₹{item.totalPrice}</div>
                </div>
              ))}

              <div className="mt-6 flex justify-between">
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
                >
                  Clear Cart
                </button>

                <h2 className="text-2xl font-bold">Subtotal: ₹{subTotal}</h2>
              </div>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 text-lg">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{subTotal}</span>
            </div>
          </div>

          <button
            onClick={() => nav("/checkout")}
            className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg font-bold"
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

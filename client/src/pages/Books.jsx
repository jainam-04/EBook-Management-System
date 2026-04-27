import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  // const [cart, setCart] = useState({
  //   bookId: "",
  //   quantity: "",
  // });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const result = await axios.get("http://localhost:8080/api/user/books", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setBooks(result.data);
  };

  const addToCart = async (bookId) => {
    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        {
          bookId: bookId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            email: localStorage.getItem("email"),
          },
        },
      );
      alert("Book added to cart");
    } catch (error) {
      alert("Failed to add cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-blue-600">
          <Link to="/dashboard">Ebook Store</Link>
        </h1>

        <input
          type="text"
          placeholder="Search Books..."
          className="border w-96 p-2 rounded-lg"
        />

        <Link
          to="/cart"
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500"
        >
          Cart
        </Link>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-10">
        <h2 className="text-4xl font-bold">
          Welcome to Ebook Management Store
        </h2>
        <p className="mt-2 text-lg">Best Deals on New, Old & Trending Books</p>
      </div>

      <div className="px-8 py-10">
        <h2 className="text-3xl font-bold mb-8">Featured Books</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              <div className="bg-gray-50 p-4">
                <img
                  src={b.imageUrl || "https://via.placeholder.com/250x320"}
                  alt={b.title}
                  className="w-full h-64 object-contain"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{b.title}</h3>

                <p className="text-gray-600 text-sm mt-1">by {b.author}</p>

                <p className="text-sm mt-2 text-green-600 font-semibold">
                  {b.category}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-2xl font-bold text-gray-800">₹{b.price}</p>

                  <button
                    onClick={() => addToCart(b.id)}
                    className="bg-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500"
                  >
                    Add to Cart
                  </button>
                </div>

                <button className="w-full mt-3 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 font-semibold">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-white text-center py-6 mt-10">
        © 2026 Ebook Store | Built with React + Spring Boot
      </div>
    </div>
  );
};

export default Books;

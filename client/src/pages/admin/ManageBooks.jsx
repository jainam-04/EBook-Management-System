import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/admin/books", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBooks(result.data);
    } catch (error) {
      console.log(localStorage.getItem("role"));
      console.log(error);
      alert("Failed");
    }
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:8080/api/admin/books/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    loadBooks();
  };
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Manage Books</h1>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Price</th>
            <th className="p-3">Category</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{b.id}</td>
              <td className="p-3">{b.title}</td>
              <td className="p-3">{b.author}</td>
              <td className="p-3">₹{b.price}</td>
              <td className="p-3">{b.category}</td>

              <td className="p-3 flex justify-center gap-3">
                <Link
                  to={`/admin/edit-book/${b.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteBook(b.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 hover:cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;

import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const EditBook = () => {
  const {id} = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const result = await axios.get(`http://localhost:8080/api/admin/books/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setForm(result.data);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/admin/books/update/${id}`, form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert("Book updated");
      nav("/admin");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5 font-bold">Edit Book</h1>

      <form onSubmit={updateBook} className="space-y-4 max-w-md">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;

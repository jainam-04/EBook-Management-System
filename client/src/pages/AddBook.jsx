import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddBook = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/books/add", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert("Book added");
      nav("/books")
    } catch (error) {
      alert("Failed");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Add Book</h1>

        <input
          name="title"
          placeholder="Title"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="Author"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white w-full p-3 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;

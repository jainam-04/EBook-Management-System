import axios from "axios";
import React, {useState} from "react";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    category: "NEW",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/admin/books/add", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert("Book added");
    } catch (error) {
      alert("Failed");
    }
  };
  return (
    <div className="p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow max-w-lg mx-auto space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Add Book</h1>

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

        <select
          name="category"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        >
          <option>NEW</option>
          <option>RECENT</option>
          <option>TRENDING</option>
        </select>

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

import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAddBook from "./pages/admin/AddBook";
import ManageBooks from "./pages/admin/ManageBooks";
import EditBook from "./pages/admin/EditBook";
import BooksByMe from "./pages/BooksByMe";
import EditBookByMe from "./pages/EditBookByMe";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/books" element={<Books />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-book" element={<AdminAddBook />} />
        <Route path="/admin/books" element={<ManageBooks />} />
        <Route path="/admin/edit-book/:id" element={<EditBook />} />
        <Route path="/books-by-me" element={<BooksByMe />} />
        <Route path="/edit-book/:id" element={<EditBookByMe />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

        <div className="space-y-4">
          <Link to="/admin/add-book" className="block hover:text-yellow-400">
            Add Book
          </Link>

          <Link to="/admin/books" className="block hover:text-yellow-400">
            Manage Books
          </Link>
        </div>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Welcome Admin 👑</h1>

        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/admin/add-book"
            className="bg-blue-600 text-white p-8 rounded-xl shadow"
          >
            Add New Book
          </Link>

          <Link
            to="/admin/books"
            className="bg-green-600 text-white p-8 rounded-xl shadow"
          >
            Manage Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

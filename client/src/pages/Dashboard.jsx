import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();
  const logout = () => {
    if (confirm("Do you want to logout?")) {
      localStorage.removeItem("token");
      nav("/");
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          to="/add-book"
          className="bg-blue-600 text-white p-6 rounded-xl text-center"
        >
          Add Book
        </Link>

        <Link
          to="/books"
          className="bg-green-600 text-white p-6 rounded-xl text-center"
        >
          View All Books
        </Link>

        <Link
          to="/books-by-me"
          className="bg-green-600 text-white p-6 rounded-xl text-center"
        >
          View Books Added By You
        </Link>

        <button
          onClick={logout}
          className="bg-red-600 text-white p-6 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link to="/add-book" className="bg-blue-600 text-white p-6 rounded-xl">
          Add Book
        </Link>

        <Link to="/books" className="bg-green-600 text-white p-6 rounded-xl">
          View Books
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

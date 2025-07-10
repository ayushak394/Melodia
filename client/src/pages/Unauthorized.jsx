import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 text-center">
      <h1 className="text-5xl font-bold text-red-500 mb-4">🚫 Access Denied</h1>
      <p className="text-xl mb-6">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all"
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default Unauthorized;

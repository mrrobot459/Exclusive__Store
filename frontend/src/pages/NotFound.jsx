import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">404</p>
        <h1 className="mt-4 text-5xl font-black text-gray-900">Page not found</h1>
        <p className="mt-4 text-lg text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

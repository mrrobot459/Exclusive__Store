import React from "react";

const Profile = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Login required</h1>
        <p className="mt-3 text-gray-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <div className="mt-6 space-y-3 text-gray-700">
          <p><span className="font-semibold">Status:</span> Logged in</p>
          <p><span className="font-semibold">Role:</span> User</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

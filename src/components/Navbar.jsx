import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { logout, authUser } = useAuthStore();

  return (
    <div className='w-full h-16 bg-emerald-800 flex justify-end items-center gap-5 px-4'>

      {authUser ? (
        <>
          <button
            className='px-3 py-1 bg-red-500 text-white rounded-md'
            onClick={async () => await logout()}
          >
            Logout
          </button>
          <Link className='px-3 py-1 bg-red-500 text-white rounded-md' to="/profile">Profile</Link>
          
        </>
      ) : (
        <Link className='px-3 py-1 bg-blue-500 text-white rounded-md' to="/login">Login</Link>
      )}

      <Link className='px-3 py-1 bg-green-600 text-white rounded-md' to="/">Home</Link>
    </div>
  );
}

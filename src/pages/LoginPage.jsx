import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      await login(formData);
    }
  };

  return (
    <div className="bg-red-500 h-screen w-full flex justify-center items-center">
      <div className="w-1/2 h-1/2 bg-emerald-50 p-6 rounded-lg shadow-lg">
        <form
          className="flex flex-col justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            className="w-1/2 h-12 border-4 border-green-400 rounded-md p-2 text-black"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            className="w-1/2 h-12 border-4 border-green-400 rounded-md p-2 text-black"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-red-500 px-10 py-2 text-white font-bold rounded-md hover:bg-red-600"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging In..." : "Login"}
          </button>
        </form>

        <Link to="/signup" className="text-black text-2xl font-bold mt-4">
          Already have not  an account? Signup
        </Link>
      </div>
    </div>
  );
}

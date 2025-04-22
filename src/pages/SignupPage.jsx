import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true; // form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      // Proceed to signup if form is valid
      await signup(formData);
    }
  };

  return (
    <div className="bg-black h-screen w-[100%] flex justify-center items-center">
      <div className="w-[50%] h-[50%] bg-emerald-50">
        <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
          <input
            className="w-[50%] h-[50px] border-4 border-green-400 rounded-md p-2 mb-4 text-black"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />

          <input
            className="w-[50%] h-[50px] border-4 border-green-400 rounded-md p-2 mb-4 text-black"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            className="w-[50%] h-[50px] border-4 border-green-400 rounded-md p-2 mb-4 text-black"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-red-500 px-20 py-2 rounded-4xl"
            disabled={isSigningUp} // Disable button during signup
          >
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <Link to="/login" className="text-black text-2xl font-bold mt-4">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

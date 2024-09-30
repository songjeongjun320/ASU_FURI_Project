"use client"; // Mark this as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Supabase client initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function Home() {
  const router = useRouter(); // Hook for navigation
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [showPopup, setShowPopup] = useState(false); // State for forgot password popup

  // Function to handle login
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Incorrect Username or Password, Please try again");
    } else {
      console.log(data); // Successful login
      router.push("/main"); // Navigate to main page after login
    }
  };

  // Function to handle forgot password
  const handleForgotPassword = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      alert("There are no accounts using that email.");
    } else {
      alert("Password reset email sent!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#800000]">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Input for email */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#800000]"
            >
              Email:
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
            />
          </div>

          {/* Input for password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#800000]"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-[#800000] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6E0000] transition duration-300"
          >
            Login
          </button>

          {/* Sign up button */}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="w-full bg-[#FFD700] text-[#800000] font-semibold py-2 px-4 rounded-md hover:bg-[#E6C200] transition duration-300"
          >
            Sign Up
          </button>

          {/* Forgot password button */}
          <button
            type="button"
            onClick={() => setShowPopup(true)}
            className="w-full text-[#800000] hover:underline"
          >
            Forgot Password?
          </button>
        </form>
      </div>

      {/* Forgot password popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-[#800000]">
              Enter your E-mail
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700]"
            />
            <button
              onClick={handleForgotPassword}
              className="w-full bg-[#800000] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6E0000] transition duration-300"
            >
              Send password reset link
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full bg-[#FFD700] text-[#800000] font-semibold py-2 px-4 rounded-md hover:bg-[#E6C200] transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

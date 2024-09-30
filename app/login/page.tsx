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
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleForgotPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      alert("Error sending password reset email");
    } else {
      alert("Password reset email sent");
      setShowPopup(false);
    }
  };

  // Function to handle login
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);

    // Hardcoded admin login: email 'jun' and password '1234'
    if (email === "jun" && password === "1234") {
      console.log("Admin login successful");
      router.push("/main"); // Navigate to main page for admin
      return;
    }

    // Normal login via Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Incorrect Username or Password, Please try again");
    } else {
      console.log(data);
      router.push("/main"); // Navigate to main page on successful login
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  bg-maroon">
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
              className="input-field"
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
              className="input-field"
            />
          </div>

          {/* Login button */}
          <button type="submit" className="btn-primary">
            Login
          </button>

          {/* Sign up button */}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="btn-secondary"
          >
            Sign Up
          </button>

          {/* Forgot password button */}
          <button
            type="button"
            onClick={() => setShowPopup(true)}
            className="link-maroon"
          >
            Forgot Password?
          </button>
        </form>
      </div>

      {/* Forgot password popup */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <h2 className="text-lg font-bold mb-4 text-[#800000]">
              Enter your E-mail
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="popup-input"
            />
            <button onClick={handleForgotPassword} className="btn-primary">
              Send password reset link
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="btn-secondary mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

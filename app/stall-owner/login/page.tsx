"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function StallOwnerLogin() {
  const [form, setForm] = useState({
    stallNumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");

    if (!form.stallNumber || !form.password) {
      setError("Please enter stall number and password.");
      return;
    }

    // Mock login (DB/auth will be added later)
    window.location.href = "/stall-owner/dashboard";
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 " +
    "focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition";

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center px-6">
      {/* Lakshya Logo */}
      <div className="absolute top-6 right-6 z-20">
        <Link href="/">
          <Image
            src="/lakshya.png"
            alt="Lakshya Logo"
            width={48}
            height={48}
            className="cursor-pointer transition-transform hover:scale-105"
          />
        </Link>
      </div>

      {/* Orange Glow Wrapper */}
      <div className="rounded-2xl bg-gray-100 p-1 shadow-[0_0_35px_rgba(255,140,0,0.25)]">
        {/* Login Card */}
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 text-center">
            Stall Owner Login
          </h1>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stall Number
              </label>
              <input
                name="stallNumber"
                placeholder="Enter your stall number"
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              onClick={handleLogin}
              className="mt-4 w-full rounded-md bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

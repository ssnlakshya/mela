"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EditStall() {
  const [form, setForm] = useState({
    stallName: "",
    description: "",
    ownerName: "",
    phone: "",
    instagram: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");

    if (!form.stallName || !form.description || !form.ownerName || !form.phone) {
      setError("Please fill all required fields.");
      return;
    }

    await fetch("/api/stall-owner/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Stall details saved successfully");
    window.location.href = "/stall-owner/dashboard";
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 " +
    "focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition";

  return (
    <div className="relative min-h-screen bg-gray-100 px-6 py-12">
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

      <div className="mx-auto max-w-4xl">
        {/* Orange Glow Wrapper */}
        <div className="rounded-2xl bg-gray-100 p-1 shadow-[0_0_35px_rgba(255,140,0,0.25)]">
          {/* Header */}
          <div className="px-2 pt-2">
            <h1 className="mb-10 text-3xl font-bold text-gray-900">
              Edit Stall Details
            </h1>
          </div>

          {/* Stall Info */}
          <div className="mb-10 rounded-xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Stall Information
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Basic details shown to visitors
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stall Name *
                </label>
                <input
                  name="stallName"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stall Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="mb-10 rounded-xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Stall Media</h2>
            <p className="mb-6 text-sm text-gray-500">
              Images displayed on the stall page
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-orange-400 transition">
                <p className="font-medium text-gray-700">Banner Image *</p>
                <p className="mt-1 text-xs text-gray-500">
                  Rectangular image shown at the top of the stall page
                </p>
                <input type="file" className="hidden" />
              </label>

              <label className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-orange-400 transition">
                <p className="font-medium text-gray-700">Stall Pictures *</p>
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 1, maximum 5–10 images
                </p>
                <input type="file" multiple className="hidden" />
              </label>

              <label className="md:col-span-2 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-orange-400 transition">
                <p className="font-medium text-gray-700">
                  Menu / Items (Optional)
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Upload images of menu or item pricing
                </p>
                <input type="file" multiple className="hidden" />
              </label>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-10 rounded-xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Contact Information
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Details for customers to reach the stall
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stall Owner Name *
                </label>
                <input
                  name="ownerName"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  name="phone"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Instagram Page Link (Optional)
                </label>
                <input
                  name="instagram"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="mb-4 px-2 text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end px-2 pb-2">
            <button
              onClick={handleSave}
              className="rounded-md bg-orange-500 px-10 py-3 font-semibold text-white hover:bg-orange-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

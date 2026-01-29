"use client";

import Image from "next/image";
import Link from "next/link";

export default function StallOwnerDashboard() {
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
          {/* Dashboard Card */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Stall Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Preview how your stall appears to visitors
                </p>
              </div>

              <Link
                href="/stall-owner/edit"
                className="rounded-md bg-orange-500 px-6 py-2.5 text-sm font-semibold
                           text-white transition hover:bg-orange-600"
              >
                Edit Stall Details
              </Link>
            </div>

            {/* Banner */}
            <div className="mb-8">
              <div className="flex h-48 w-full items-center justify-center rounded-lg
                              bg-gray-200 text-sm text-gray-500">
                Banner Image (Required)
              </div>
            </div>

            {/* Stall Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Stall Name
              </h2>
              <p className="mt-2 max-w-2xl text-gray-700">
                Stall description goes here. This section explains what the stall
                offers, specialities, and any relevant information for visitors.
              </p>
            </div>

            {/* Stall Pictures */}
            <div className="mb-10">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Stall Pictures
              </h3>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center
                               rounded-lg bg-gray-200 text-xs text-gray-500
                               transition hover:scale-[1.02]"
                  >
                    Image
                  </div>
                ))}
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Minimum 1 image, maximum 5–10 images
              </p>
            </div>

            {/* Menu Images */}
            <div className="mb-10">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Menu / Items
              </h3>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center
                               rounded-lg bg-gray-200 text-xs text-gray-500
                               transition hover:scale-[1.02]"
                  >
                    Menu Image
                  </div>
                ))}
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Optional – images of menu or item pricing
              </p>
            </div>

            {/* Contact Info */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Contact Information
              </h3>

              <div className="space-y-2 text-sm text-gray-800">
                <p>
                  <span className="font-medium">Stall Owner:</span> Owner Name
                </p>
                <p>
                  <span className="font-medium">Phone:</span> Phone Number
                </p>
                <p>
                  <span className="font-medium">Instagram:</span> Optional
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

type StallViewProps = {
  isOwner?: boolean;
  onEdit?: () => void;
};

export default function StallView({ isOwner = false, onEdit }: StallViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Owner Action */}
        {isOwner && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={onEdit}
              className="rounded-md bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600 transition"
            >
              Edit Stall Details
            </button>
          </div>
        )}

        {/* Banner */}
        <div className="mb-10 h-64 w-full rounded-xl bg-gray-200 shadow-sm flex items-center justify-center">
          <span className="text-gray-500">
            Banner Image (Required)
          </span>
        </div>

        {/* Stall Info */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Stall Name
          </h1>
          <p className="max-w-4xl text-gray-600 leading-relaxed">
            Stall description goes here. This section explains what the stall
            offers, specialties, and any relevant information for visitors.
          </p>
        </div>

        {/* Pictures Section */}
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Stall Pictures
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center text-sm text-gray-500"
              >
                Image
              </div>
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Minimum 1 image, maximum 5–10 images
          </p>
        </div>

        {/* Menu / Items */}
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Menu / Items
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-lg bg-gray-200 flex items-center justify-center text-sm text-gray-500"
              >
                Menu Image
              </div>
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Optional – images of menu or item pricing
          </p>
        </div>

        {/* Contact Information Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Contact Information
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Stall Owner:</span> Owner Name
            </p>
            <p>
              <span className="font-medium">Phone:</span> Phone Number
            </p>
            <p>
              <span className="font-medium">Instagram:</span>{" "}
              <span className="text-gray-500">Optional</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

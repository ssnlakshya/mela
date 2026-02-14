type Review = { user: string; rating: number; comment: string };

export function ReviewCard({
  review,
  index,
  onChange,
  onRemove,
  canRemove = true,
}: {
  review: Review;
  index: number;
  onChange: (index: number, field: "user" | "rating" | "comment", value: string) => void;
  onRemove: (index: number) => void;
  canRemove?: boolean;
}) {
  return (
    <div className="rounded-xl border w-full overflow-x-hidden border-orange-300 bg-white/70 backdrop-blur-md p-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <input
          value={review.user}
          onChange={(e) => onChange(index, "user", e.target.value)}
          placeholder="User name"
          className="md:col-span-4 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-black
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="md:col-span-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                key={star}
                type="button"
                onClick={() => onChange(index, "rating", String(star))}
                className={`text-lg transition ${
                    review.rating >= star
                    ? "text-yellow-500"
                    : "text-neutral-300"
                } hover:scale-110`}
                >
                ★
                </button>
            ))}
        </div>

        <input
          value={review.comment}
          onChange={(e) => onChange(index, "comment", e.target.value)}
          placeholder="Comment"
          className="md:col-span-5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-black
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="md:col-span-1 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
            aria-label="Remove review"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

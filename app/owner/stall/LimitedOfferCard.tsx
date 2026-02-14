type LimitedOffer = { title: string; description?: string; validTill?: string };

export function LimitedOfferCard({
  offer,
  index,
  onChange,
  onRemove,
  canRemove = true,
}: {
  offer: LimitedOffer;
  index: number;
  onChange: (index: number, field: "title" | "description" | "validTill", value: string) => void;
  onRemove: (index: number) => void;
  canRemove?: boolean;
}) {
  return (
    <div className="rounded-xl border border-orange-300 bg-white/70 backdrop-blur-md p-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <input
          value={offer.title}
          onChange={(e) => onChange(index, "title", e.target.value)}
          placeholder="Offer title"
          className="md:col-span-4 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-black
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          value={offer.description ?? ""}
          onChange={(e) => onChange(index, "description", e.target.value)}
          placeholder="Description (optional)"
          className="md:col-span-5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-black
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          value={offer.validTill ?? ""}
          onChange={(e) => onChange(index, "validTill", e.target.value)}
          placeholder="Valid till (YYYY-MM-DD)"
          className="md:col-span-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-black
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="md:col-span-1 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
            aria-label="Remove offer"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

type Item = { name: string; price: string };

export function ItemCard({
  item,
  index,
  onChange,
  onRemove,
  canRemove = true,
}: {
  item: Item;
  index: number;
  onChange: (index: number, field: "name" | "price", value: string) => void;
  onRemove: (index: number) => void;
  canRemove?: boolean;
}) {
  return (
    <div className="rounded-xl border w-full overflow-x-hidden border-orange-300 bg-white/70 backdrop-blur-md p-3">
      <div className="flex gap-3 items-center">
        <input
          value={item.name}
          onChange={(e) => onChange(index, "name", e.target.value)}
          placeholder="Item name"
          className="flex-1 min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-black
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          value={item.price}
          onChange={(e) => onChange(index, "price", e.target.value)}
          placeholder="Price"
          inputMode="numeric"
          className="w-20 sm:w-28 md:w-32 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-black
                     focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
            aria-label="Remove item"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

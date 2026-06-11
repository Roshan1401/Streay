import { Plus, Search } from "lucide-react";

interface SearchbarProps {
  query: string;
  setQuery: (query: string) => void;
  setShowResults: (show: boolean) => void;
}

function Searchbar({ query, setQuery, setShowResults }: SearchbarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };
  return (
    <div className="group flex w-full items-center gap-2.5 rounded-xl border-[1.5px] border-(--color-border-secondary) bg-(--color-bg-primary) px-4 py-2.5 transition-colors focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]">
      <span className="shrink-0 text-(--color-text-secondary) transition-colors group-focus-within:text-orange-500">
        <Search className="size-5" />
      </span>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        placeholder="Search"
        className="flex-1 border-none bg-transparent text-sm text-(--color-text-primary) outline-none"
      />

      {query && (
        <button
          onClick={handleClear}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black/10 p-1 text-black/60 transition-all duration-150 hover:scale-110 hover:bg-black/20 hover:text-black/80 dark:bg-white/15 dark:text-white/60 dark:hover:bg-white/25 dark:hover:text-white/90"
        >
          <Plus className="rotate-45" />
        </button>
      )}
    </div>
  );
}

export default Searchbar;

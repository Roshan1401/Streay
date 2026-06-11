import DevloperCard from "../components/explore/DevloperCard";
import Searchbar from "../components/explore/Searchbar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { SearchResult, ProfileRPC } from "../types/types";
import { useRecentSearchs } from "../hooks/useRecentSearch";

function Explore() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearchs()
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .rpc("search_users", { search_term: query })

    if (error) {
      console.error("Error searching profiles: ", error);
      setSearchResults([]);
      setLoading(false)
      return;
    }

    setSearchResults(
      (data as ProfileRPC[]).map((profile) => ({
        id: profile.id,
        name: profile.name,
        username: profile.username,
        avatar: profile.avatar_url,
        is_extension_active: profile.is_extension_active,
      }))
    );
    setLoading(false);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="px-5 py-5 md:px-10 max-w-xl  mx-auto">
      <Searchbar query={query} setQuery={setQuery} setShowResults={setShowResults} />
      {showResults && (
        <div className="rounded-lg border border-t-0 border-(--color-border) bg-(--color-bg-primary)">
          <div className="custom-scroll flex flex-col gap-3 py-5  max-h-[600px] overflow-y-auto" style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#3f3f46 transparent"
          }}>
            {loading ? (
              <p className="text-center text-sm text-gray-500">Searching...</p>
            ) : searchResults.length === 0 ? (
              <>
                {
                  recentSearches.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">Search for something to get started.</p>
                  ) : (
                    <>
                      <div className="flex items-center justify-between px-4">
                        <span className="text-lg text-(--color-text-primary) font-semibold" >Recent</span>
                        <button
                          className="hover:bg-orange-400/20 font-semibold text-center cursor-pointer text-sm text-orange-500 rounded-2xl px-3 py-1"
                          onMouseDown={() => clearRecentSearches()}
                        >Clear all</button>
                      </div>
                      {recentSearches.map((result) => (
                        <DevloperCard key={result.id} {...result} addRecentSearch={addRecentSearch} removeRecentSearch={removeRecentSearch} />
                      ))}
                    </>
                  )
                }

              </>
            ) : (
              searchResults.map((result) => (
                <DevloperCard key={result.id} {...result} addRecentSearch={addRecentSearch} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;

import { useState } from "react";
import type { SearchResult } from "../types/types";


export function useRecentSearchs(){
    const [recentSearches, setRecentSearches] = useState<SearchResult[]>(()=> {
        try {
            const result = localStorage.getItem("recentSearches")
            return result ? JSON.parse(result) as SearchResult[] : []
        } catch{
            return []
        }
    })

const addRecentSearch = (user: SearchResult) =>{
    setRecentSearches(prev => {
        const filtered = prev.filter(u => u.id !== user.id)
        const updated = [user, ...filtered].slice(0, 10)
        localStorage.setItem("recentSearches", JSON.stringify(updated))
        return updated
    })
}

const removeRecentSearch = (id: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(u => u.id !== id)
      localStorage.setItem("recentSearches", JSON.stringify(updated))
      return updated
    })
  }

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches")
    setRecentSearches([])
  }

  return {recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches}
}
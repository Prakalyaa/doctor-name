
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  doctors: any[];
  onSearch: (query: string) => void;
}

export const SearchBar = ({ doctors, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query?.trim()) {
      const matches = Array.isArray(doctors) 
        ? doctors
            .filter(doc => 
              doc && doc.name && doc.name.toLowerCase().includes(query.toLowerCase())
            )
            .map(doc => doc.name)
            .filter(Boolean)
            .slice(0, 3)
        : [];
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [query, doctors]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <Input
          data-testid="autocomplete-input"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          value={query || ""}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            onSearch(value);
          }}
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-b-lg mt-1">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              data-testid="suggestion-item"
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (suggestion) {
                  setQuery(suggestion);
                  onSearch(suggestion);
                  setSuggestions([]);
                }
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

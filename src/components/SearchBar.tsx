
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Doctor } from "@/types/doctor";

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
}

export const SearchBar = ({ doctors, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const matches = doctors
        ?.filter(doc => doc.name.toLowerCase().includes(query.toLowerCase()))
        .map(doc => doc.name)
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [query, doctors]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative">
        <Input
          data-testid="autocomplete-input"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="pl-10 py-2"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-50 w-full bg-white shadow-lg rounded-b-lg mt-1">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              data-testid="suggestion-item"
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
                setSuggestions([]);
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

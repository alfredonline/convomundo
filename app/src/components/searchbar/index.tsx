import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
  value?: string;
  placeholder?: string;
}

const SearchBar = ({ onSearch, value = "", placeholder = "Search..." }: SearchBarProps) => {
  return (
    <div className="relative mb-4">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange-500 focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar
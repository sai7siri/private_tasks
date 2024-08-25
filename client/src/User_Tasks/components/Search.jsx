import React from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ onSearch }) => {
  return (
    <form className="max-w-[300px] sm:max-w-md w-full">
      <label className="input py-2 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search Tasks"
          onChange={(e) => onSearch(e.target.value)}
        />
        <SearchIcon size={"20"} color="black" />
      </label>
    </form>
  );
};

export default Search;

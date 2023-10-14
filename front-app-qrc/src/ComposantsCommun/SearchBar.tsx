import { useState } from 'react';
import searchSVG from "../assets/search.svg";

interface SearchBarProps {
    searchTerm: string;
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
    
    const [isFocused, setIsFocused] = useState(false);

    const handleTerm = (e: any) => {
        let value = e.target.value;
        onSearch(value);
    }

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    
    return (
        <div className={`p-2.5 rounded-lg w-1/5 flex gap-2 ${isFocused ? 'bg-white' : 'bg-gray-100'} hover:bg-white`}>
            <img src={searchSVG} alt="" />    
            <input
                type="text"
                name="searchBar"
                id="searchBar"
                className="focus:outline-none bg-transparent"
                placeholder="Rechercher"
                onChange={handleTerm}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchTerm}
            />
        </div>
    )
}

export default SearchBar;

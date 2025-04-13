import "./SearchBar.css"
import React, {useState} from 'react'
import SearchIcon from "../../../assets/search-icon.png";
import {useNavigate} from "react-router-dom";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            navigate(`/search?term=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by park name or state"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"/>
                <img src={SearchIcon} alt="Search icon" className="search-icon" onClick={handleSearch}/>
            </div>
        </>
    )
}

export default SearchBar;
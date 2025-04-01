import "./SearchBar.css"
import React, {useState} from 'react'
import SearchIcon from "../../../assets/search-icon.png";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        console.log("Zoekterm:", event.target.value); // Check de zoekwaarde in de console
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by park, state or ZIP-code"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-bar"/>
                <img src={SearchIcon} alt="Search icon" className="search-icon" onClick={handleSearch}/>
            </div>
        </>
    )
}

export default SearchBar;
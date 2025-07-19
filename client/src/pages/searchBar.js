import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'; // You can style it like the screenshot

const API_KEY = "7eb27d44d00475a333815aa9f4680655";

function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const res = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
        );
        setSuggestions(res.data);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(`${place.name}, ${place.country}`);
    setSuggestions([]);
    onSelect(place); // send selected location to parent
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        placeholder="Search for location"
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item.name}, {item.state ? item.state + ", " : ''}{item.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState({ oldSearch: '', newSearch: '' });

    const handleOnChange = (event) => {
        const { value } = event.target;

        setSearchTerm({ ...searchTerm, newSearch: value });
    };

    const handleSearch = () => {
        const { oldSearch, newSearch } = searchTerm;

        if (newSearch && oldSearch !== newSearch) {
            setSearchTerm({ ...searchTerm, oldSearch: newSearch });
            onSearch(newSearch);
        }
    };

    const handleOnKeyDown = (event) => {
        const ENTER_KEY_CODE = 13;

        if (event.keyCode === ENTER_KEY_CODE) {
            handleSearch();
        }
    };
    return (
        <div className="field has-addons">
            <div className="control is-expanded">
                <input
                    className="input"
                    type="text"
                    placeholder="Search Twitter"
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                />
            </div>
            <div className="control">
                <button
                    type="button"
                    className="button is-info"
                    onClick={handleSearch}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    );
}

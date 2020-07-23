import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleOnChange = (event) => {
        const { value } = event.target;

        if (value) {
            setSearchTerm(value);
        }
    };

    const handleSearch = () => onSearch(searchTerm);

    const handleOnKeyDown = (event) => {
        const ENTER_KEY_CODE = 13;

        if (event.keyCode === ENTER_KEY_CODE) {
            onSearch(searchTerm);
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

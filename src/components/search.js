import React from 'react';

const Search = ({ SearchTerm }) => {
  return (
    <div className="search">
      <input
        type="text"
        onChange={e => SearchTerm(e.target.value)}
        placeholder="Search.."
      />
    </div>
  );
};

export default Search;

import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const Form = () => {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`./details/${query}`);
  };

  return (
    <form className="form" onSubmit={(e) => handleSearch(e)}>
      <input
        className="input-field"
        type="text"
        placeholder="Search your favorite cities"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className="links-container">
        {/* {error && <p>City cannot be found, please enter a correct city</p>} */}
      </div>
    </form>
  );
};

export default Form;

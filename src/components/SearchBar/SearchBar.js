import React from 'react';
import './SearchBar.css';

// Custom SearchBar component
class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <div className='SearchBar-container'>
          <input type='text' className='TextInput-container' />
          <button type='submit' className='button-container'>
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;

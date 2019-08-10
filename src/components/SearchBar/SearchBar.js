import React from 'react';
import './SearchBar.css';

// Custom SearchBar component
class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleSubmit = (e, text) => {
    // Prevents page from reloading on form submit
    e.preventDefault();

    return this.props.onSubmit(text);
  };

  handleOnChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;

    return (
      <form onSubmit={e => this.handleSubmit(e, value)}>
        <div className='SearchBar-container'>
          <input
            type='text'
            value={value}
            className='TextInput-container'
            onChange={this.handleOnChange}
          />
          <button type='submit' className='button-container'>
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;

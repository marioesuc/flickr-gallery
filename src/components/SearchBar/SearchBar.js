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

    // Check if string is filled
    if (text.length) {
      return this.props.onSubmit(text);
    }

    // Else use the default argument defined within the function
    return this.props.onSubmit();
  };

  handleOnChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;

    return (
      <div className='SearchBar-container'>
        <form onSubmit={e => this.handleSubmit(e, value)}>
          <input
            type='text'
            value={value}
            className='TextInput-container'
            onChange={this.handleOnChange}
          />
          <button type='submit' className='button-container'>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;

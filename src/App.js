import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import PhotosContainer from './components/PhotosContainer/PhotosContainer';

function App() {
  return (
    <div className='App'>
      <h1>Flickr Gallery</h1>

      <SearchBar />
      <PhotosContainer />
    </div>
  );
}

export default App;

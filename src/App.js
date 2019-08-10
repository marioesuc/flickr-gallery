import React from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import PhotosContainer from './components/PhotosContainer/PhotosContainer';
import { FLICKR_API_KEY } from './config/Constants';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      loading: true
    };
  }

  componentDidMount() {
    this.searchFlickrPhotos();
  }

  searchFlickrPhotos = (text = 'netherlands') => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${text}&per_page=20&format=json&nojsoncallback=1`
      )

      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching the data', error);
      });
  };

  renderPhotosContainer = () => {
    const { loading, photos } = this.state;

    if (loading) {
      return <h3>Loading photos...</h3>;
    }

    return <PhotosContainer data={photos} />;
  };

  render() {
    return (
      <div className='App'>
        <h1>Flickr Gallery</h1>

        <SearchBar onSubmit={this.searchFlickrPhotos} />
        {this.renderPhotosContainer()}
      </div>
    );
  }
}

export default App;

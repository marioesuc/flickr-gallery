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
      textToSearch: '',
      page: 1,
      pages: 1,
      photos: [],
      loading: true
    };
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    this.searchFlickrPhotos(this.state.textToSearch);
  }

  componentDidUpdate() {
    this.trackScrolling();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const { loading, page, pages } = this.state;

    // Check if the user has reached the bottom of the page
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading &&
      page < pages
    ) {
      this.setState(
        {
          page: page + 1
        },
        state => {
          this.searchFlickrPhotos(this.state.textToSearch, this.state.page);
        }
      );
    }
  };

  searchFlickrPhotos = (text, page = 1) => {
    const { photos } = this.state;

    // If the text is filled, search for related photos, if not load a refined gallery from a specific user
    const url =
      text && text.length
        ? `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${text}&page=${page}&per_page=20&format=json&nojsoncallback=1`
        : `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${FLICKR_API_KEY}&user_id=31148056@N04&page=${page}&per_page=20&format=json&nojsoncallback=1`;

    this.setState({ loading: true });
    axios
      .get(url)

      .then(response => {
        this.setState({
          photos: [...photos, ...response.data.photos.photo],
          pages: response.data.photos.pages,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching the data', error);
      });
  };

  handleOnSubmit = text => {
    return this.setState({ textToSearch: text, photos: [], page: 1 }, () => {
      this.searchFlickrPhotos(this.state.textToSearch, this.state.page);
    });
  };

  renderPhotosContainer = () => {
    const { loading, photos } = this.state;

    return (
      <div>
        <PhotosContainer data={photos} />
        {loading && <h3>Loading photos...</h3>}
      </div>
    );
  };

  render() {
    return (
      <div className='App'>
        <h1>Flickr Gallery</h1>

        <SearchBar onSubmit={this.handleOnSubmit} />
        {this.renderPhotosContainer()}
      </div>
    );
  }
}

export default App;

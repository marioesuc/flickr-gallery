import React from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import PhotosContainer from './components/PhotosContainer/PhotosContainer';
import PhotoViewer from './components/PhotoViewer/PhotoViewer';
import Loading from './components/Loading/Loading';
import { FLICKR_API_KEY } from './config/Constants';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textToSearch: '',
      page: 0,
      pages: 1,
      photos: [],
      loading: true,
      isViewerVisible: false,
      activePhoto: null
    };
  }

  componentDidMount() {
    // Add event listener for mouse scrolling
    document.addEventListener('scroll', this.trackScrolling);
    // Add event listener for keyup events to switch photos on the Viewer
    window.addEventListener('keyup', this.keyHandling);
    this.searchFlickrPhotos(this.state.textToSearch);
  }

  componentDidUpdate() {
    // Trigger scrolling function to check if photos filled the whole page (specially in case of big res monitors)
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
      this.searchFlickrPhotos(this.state.textToSearch, this.state.page);
    }
  };

  keyHandling = e => {
    const { activePhoto } = this.state;

    switch (activePhoto && e.keyCode) {
      // Press left arrow
      case 37:
        this.handleOnArrowClick(-1);
        break;
      // Press right arrow
      case 39:
        this.handleOnArrowClick(1);
        break;
      default:
    }
  };

  searchFlickrPhotos = (text, page = 1) => {
    const { photos } = this.state;

    this.setState(
      {
        page: page + 1,
        loading: true
      },
      () => {
        // If the text is filled, search for related photos, if not load a refined gallery from a specific user
        const url =
          text && text.length
            ? `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${text}&page=${page}&per_page=20&format=json&nojsoncallback=1`
            : `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${FLICKR_API_KEY}&user_id=31148056@N04&page=${page}&per_page=20&format=json&nojsoncallback=1`;

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
            alert('Error fetching the data', error);
          });
      }
    );
  };

  handleOnSubmit = text => {
    return this.setState({ textToSearch: text, photos: [], page: 1 });
  };

  handleOnPhotoClick = photoId => {
    axios
      .all([
        axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
        ),
        axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
        )
      ])

      .then(
        axios.spread((sizesResponse, infoResponse) => {
          const sizes = sizesResponse.data.sizes.size;
          // Since the response is sorted by photo size, pick the latest object to get the largest
          const largestPhoto = sizes[sizes.length - 1];
          const title = infoResponse.data.photo.title._content;

          this.setState({
            activePhoto: { photoId, title, ...largestPhoto },
            isViewerVisible: true
          });
        })
      )
      .catch(error => {
        alert('Error fetching the photo URL data', error);
      });
  };

  handleOnViewerClose = () => {
    this.setState({ isViewerVisible: false, activePhoto: null });
  };

  handleOnViewerClose = () => {
    this.setState({ isViewerVisible: false, activePhoto: null });
  };

  handleOnArrowClick = relativeIndex => {
    const { photos, activePhoto } = this.state;

    // Find the object of the current active photo by its id
    const currentPhotoObject = photos.filter(
      photo => photo.id === activePhoto.photoId
    );

    // Update the index summing up the passed relative index
    const newIndex = photos.indexOf(...currentPhotoObject) + relativeIndex;
    // Get the corresponding object in the photos array
    const newPhoto = photos[newIndex];

    // Prevents out of array range accesses if object wasn't found
    if (newIndex !== -1 && newPhoto) {
      return this.handleOnPhotoClick(newPhoto.id);
    }

    return null;
  };

  renderPhotosContainer = () => {
    const { loading, photos } = this.state;

    return (
      <div>
        <PhotosContainer data={photos} onPhotoClick={this.handleOnPhotoClick} />
        {loading && <Loading />}
      </div>
    );
  };

  render() {
    const { isViewerVisible, activePhoto } = this.state;

    return (
      <div className='App'>
        <PhotoViewer
          visible={isViewerVisible}
          photo={activePhoto}
          onArrowClick={this.handleOnArrowClick}
          onViewerClose={this.handleOnViewerClose}
        />
        <h1>Flickr Gallery</h1>

        <SearchBar onSubmit={this.handleOnSubmit} />
        {this.renderPhotosContainer()}
      </div>
    );
  }
}

export default App;

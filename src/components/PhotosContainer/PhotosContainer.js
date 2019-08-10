import React from 'react';
import './PhotosContainer.css';
import Photo from '../Photo/Photo';

// Custom PhotosContainer component
class PhotosContainer extends React.Component {
  render() {
    return (
      <div className='PhotosContainer-container'>
        <Photo
          url='https://live.staticflickr.com/65535/48501606021_5d0e0dde09_m.jpg'
          title='prueba'
        />
        <Photo
          url='https://live.staticflickr.com/65535/48501608221_54986bb4a8_m.jpg'
          title='prueba'
        />
        <Photo
          url='https://live.staticflickr.com/65535/48501606021_5d0e0dde09_m.jpg'
          title='prueba'
        />
        <Photo
          url='https://live.staticflickr.com/65535/48501608221_54986bb4a8_m.jpg'
          title='prueba'
        />
      </div>
    );
  }
}

export default PhotosContainer;

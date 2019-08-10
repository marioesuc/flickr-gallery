import React from 'react';
import './PhotosContainer.css';
import Photo from '../Photo/Photo';

// Custom PhotosContainer component
class PhotosContainer extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div className='PhotosContainer-container'>
        {data.map(photo => (
          <Photo
            key={photo.id}
            url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${
              photo.id
            }_${photo.secret}_m.jpg`}
            title={photo.title}
          />
        ))}
      </div>
    );
  }
}

export default PhotosContainer;

import React from 'react';
import './Photo.css';

// Custom Photo component
const Photo = props => {
  const handleOnPhotoClick = () => props.onClick(props.photoId);

  const { url, title } = props;

  return (
    <div onClick={handleOnPhotoClick}>
      <img src={url} className='Photo-container' alt={title} title={title} />
    </div>
  );
};

export default Photo;

import React from 'react';
import './Photo.css';

const Photo = props => {
  return (
    <div>
      <img
        src={props.url}
        className='Photo-container'
        alt={props.title}
        title={props.title}
      />
    </div>
  );
};

export default Photo;

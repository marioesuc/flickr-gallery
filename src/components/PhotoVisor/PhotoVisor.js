import React from 'react';
import './PhotoVisor.css';

// Custom PhotoVisor component
class PhotoVisor extends React.Component {
  handleOnVisorClose = () => this.props.onVisorClose();

  render() {
    const { visible, photo } = this.props;

    if (visible) {
      const { source } = photo;

      return (
        <div className='PhotoVisor-container'>
          <div className='PhotoVisor-ImageContainer'>
            <span
              className='PhotoVisor-close'
              onClick={this.handleOnVisorClose}
            >
              Close
            </span>
            <img title='' alt='' className='PhotoVisor-image' src={source} />
          </div>
        </div>
      );
    }

    return null;
  }
}

export default PhotoVisor;

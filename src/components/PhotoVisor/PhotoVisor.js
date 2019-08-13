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
        <div>
          <img alt={source} className='PhotoVisor-image' src={source} />
          <button
            className='PhotoVisor-close'
            onClick={this.handleOnVisorClose}
          >
            Close
          </button>
          <div
            className='PhotoVisor-background'
            onClick={this.handleOnVisorClose}
          />
        </div>
      );
    }

    return null;
  }
}

export default PhotoVisor;

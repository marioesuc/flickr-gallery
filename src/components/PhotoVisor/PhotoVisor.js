import React from 'react';
import './PhotoVisor.css';

// Custom PhotoVisor component
class PhotoVisor extends React.Component {
  handleOnArrowClick = relativeIndex => this.props.onArrowClick(relativeIndex);
  handleOnVisorClose = () => this.props.onVisorClose();

  render() {
    const { visible, photo } = this.props;

    if (visible) {
      const { source, title } = photo;

      return (
        <div className='PhotoVisor-container'>
          <div className='PhotoVisor-ImageContainer'>
            <img alt={source} className='PhotoVisor-image' src={source} />
            <div className='PhotoVisor-ArrowsContainer'>
              <div
                className='PhotoVisor-LeftArrowContainer'
                onClick={() => this.handleOnArrowClick(-1)}
              >
                ←
              </div>
              <div
                className='PhotoVisor-RightArrowContainer'
                onClick={() => this.handleOnArrowClick(1)}
              >
                →
              </div>
            </div>
            <div className='PhotoVisor-Title'>
              <span>{title}</span>
            </div>
          </div>
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

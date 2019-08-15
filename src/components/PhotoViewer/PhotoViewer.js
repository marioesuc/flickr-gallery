import React from 'react';
import './PhotoViewer.css';

// Custom PhotoViewer component
class PhotoViewer extends React.Component {
  handleOnArrowClick = relativeIndex => this.props.onArrowClick(relativeIndex);
  handleOnViewerClose = () => this.props.onViewerClose();

  render() {
    const { visible, photo } = this.props;

    if (visible) {
      const { source, title } = photo;

      return (
        <div>
          <div className='PhotoViewer-ImageContainer'>
            <img alt={source} className='PhotoViewer-image' src={source} />
            <div className='PhotoViewer-ArrowsContainer'>
              <div
                className='PhotoViewer-LeftArrowContainer'
                onClick={() => this.handleOnArrowClick(-1)}
              >
                ←
              </div>
              <div
                className='PhotoViewer-RightArrowContainer'
                onClick={() => this.handleOnArrowClick(1)}
              >
                →
              </div>
            </div>
            <div className='PhotoViewer-Title'>
              <span>{title}</span>
            </div>
          </div>
          <button
            className='PhotoViewer-close'
            onClick={this.handleOnViewerClose}
          >
            Close
          </button>
          <div
            className='PhotoViewer-background'
            onClick={this.handleOnViewerClose}
          />
        </div>
      );
    }

    return null;
  }
}

export default PhotoViewer;

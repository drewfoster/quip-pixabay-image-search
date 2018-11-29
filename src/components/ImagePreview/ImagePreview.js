import React from 'react';

import './ImagePreview.css';


class ImagePreview extends React.Component {

  render() {
      return (
        <div className="">
          <div className="">
            <img className="selected" src={this.props.image.largeImageURL} alt={`${this.props.image.type} - ${this.props.image.tags}`} />
            <div className="buttons">
              <a className="grey" onClick={this.props.deSelectImage}>Back</a>
              <a onClick={this.props.uploadImage}>Pick Me!</a>
            </div>
            <div>
              <a href={this.props.image.pageURL}>
                <img className="logo" src="https://pixabay.com/static/img/logo.png" alt="Pixabay logo"/>
              </a>
            </div>
          </div>
        </div>
      )
  }
}

export default ImagePreview;

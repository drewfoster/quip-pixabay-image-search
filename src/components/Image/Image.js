import React from 'react';
import './Image.css';

import ImagePreview from '../ImagePreview/ImagePreview';

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.selectImage = this.selectImage.bind(this);
  }

  selectImage() {
    this.props.selectImage(this.props.image);
    console.log("Select Image!" + this.props.image);
  }

  render() {
    let imageSrc = this.props.image.previewURL;
    let className = 'image';
    let onClick = this.selectImage;

    if (this.props.imageContext === "selectedImage") {
      imageSrc = this.props.image.largeImageURL;
      className = 'large';
      onClick = undefined;
    }

    return (
      <div className={className} onClick={onClick}>
        { this.props.imageContext === "selectedImage" ?
            <div className="image-wrapper">
              <quip.apps.ui.Image
                  record={this.props.selectedImage.get("selectedImage")}
                  placeholderWidth={800}
                  placeholderHeight={600}
                  width={800}
                  responsiveToContainerWidth={true}
                  allowResizing={true}
              />
              <button className="searchButton" onClick={this.props.searchAgain}>search</button>
            </div>
              :
              <img className="max-width" src={imageSrc} alt={`${this.props.image.type} by ${this.props.image.user} - ${this.props.image.tags}`} />
 }
      </div>
        )
  }
}

export default Image;

import React from 'react';
import './ImagesList.css';

import Image from '../Image/Image';

class ImagesList extends React.Component {


    render() {

      let Component;
      if(this.props.images.length > 0) {
        Component = this.props.images.map(image => {
          return <Image image={image} key={image.id} selectImage={this.props.selectImage} imageContext="imageList"/>;
        })
      } else {
        Component = this.props.imageListMessage;
      }

      return (
        <div className="imageList">
          {
            Component
          }
        </div>
      );
    }
}

export default ImagesList;

import React from 'react';
import './ImagesList.css';

import Image from '../Image/Image';

class ImagesList extends React.Component {



    render() {
      return (
        <div className="imageList">
          {
            this.props.images.map(image => {
              return <Image image={image} key={image.id} selectImage={this.props.selectImage} imageContext="imageList"/>;
            })
          }
        </div>
      );
    }
}

export default ImagesList;

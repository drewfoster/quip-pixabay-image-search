import React from 'react';

import './Overlay.css';
import SearchBar from '../SearchBar/SearchBar';
import ImagesList from '../ImagesList/ImagesList';
import ImagePreview from '../ImagePreview/ImagePreview';

class Overlay extends React.Component {


  render() {

    return (
          <div className="modal" id="modal">
            <div className="modalContents">
              <h2>Search - Pixabay</h2>
                <SearchBar searchPixabay={this.props.searchPixabay} searchPlaceholder={this.props.searchPlaceholder} />
                {
                  this.props.image.id ?
                    <ImagePreview uploadImage={this.props.uploadImage} deSelectImage={this.props.selectImage} image={this.props.image} /> :
                    <ImagesList images={this.props.images} selectImage={this.props.selectImage}/>
                }
            </div>
          </div>
      )
  }
}

export default Overlay;

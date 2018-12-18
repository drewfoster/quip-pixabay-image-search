import React from 'react';

import './Overlay.css';
import Spinner from '../Spinner/Spinner';
import SearchBar from '../SearchBar/SearchBar';
import ImagesList from '../ImagesList/ImagesList';
import ImagePreview from '../ImagePreview/ImagePreview';

class Overlay extends React.Component {


  render() {

    return (
          <div className="modal" id="modal">
            <div className="modalContents">
              <h2>Search - Pixabay</h2>
                <SearchBar searchPixabay={this.props.searchPixabay} toggleSpinnerDisplay={this.props.toggleSpinnerDisplay} searchPlaceholder={this.props.searchPlaceholder} />
                { this.props.showSpinnerDisplay === true ? <Spinner /> : undefined }
                {
                  this.props.image.id ?
                    <ImagePreview openLink={this.props.openLink} uploadImage={this.props.uploadImage} deSelectImage={this.props.selectImage} image={this.props.image} /> :
                    <ImagesList imageListMessage={this.props.imageListMessage} images={this.props.images} selectImage={this.props.selectImage}/>
                }
            </div>
          </div>
      )
  }
}

export default Overlay;

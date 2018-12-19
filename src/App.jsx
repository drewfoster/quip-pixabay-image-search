import quip from "quip";
import React, { Component } from 'react';
import './App.less';

import SearchBar from './components/SearchBar/SearchBar';
import ImagesList from './components/ImagesList/ImagesList';
import Overlay from './components/Overlay/Overlay';
import Image from './components/Image/Image';
import Placeholder from './components/Placeholder/Placeholder';

import Pixabay from './util/Pixabay.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      displayOverlay: false,
      selectedImage: {},
      imageContext: "list",
      applicationStatus: "placeholder",
      searchPlaceholder: "Search Pixabay - Free to use images",
      showSpinnerDisplay: false,
      imageListMessage: "Your results will appear here!"
    };

    this.searchPixabay = this.searchPixabay.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.uploadSelectedImage = this.uploadSelectedImage.bind(this);
    this.searchAgain = this.searchAgain.bind(this);
    this.getImage = this.getImage.bind(this);
    this.toggleSpinnerDisplay = this.toggleSpinnerDisplay.bind(this);
    this.openLink = this.openLink.bind(this);
  }

  componentDidMount() {
    quip.apps.enableResizing();
  }

  searchPixabay( term ) {
    Pixabay.search( term ).then(images => {
      if(images.length > 0) {
        this.setState({images: images, searchPlaceholder: term, showSpinnerDisplay: false});
      } else {
        this.setState({imageListMessage: "Your search returned no results.  Please try again.", images: [], showSpinnerDisplay: false})
      }
    });
  }

  toggleOverlay() {
    if (this.state.displayOverlay === false) {
      this.setState({displayOverlay: true});
    } else {
      this.setState({displayOverlay: false});
    }

  }

  toggleSpinnerDisplay() {
    if (this.state.showSpinnerDisplay === false) {
      this.setState({showSpinnerDisplay: true});
    } else {
      this.setState({showSpinnerDisplay: false});
    }
  }

  selectImage( image ) {
    if (image) {
      this.setState({selectedImage: image});
    } else {
      this.setState({selectedImage: {}});
    }
  }

  getImage( url ) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.arrayBuffer();
        }).then(buffer => {
        return new Blob([new Uint8Array(buffer)]);
    });
  }

  async uploadSelectedImage() {
    this.setState({applicationStatus: 'image'});
    this.toggleOverlay();
    let selectedImage = this.props.selectedImage.get("selectedImage");
    const imageBlob = await this.getImage(this.state.selectedImage.largeImageURL);
    selectedImage.uploadFile(imageBlob);
  }

  searchAgain() {
    this.selectImage({});
    this.setState({applicationStatus: 'placeholder'});
    this.toggleOverlay();
  }

  openLink(link) {
    console.log("App.js openLink Fired! " + link);
    quip.apps.openLink(link);
  }

  render() {
    let App;
    if ( this.props.showPlaceholder === true && this.state.applicationStatus === 'placeholder' ) {
      App = <Placeholder toggleOverlay={this.toggleOverlay}/>;
    } else {
      App = <Image selectedImage={this.props.selectedImage} image={this.state.selectedImage} key={this.state.selectedImage.id} searchAgain={this.searchAgain} imageContext='selectedImage'/>;
    }

    return (
      <div className="App">
        {App}
        { this.state.displayOverlay ? (<Overlay imageListMessage={this.state.imageListMessage} openLink={this.openLink} showSpinnerDisplay={this.state.showSpinnerDisplay} toggleSpinnerDisplay={this.toggleSpinnerDisplay} searchPixabay={this.searchPixabay} searchPlaceholder={this.state.searchPlaceholder} selectImage={this.selectImage} images={this.state.images} image={this.state.selectedImage} displayOverlay={this.state.displayOverlay} toggleOverlay={this.toggleOverlay} uploadImage={this.uploadSelectedImage}/>) : undefined }
      </div>
    );
  }
}

export default App;

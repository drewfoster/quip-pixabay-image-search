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
      searchPlaceholder: "Search Pixabay - Free to use images"
    };

    this.searchPixabay = this.searchPixabay.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.uploadSelectedImage = this.uploadSelectedImage.bind(this);
    this.searchAgain = this.searchAgain.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    quip.apps.enableResizing();
  }

  searchPixabay( term ) {
    Pixabay.search( term ).then(images => {
      console.log(images);
      this.setState({images: images, searchPlaceholder: term});
    });
  }

  toggleOverlay() {
    if (this.state.displayOverlay === false) {
      this.setState({displayOverlay: true});
    } else {
      this.setState({displayOverlay: false});
    }

  }

  selectImage( image ) {
    if (image.id === this.state.selectedImage.id) {
      this.setState({selectedImage: {}});
    } else {
      this.setState({selectedImage: image});
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
        { this.state.displayOverlay ? (<Overlay searchPixabay={this.searchPixabay} searchPlaceholder={this.state.searchPlaceholder} selectImage={this.selectImage} images={this.state.images} image={this.state.selectedImage} displayOverlay={this.state.displayOverlay} toggleOverlay={this.toggleOverlay} uploadImage={this.uploadSelectedImage}/>) : undefined }
      </div>
    );
  }
}

export default App;

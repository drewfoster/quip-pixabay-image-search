import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      numberOfResultsRequested: 20,
      pageRequested: 1,
      orientation: "all"
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onEnterKeyPressed = this.onEnterKeyPressed.bind(this);
  }


  handleTermChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  handleSearch(e) {
    this.props.deSelectImage({});
    this.props.toggleSpinnerDisplay();
    this.props.searchPixabay( this.state.term, this.state.numberOfResultsRequested, this.state.pageRequested, this.state.orientation);
    e.preventDefault();
  }

  onEnterKeyPressed(e) {
    if(e.charCode == 13) {
      this.handleSearch(e);
    }
  }

  render() {
    return (
      <div>
        <div className="SearchBar">
          <input type="search" id="search" placeholder={this.props.searchPlaceholder} onChange={this.handleTermChange} onKeyPress={this.onEnterKeyPressed}></input>
          <a onClick={this.handleSearch}>Lets Go!</a>
        </div>
      </div>

    );
  }
}
export default SearchBar;

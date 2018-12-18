import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
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
    this.props.toggleSpinnerDisplay();
    this.props.searchPixabay(this.state.term);
    e.preventDefault();
  }

  onEnterKeyPressed(e) {
    if(e.charCode == 13) {
      this.handleSearch(e);
    }
  }

  render() {
    return (

      <div className="SearchBar">
        <input id="search" placeholder={this.props.searchPlaceholder} onChange={this.handleTermChange} onKeyPress={this.onEnterKeyPressed}></input>
        <a onClick={this.handleSearch}>Lets Go!</a>
      </div>

    );
  }
}
export default SearchBar;

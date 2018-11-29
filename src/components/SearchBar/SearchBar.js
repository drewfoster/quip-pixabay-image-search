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

  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  handleSearch(e) {
    this.props.searchPixabay(this.state.term);
    e.preventDefault();
  }

  render() {
    return (

      <div className="SearchBar">
        <input id="search" placeholder={this.props.searchPlaceholder} onChange={this.handleTermChange}></input>
        <a onClick={this.handleSearch}>Lets Go!</a>
      </div>

    );
  }
}
export default SearchBar;

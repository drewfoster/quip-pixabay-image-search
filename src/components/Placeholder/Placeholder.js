import React from 'react';
import './Placeholder.css';

class Placeholder extends React.Component {
  render() {
    return (
      <div className="placeholder" onClick={this.props.toggleOverlay}>
        <div className="image-placeholder-with-text">

          <div className="centreText">Click to search images</div>
        </div>
      </div>
    )
  }
}

export default Placeholder;

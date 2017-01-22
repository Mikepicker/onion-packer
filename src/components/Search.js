import React, { Component } from 'react';

export default class Search extends Component {

  handleChange = () => {
    this.props.setFilterText(this.filterTextInput.value);
  }

  render() {
    return(
      <div>
        <input
          type="text"
          className="form-control"
          value={this.props.filterText}
          ref={(input) => this.filterTextInput = input}
          onChange={this.handleChange}
          style={inputStyle}/>
        <hr style={dividerStyle}/>
      </div>
    );
  }
}

const inputStyle = {
  border: '0',
  boxShadow: 'none',
  textAlign: 'center',
  verticalAlign: 'middle',
  height: '64px',
  fontSize: '20px'
}

const dividerStyle = {
  margin: '0',
  padding: '0'
}

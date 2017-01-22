import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return(
      <div>
        <input type="text" className="form-control" style={inputStyle}/>
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

import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return(
      <div style={footerStyle}>
        <hr style={dividerStyle}/>
        <p style={resizerStyle}>100%</p>
      </div>
    );
  }
}

const footerStyle = {
  position: 'absolute',
  bottom: '0',
  width: '100%',
  height: '40px'
}

const dividerStyle = {
  margin: '0',
  padding: '0'
}

const resizerStyle = {
  position: 'absolute',
  fontSize: '12px',
  color: '#8c8c8c',
  bottom: '0',
  left: '8px',
  cursor: 'pointer'
}

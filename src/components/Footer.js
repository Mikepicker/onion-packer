import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return(
      <div style={footerStyle}>
        <p style={resizerStyle}>100%</p>
        <p style={descrStyle}>{this.props.selected.split("/").pop()}</p>
        <p style={descrStyle}></p>
      </div>
    );
  }
}

const footerStyle = {
  position: 'absolute',
  padding: '0 8px 0 8px',
  bottom: '0',
  width: '100%',
  height: '40px',
  backgroundColor: '#404040',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end'
}

const resizerStyle = {
  fontSize: '12px',
  color: '#fff',
  cursor: 'pointer',
  flex: '1'
}

const descrStyle = {
  fontSize: '12px',
  color: '#fff',
  flex: '1',
  textAlign: 'center'
}

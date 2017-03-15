import React, { Component } from 'react';

export default class Search extends Component {
  componentWillMount = () => {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = (e) => {
    e.preventDefault();

    let temp = this.props.filterText;

    // Match Backspace
    if (e.key === 'Backspace') {
      this.props.setFilterText(temp.slice(0, -1));
    }

    // Match Esc
    else if (e.key === 'Escape') {
      temp = '';
      this.props.setFilterText(temp);
    }

    // Match exactly one alphanumeric char
    else if (/^[a-z0-9-_]$/i.test(e.key) && temp.length < 10) {
      temp += e.key;
      this.props.setFilterText(temp);
    }
  }

  clearText = () => {
    this.props.setFilterText('');
  }

  render() {

    let text = this.props.filterText.length > 0 ? this.props.filterText : this.props.placeholder;
    let textStyle = this.props.filterText.length > 0 ? filterStyle : placeholderStyle;

    // Clear button
    let clearButton;
    if (this.props.filterText.length > 0) {
      clearButton = <div className="fa fa-times" style={clearButtonStyle} onClick={this.clearText}/>
    }

    return(
      <div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={powerButtonDragStyle}/>
          <div style={dragBarStyle}/>
          <div style={clearButtonDragStyle}/>
        </div>
        <div style={searchStyle}>
          <div style={textStyle}>{text}</div>
          <div className="fa fa-power-off" style={powerButtonStyle} onClick={this.props.powerOff}/>
          {clearButton}
          <hr style={dividerStyle}/>
        </div>
      </div>
    );
  }
}

const searchStyle = {
  position: 'fixed',
  top: 0,
  width: '100%',
  backgroundColor: '#fff',
  zIndex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const filterStyle = {
  border: '0',
  boxShadow: 'none',
  textAlign: 'center',
  height: '64px',
  fontSize: '20px',
  paddingTop: '20px',
  color: '#666666',
  cursor: 'default'
}

const placeholderStyle = {
  border: '0',
  boxShadow: 'none',
  textAlign: 'center',
  height: '64px',
  fontSize: '20px',
  paddingTop: '20px',
  color: '#a1a1a1',
  cursor: 'default',
  opacity: '0.7'
}

const dividerStyle = {
  position: 'absolute',
  width: '100%',
  top: '100%',
  margin: '0',
  padding: '0'
}

const powerButtonStyle = {
  position: 'absolute',
  left: '32px',
  cursor: 'pointer',
  color: '#666666',
  WebkitAppRegion: 'no-drag'
}

const clearButtonStyle = {
  position: 'absolute',
  right: '32px',
  cursor: 'pointer',
  color: '#666666',
  WebkitAppRegion: 'no-drag'
}

const dragBarStyle = {
  flex: 1,
  width: '100%',
  height: '64px',
  WebkitAppRegion: 'drag'
}

const powerButtonDragStyle = {
  flex: '0 0 48px',
  height: '64px'
}

const clearButtonDragStyle = {
  flex: '0 0 48px',
  height: '64px'
}

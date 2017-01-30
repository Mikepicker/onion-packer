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
      temp = temp.slice(0, -1);
      this.props.setFilterText(temp);
    }

    // Match Esc
    else if (e.key === 'Escape') {
      temp = '';
      this.props.setFilterText(temp);
    }

    // Match exactly one alphanumeric char
    else if (/^[a-z0-9]$/i.test(e.key) && temp.length < 10) {
      temp += e.key;
      this.props.setFilterText(temp);
    }
  }

  render() {

    let placeholder = 'Type to filter';
    let text = this.props.filterText.length > 0 ? this.props.filterText : placeholder;
    let textStyle = this.props.filterText.length > 0 ? filterStyle : placeholderStyle;

    return(
      <div style={searchStyle}>
        <div style={textStyle}>{text}</div>
        <hr style={dividerStyle}/>
      </div>
    );
  }
}

const searchStyle = {
  position: 'fixed',
  top: 0,
  width: '100%',
  backgroundColor: '#fff',
  zIndex: '1'
}

const filterStyle = {
  border: '0',
  boxShadow: 'none',
  textAlign: 'center',
  height: '64px',
  fontSize: '20px',
  paddingTop: '20px',
  color: '#636262',
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
  margin: '0',
  padding: '0'
}

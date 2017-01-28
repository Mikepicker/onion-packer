import React, { Component } from 'react';

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterText: ''
    }
  }

  componentWillMount = () => {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = (e) => {
    e.preventDefault();

    let temp = this.state.filterText;

    // Match Backspace
    if (e.key === 'Backspace') {
      temp = temp.slice(0, -1);
      this.setState({ filterText: temp });
      this.props.setFilterText(temp);
    }

    // Match exactly one alphanumeric char
    else if (/^[a-z0-9]$/i.test(e.key) && temp.length < 10) {
      temp += e.key;
      this.setState({ filterText: temp });
      this.props.setFilterText(temp);
    }
  }

  render() {

    let placeholder = this.props.viewTextures ? 'Type to filter' : 'Press ENTER to add tag';
    let text = this.state.filterText.length > 0 ? this.state.filterText : placeholder;
    let textStyle = this.state.filterText.length > 0 ? filterStyle : placeholderStyle;

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
  zIndex: 1
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
  cursor: 'default'
}

const dividerStyle = {
  margin: '0',
  padding: '0'
}

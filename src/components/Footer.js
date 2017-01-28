import React, { Component } from 'react';

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false
    }

  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible
    }));
  }

  render() {

    let menuToggleClass = this.state.menuVisible ? 'fa fa-chevron-down' : 'fa fa-chevron-up';
    let viewModeButtonClass = this.props.viewTextures ? 'fa fa-picture-o' : 'fa fa-tags';

    return(
      <div>
        {this.state.menuVisible ? menu : null}
        <div style={footerStyle}>
          <div className={viewModeButtonClass} style={viewModeButtonStyle} onClick={this.props.toggleViewMode}/>
          <div style={descrStyle}>{this.props.footerText}</div>
          <div className={menuToggleClass} style={menuToggleStyle} onClick={this.toggleMenu}/>
        </div>
      </div>
    );
  }
}

const footerStyle = {
  position: 'fixed',
  padding: '0 16px 0 16px',
  bottom: '0',
  width: '100%',
  height: '40px',
  backgroundColor: '#303030',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
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
  textAlign: 'center',
  fontWeight: 'normal'
}

const menuToggleStyle = {
  color: '#fff',
  cursor: 'pointer',
  flex: '1',
  textAlign: 'right',
  visibility: 'hidden'
}

const menuStyle = {
  position: 'fixed',
  padding: '0 16px 0 16px',
  bottom: '40px',
  width: '100%',
  height: '40px',
  backgroundColor: '#404040',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const viewModeButtonStyle = {
  flex: '1',
  color: '#fff',
  cursor: 'pointer'
}

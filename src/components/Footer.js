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

    let menuButtonClass = this.state.menuVisible ? 'fa fa-chevron-up' : 'fa fa-chevron-down';

    return(
      <div>
        {this.state.menuVisible ? <div style={menuStyle}/> : null}
        <div style={footerStyle}>
          <div style={resizerStyle}>100%</div>
          <div style={descrStyle}>{this.props.selected}</div>
          <div className={menuButtonClass} style={menuButtonStyle} onClick={this.toggleMenu}/>
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
  textAlign: 'center'
}

const menuButtonStyle = {
  color: '#fff',
  cursor: 'pointer',
  flex: '1',
  textAlign: 'right'
}

const menuStyle = {
  position: 'absolute',
  padding: '0 16px 0 16px',
  bottom: '40px',
  width: '100%',
  height: '40px',
  backgroundColor: '#404040',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end'
}

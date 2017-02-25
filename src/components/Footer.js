import React, { Component } from 'react';

export default class Footer extends Component {


  render() {

    let viewModeButtonClass;
    switch(this.props.viewMode) {
      case 'textures':
        viewModeButtonClass = 'fa fa-picture-o';
        break;

      case 'tags':
        viewModeButtonClass = 'fa fa-tags';
        break;

      case 'preview':
        viewModeButtonClass = 'fa fa-times';
        break;

      default:
        viewModeButtonClass = 'fa fa-picture-o';
        break;
    }

    let deselectOption = <div style={{ flex: 1 }}/>;
    if (this.props.showTextureOptions) {
      deselectOption = <div className='fa fa-times' style={deselectOptionStyle} onClick={this.props.deselectAllTextures}/>
    }

    return(
      <div>
        <div style={footerStyle}>
          <div className={viewModeButtonClass} style={viewModeButtonStyle} onClick={this.props.toggleViewMode}/>
          <div style={descrStyle}>{this.props.footerText}</div>
          {deselectOption}
        </div>
        <div style={creditsStyle}>Made with <div className='fa fa-heart' style={{ color: '#ff6f6f'}}/> by Michele Rullo & Andrea Cipollone</div>
      </div>
    );
  }
}

const footerStyle = {
  position: 'fixed',
  padding: '0 16px 0 16px',
  bottom: '20px',
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

const creditsStyle = {
  position: 'fixed',
  padding: '4px 16px 0 16px',
  bottom: '0',
  width: '100%',
  height: '20px',
  backgroundColor: '#202020',
  color: '#7e7e7e',
  fontSize: '10px',
  fontWeight: 'bold',
  textAlign: 'center'
}

const viewModeButtonStyle = {
  flex: '1',
  color: '#fff',
  cursor: 'pointer'
}

const deselectOptionStyle = {
  flex: '1',
  color: '#fff',
  cursor: 'pointer',
  textAlign: 'end'
}

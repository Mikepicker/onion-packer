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

    // View Mode Button (left)
    let viewModeButton =
      <div style={viewModeButtonContainer}>
        <div className={viewModeButtonClass} style={viewModeButtonStyle} onClick={this.props.toggleViewMode}/>
      </div>

    // Option Buttons (right)
    let optionButtons = <div style={optionsStyle}/>;
    if (this.props.showTextureOptions) {
      optionButtons =
        <div style={optionsStyle}>
          <div>
            <div className='fa fa-trash-o' style={optionIconStyle} onClick={this.props.deleteSelectedTags}/>
          </div>
          <div>
            <div className='fa fa-times' style={optionIconStyle} onClick={this.props.deselectAllTextures}/>
          </div>
        </div>
    }

    return(
      <div>
        <div style={footerStyle}>
          {viewModeButton}
          <div style={descrStyle}>{this.props.footerText}</div>
          {optionButtons}
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

const viewModeButtonContainer = {
  flex: '1'
}

const viewModeButtonStyle = {
  color: '#fff',
  cursor: 'pointer'
}

const optionsStyle = {
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end'
}

const optionStyle = {
  flex: '1',
  textAlign: 'right',
  backgroundColor: 'rgb(209, 130, 62)'
}

const optionIconStyle = {
  color: '#fff',
  cursor: 'pointer',
  textAlign: 'right',
  marginLeft: '16px'
}

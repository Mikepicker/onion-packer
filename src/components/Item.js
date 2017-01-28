import React, { Component } from 'react';

export default class Item extends Component {
  constructor(props) {
      super(props);

      this.state = {
        'hover': false
      }
  }

  onHover = () => {
    this.setState({ 'hover': true });
    this.props.setFooterText(this.props.name);
  }

  onOut = () => {
    this.setState({ 'hover': false });
    this.props.setFooterText('');
  }

  onClickPreview = (e) => {
      // TODO
  }

  onClickClipboard = (e) => {
    this.props.copyToClipboard(this.props.name);
  }

  render() {

    let hoverMenu = null;
    if (this.state.hover) {
      hoverMenu =
        <div style={hoverMenuStyle}>
          <div className="fa fa-eye" style={hoverItemStyle} onClick={this.onClickPreview}/>
          <div className="fa fa-clipboard" style={hoverItemStyle} onClick={this.onClickClipboard}/>
        </div>
    }

    return(
      <div
        className="col-xs-3 col-sm-3 col-md-3 col-lg-3"
        onMouseEnter={this.onHover}
        onMouseLeave={this.onOut}>
        <img
          className="img-responsive img-rounded"
          src={this.props.path}
          alt=""
          style={this.state.hover ? hoverStyle : itemStyle}/>
        {hoverMenu}
      </div>
    );
  }
}

const itemStyle = {
  width: '64px',
  height: '64px'
}

const hoverStyle = {
  width: '64px',
  height: '64px',
  border: '2px',
  boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.6)'
}

const hoverMenuStyle = {
  position: 'absolute',
  bottom: '0',
  width: '64px',
  height: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '0 0 8px 8px'
}

const hoverItemStyle = {
  flex: '1',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.7)',
  cursor: 'pointer'
}

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
    this.props.setSelected(this.props.name);
  }

  onOut = () => {
    this.setState({ 'hover': false });
    this.props.setSelected('');
  }

  onClick = () => {
    this.props.copyToClipboard(this.props.name);
  }

  render() {

    return(
      <div
        className="col-xs-3 col-sm-3 col-md-3 col-lg-3"
        onMouseEnter={this.onHover}
        onMouseLeave={this.onOut}
        onClick={this.onClick}>
        <img
          className="img-responsive img-rounded"
          src={this.props.path}
          alt=""
          style={this.state.hover ? hoverStyle : itemStyle}/>
      </div>
    );
  }
}

const itemStyle = {
  width: '64px',
  height: '64px',
  cursor: 'pointer'
}

const hoverStyle = {
  width: '64px',
  height: '64px',
  cursor: 'pointer',
  border: '2px',
  boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.6)'
}

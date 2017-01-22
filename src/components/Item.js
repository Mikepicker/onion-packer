import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    return(
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <img className="img-responsive img-rounded" src={this.props.image} alt="" style={itemStyle}/>
      </div>
    );
  }
}

const itemStyle = {
  width: '64px',
  height: '64px',
  cursor: 'pointer'
}

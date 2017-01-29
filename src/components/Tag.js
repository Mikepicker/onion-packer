import React, { Component } from 'react';

export default class Tag extends Component {
  render() {
    return(
      <div style={tagStyle}>
        <div style={tagTextStyle}>{this.props.text}</div>
        <div style={tagDeleteStyle}>
          <div className="fa fa-times" onClick={() => this.props.removeTag(this.props.text)} style={{ cursor: 'pointer' }}/>
        </div>
      </div>
    );
  }
}

const tagTextStyle = {
  color: '#636262',
  flex: 2,
  cursor: 'default',
  textAlign: 'left',
  fontSize: '12px'
}

const tagDeleteStyle = {
  color: '#636262',
  flex: 1,
  textAlign: 'right',
  marginLeft: '4px',
  fontSize: '12px'
}

const tagStyle = {
  flex: '1',
  height: '20px',
  minWidth: '100px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '5px',
  borderColor: '#cbcbcb',
  padding: '0 8px 0 8px',
  margin: '0 8px 16px 8px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '1px 1px 5px #949494'
}

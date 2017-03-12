import React, { Component } from 'react';

export default class Tag extends Component {
  render() {
    return(
      <div style={tagStyle}>
        <div style={tagTextContainerStyle}>
          <div style={tagTextStyle} onClick={() => this.props.onClickTag(this.props.text)}>{this.props.text + ' (' + this.props.size + ')'}</div>
        </div>
        <div style={tagDeleteStyle}>
          <div className="fa fa-times" onClick={() => this.props.removeTag(this.props.text)} style={{ cursor: 'pointer' }}/>
        </div>
      </div>
    );
  }
}

const tagTextContainerStyle = {
  color: '#636262',
  flex: 2,
  cursor: 'default',
  display: 'flex',
  alignItems: 'flex-start',
}

const tagTextStyle = {
  cursor: 'pointer',
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
  minWidth: '120px',
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

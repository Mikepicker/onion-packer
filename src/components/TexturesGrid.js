import React, { Component } from 'react';
import Item from './Item';
import { chunk } from 'lodash';

const CHUNKS = 4;

export default class TexturesGrid extends Component {
  render() {

    // Filtered textures
    let filteredRows = [];
    this.props.textures.forEach((texture) => {

      // Push filtered text only
      let textureName = texture.replace(/^.*[\\\/]/, '').toLowerCase();

      if (textureName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1 ||
          this.props.tag.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
        filteredRows.push({ name: textureName, path: texture });
      }

    });

    // Chunk textures array
    const rows = chunk(filteredRows, CHUNKS);
    let reactRows = [];
    let rowKey = 0;

    rows.forEach((row) => {
      const reactCol = [];

      row.forEach((col) => {
        reactCol.push(
          <Item
            key={col.name}
            name={col.name}
            path={col.path}
            setFooterText={this.props.setFooterText}
            copyToClipboard={this.props.copyToClipboard}/>
        );
      });

      reactRows.push(
        <div key={rowKey++} className="row" style={rowStyle}>{reactCol}</div>
      );
    })

    // Hide grid if no data
    let content = null;
    if (filteredRows.length > 0) {
      content =
      <div className="container-fluid" style={gridStyle}>
        <div style={tagStyle}>{this.props.tag}</div>
        {reactRows}
      </div>
    }

    return(
      <div>{content}</div>
    );
  }
}

const gridStyle = {
  marginTop: '40px'
}

const rowStyle = {
  marginBottom: '20px'
}

const tagStyle = {
  marginBottom: '20px',
  fontSize: '12px',
  color: '#a1a1a1'
}

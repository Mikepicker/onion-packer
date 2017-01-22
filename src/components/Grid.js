import React, { Component } from 'react';
import Item from './Item';
import { chunk } from 'lodash';

const CHUNKS = 4;

export default class Grid extends Component {
  render() {

    // Chunk textures array
    const rows = chunk(this.props.textures, CHUNKS);
    let reactRows = [];
    let rowKey = 0;

    rows.forEach((row) => {
      const reactCol = [];

      row.forEach((col) => {
        reactCol.push(
          <Item key={col} texture={col} setSelected={this.props.setSelected}/>
        );
      });

      reactRows.push(
        <div key={rowKey++} className="row" style={rowStyle}>{reactCol}</div>
      );
    })

    return(
      <div className="container-fluid" style={gridStyle}>
        {reactRows}
      </div>
    );
  }
}

const gridStyle = {
  marginTop: '20px'
}

const rowStyle = {
  marginTop: '20px'
}

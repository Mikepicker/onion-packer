import React, { Component } from 'react';
import Item from './Item';
import fs from 'fs';
import { chunk } from 'lodash';

const PATH = './textures/';
const CHUNKS = 4;

export default class Grid extends Component {
  constructor(props) {
      super(props);

      this.state = {
        'textures': this.getTextures()
      }
  }

  getTextures() {
    let texturesArray = [];
    let files = fs.readdirSync(PATH);
    files.forEach(file => {
        texturesArray.push(PATH + file);
    });
    console.log(texturesArray);
    return texturesArray;
  }

  render() {

    // Chunk textures array
    const rows = chunk(this.state.textures, CHUNKS);
    let reactRows = [];
    let rowKey = 0;

    rows.forEach((row) => {
      const reactCol = [];

      row.forEach((col) => {
        reactCol.push(
          <Item key={col} image={col}/>
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

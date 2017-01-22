import React, { Component } from 'react';
import Search from './Search';
import Grid from './Grid';
import Footer from './Footer';
import fs from 'fs';

const PATH = './textures/';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textures: this.getTextures(),
      selected: ''
    }

  }

  getTextures = () => {
    let texturesArray = [];
    let files = fs.readdirSync(PATH);
    files.forEach(file => {
        texturesArray.push(PATH + file);
    });
    return texturesArray;
  }

  setSelected = (texture) => {
    this.setState({ selected: texture });
  }

  render() {
    return(
      <div>
        <Search />
        <Grid textures={this.state.textures} setSelected={this.setSelected}/>
        <Footer selected={this.state.selected}/>
      </div>
    );
  }
}

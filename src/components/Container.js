import React, { Component } from 'react';
import { clipboard, nativeImage } from 'electron';
import path from 'path';
import Search from './Search';
import Grid from './Grid';
import Footer from './Footer';
import fs from 'fs';
import chokidar from 'chokidar';

const PATH = 'textures';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textures: [],
      selected: '',
      filterText: ''
    }

  }

  componentDidMount = () => {
    let watcher = chokidar.watch(PATH, {ignored: /(^|[\/\\])\../});

    watcher.on('add', path => {

      // Exclude non-images
      if (path.match(/\.(jpeg|jpg|gif|png)$/i) === null)
        return;

      let textures = this.state.textures;
      textures.push(path);
      this.setState({ textures: textures });
    });

    watcher.on('unlink', path => {
      let textures = this.state.textures;
      var index = textures.indexOf(path);

      if (index > -1) {
         textures.splice(index, 1);
      }

      this.setState({ textures: textures });
    });
  }

  setFilterText = (input) => {
    this.setState({ filterText: input });
  }

  setSelected = (texture) => {
    this.setState({ selected: texture });
  }

  copyToClipboard = (textureName) => {
    clipboard.writeImage(nativeImage.createFromPath('textures/' + textureName));
    this.setState({ selected: 'Copied to clipboard!' });
  }

  render() {

    // Grids
    let grids = [];

    grids.push(
      <Grid
        key={1}
        textures={this.state.textures}
        tag='Iron'
        setSelected={this.setSelected}
        filterText={this.state.filterText}
        copyToClipboard={this.copyToClipboard}
      />
    );

    grids.push(
      <Grid
        key={2}
        textures={this.state.textures}
        tag='Wood'
        setSelected={this.setSelected}
        filterText={this.state.filterText}
        copyToClipboard={this.copyToClipboard}
      />
    );

    return(
      <div style={containerStyle}>
        <Search setFilterText={this.setFilterText}/>
        {grids}
        <Footer selected={this.state.selected}/>
      </div>
    );
  }
}
const containerStyle = {
  width: '100%',
  height: '100%',
  paddingTop: '40px'
}

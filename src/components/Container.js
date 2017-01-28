import React, { Component } from 'react';
import { clipboard, nativeImage } from 'electron';
import path from 'path';
import Search from './Search';
import TexturesGrid from './TexturesGrid';
import TagsGrid from './TagsGrid';
import Footer from './Footer';
import fs from 'fs';
import chokidar from 'chokidar';

const PATH = 'textures';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textures: [],
      footerText: '',
      filterText: '',
      viewTextures: true // textures or tags
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

  setFooterText = (texture) => {
    this.setState({ footerText: texture });
  }

  copyToClipboard = (textureName) => {
    clipboard.writeImage(nativeImage.createFromPath('textures/' + textureName));
    this.setState({ footerText: 'Copied to clipboard!' });
  }

  toggleViewMode = () => {
    this.setState(prevState => ({
      viewTextures: !prevState.viewTextures
    }));
  }

  render() {

    // Grids
    let texturesGrids = [];

    texturesGrids.push(
      <TexturesGrid
        key={1}
        textures={this.state.textures}
        tag='Iron'
        setFooterText={this.setFooterText}
        filterText={this.state.filterText}
        copyToClipboard={this.copyToClipboard}
      />
    );

    texturesGrids.push(
      <TexturesGrid
        key={2}
        textures={this.state.textures}
        tag='Wood'
        setFooterText={this.setFooterText}
        filterText={this.state.filterText}
        copyToClipboard={this.copyToClipboard}
      />
    );

    // Tags Grid
    const tagsGrid = <TagsGrid filterText={this.state.filterText}/>

    let content = this.state.viewTextures ? texturesGrids : tagsGrid;
    
    return(
      <div style={containerStyle}>
        <Search
          setFilterText={this.setFilterText}
          viewTextures={this.state.viewTextures}/>
        {content}
        <Footer
          footerText={this.state.footerText}
          toggleViewMode={this.toggleViewMode}
          viewTextures={this.state.viewTextures}/>
      </div>
    );
  }
}
const containerStyle = {
  width: '100%',
  height: '100%',
  paddingTop: '40px',
  paddingBottom: '40px'
}

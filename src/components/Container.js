import React, { Component } from 'react';
import { clipboard, nativeImage } from 'electron';
import path from 'path';
import Search from './Search';
import TexturesGrid from './TexturesGrid';
import TagsGrid from './TagsGrid';
import Footer from './Footer';
import Scene from './Scene';
import fs from 'fs';
import chokidar from 'chokidar';

// Chokidar file watcher
let watcher;

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: {},
      textures: [],
      footerText: '',
      filterText: '',
      viewMode: 'textures', // textures, tags, preview
      texturePreview: null
    }

  }

  // Start file watcher
  componentDidMount = () => {
    watcher = chokidar.watch('', {ignored: /(^|[\/\\])\../});

    watcher.on('add', path => {

      // Exclude non-images
      if (path.match(/\.(jpeg|jpg|gif|png)$/i) === null)
        return;

      // Get tag (texture folder)
      let tag = path.split('\\');
      tag = tag[tag.length-2];

      // Push tag
      let tags = this.state.tags;
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(path);
      console.log(tags);

      // Push texture
      let textures = this.state.textures;
      textures.push({ path: path, tag: tag });

      // Set state
      this.setState({ tags: tags, textures: textures });
    });

    watcher.on('unlink', path => {
      let textures = this.state.textures;
      var index = textures.indexOf(path);

      if (index > -1) {

        // Remove from tags
        let tags = this.state.tags;
        tags[textures[index].tag].splice(textures[index].indexOf(path), 1);

        // Remove from textures
        textures.splice(index, 1);
      }

      this.setState({ tags: tags, textures: textures });
    });

    // Drag & Drop
    document.ondragover = (e) => {
      e.preventDefault()
    }

    document.ondrop = (e) => {
      e.preventDefault();
      let path = e.dataTransfer.files[0].path.replace(/\\/g, '/');
      watcher.add(path);
    }
  }

  setFilterText = (input) => {
    this.setState({ filterText: input });
  }

  setFooterText = (texture) => {
    this.setState({ footerText: texture });
  }

  onTexturePreview = (texturePath) => {
    this.setState({ viewMode: 'preview', texturePreview: texturePath })
  }

  copyToClipboard = (texturePath) => {
    clipboard.writeImage(nativeImage.createFromPath(texturePath));
    this.setState({ footerText: 'Copied to clipboard!' });
  }

  goToTag = (tag) => {
    this.setState({ filterText: tag, viewMode: 'textures' });
  }

  toggleViewMode = () => {

    let nextViewMode;

    if (this.state.viewMode === 'preview') {
      nextViewMode = 'textures';
    }
    else {
      nextViewMode = this.state.viewMode === 'textures' ? nextViewMode = 'tags' : 'textures';
    }

    this.setState({
      viewMode: nextViewMode
    });
  }

  deleteTag = (tag) => {
    let temp = this.state.tags;
    delete temp[tag];
    this.setState({ tags: temp });
  }

  render() {

    let noTags = Object.keys(this.state.tags).length === 0;

    // Drag & Drop UI
    let dragDrop =
    <div style={dragDropStyle}>
      <div>Drag your folders here!</div>
      <div className="fa fa-chevron-down fontbulger"/>
    </div>

    // Grids
    let texturesGrids = [];
    Object.keys(this.state.tags).forEach((tag) => {

      texturesGrids.push(
        <TexturesGrid
          key={tag}
          textures={this.state.tags[tag]}
          tag={tag}
          setFooterText={this.setFooterText}
          filterText={this.state.filterText}
          onTexturePreview={this.onTexturePreview}
          copyToClipboard={this.copyToClipboard}
        />
      );

    });

    // Tags Grid
    const tagsGrid =
      <TagsGrid
        tags={this.state.tags}
        filterText={this.state.filterText}
        deleteTag={this.deleteTag}
        goToTag={this.goToTag}/>

    // 3D Scene
    let scene = <Scene texture={this.state.texturePreview} style={{ paddingTop: '0' }}/>

    let content;
    switch(this.state.viewMode) {

      case 'textures':
        content = noTags ? dragDrop : texturesGrids;
        break;

      case 'tags':
        content = noTags ? dragDrop : tagsGrid;
        break;

      default:
        content = null;
    }

    // Search bar
    const searchBar =
      <Search
        filterText={this.state.filterText}
        setFilterText={this.setFilterText}/>

    return(
      <div>
        { this.state.viewMode === 'preview' ? scene : null }
        { this.state.viewMode === 'preview' ? null : searchBar }
        <div style={containerStyle}>
          {content}
        </div>
        <Footer
          footerText={this.state.footerText}
          toggleViewMode={this.toggleViewMode}
          viewMode={this.state.viewMode}/>
      </div>
    );
  }
}

const containerStyle = {
  width: '100%',
  height: '100%',
  paddingTop: '40px',
  paddingBottom: '50px'
}

const dragDropStyle = {
  position: 'absolute',
  width: '100%',
  top: '150px',
  color: '#a1a1a1',
  fontSize: '25px',
  textAlign: 'center',
  margin: '0 auto',
  opacity: '0.5'
}

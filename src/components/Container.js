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

// Chokidar file watchers (tag -> watcher)
let watchers = {};

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

    // Drag & Drop
    document.ondragover = (e) => {
      e.preventDefault()
    }

    document.ondrop = (e) => {
      e.preventDefault();
      let path = e.dataTransfer.files[0].path.replace(/\\/g, '/');
      this.addWatcher(path);
    }

    // Set local storage
    /*localStorage.removeItem('paths');
    if (!localStorage.getItem('paths')) {
      localStorage.setItem('paths', JSON.string);
      console.log(typeof(localStorage.getItem('paths')));
    }

    // Restore from local storage
    let paths = localStorage.getItem('paths');
    console.log(paths);
    paths.forEach((path) => {
      this.addWatcher(path);
    });*/
  }

  addWatcher = (path) => {
    let watcher = chokidar.watch(path, {ignored: /(^|[\/\\])\../});

    // Get tag (textures folder)
    let tag = path.split('/');
    tag = tag[tag.length-1];

    // Store path
    /*let paths = localStorage.getItem('paths');
    let index = paths.indexOf(path);
    if (index === -1) {
      paths.push(path);
      localStorage.setItem('paths', paths);
    }*/


    watcher.on('all', (event, path) => console.log(event, path));
    watcher.on('add', path => {

      // Exclude non-images
      if (path.match(/\.(jpeg|jpg|gif|png)$/i) === null)
        return;

      // Push tag
      let tags = this.state.tags;
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(path);

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

    // Add watcher
    console.log(tag);
    watchers[tag] = watcher;
  }

  setFilterText = (input) => {
    this.setState({ filterText: input });
  }

  setFooterText = (texture) => {
    this.setState({ footerText: texture });
  }

  onTexturePreview = (texturePath) => {
    this.setState({ viewMode: 'preview', texturePreview: texturePath });
  }

  copyToClipboard = (texturePath) => {
    clipboard.writeImage(nativeImage.createFromPath(texturePath));
    this.setState({ footerText: 'Copied to clipboard!' });
  }

  goToTag = (tag) => {
    this.setState({ filterText: tag, viewMode: 'textures' });
  }

  deleteTag = (tag) => {

    // Close and delete watcher
    watchers[tag].close();
    delete watchers[tag];

    // Delete tag
    let temp = this.state.tags;
    delete temp[tag];
    this.setState({ tags: temp });
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
  opacity: '0.7'
}

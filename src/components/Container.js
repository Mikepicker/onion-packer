import React, { Component } from 'react';
import { clipboard, nativeImage } from 'electron';
import pathlib from 'path';
import Search from './Search';
import TexturesGrid from './TexturesGrid';
import TagsGrid from './TagsGrid';
import Footer from './Footer';
import Scene from './Scene';
import fs from 'fs';
import chokidar from 'chokidar';
import ncp from 'ncp';
import rimraf from 'rimraf';

const TEXTURES_PATH = './textures';

// Chokidar file watchers (tag -> watcher)
let watchers = {};

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: {},
      textures: {},
      footerText: '',
      filterText: '',
      viewMode: 'textures', // textures, tags, preview
      texturePreview: null,
      selectedTextures: []
    }

  }

  // Start file watcher
  componentDidMount = () => {

    // Create local textures directory if not exists
    if (!fs.existsSync(TEXTURES_PATH)) {
      fs.mkdirSync(TEXTURES_PATH);
    }

    // Drag & Drop
    document.ondragover = (e) => {
      e.preventDefault()
    }

    document.ondrop = (e) => {
      e.preventDefault();
      let path = e.dataTransfer.files[0].path.replace(/\\/g, '/');

      // Get tag (textures folder)
      let tag = pathlib.parse(path).name;

      // Do not add if tag already exists
      if (this.state.tags[tag]) {
        return;
      }

      // Clone directory
      ncp(path, pathlib.join(TEXTURES_PATH, tag), (err) => {
        if (err) {
          return console.error(err);
        }
        else {

          // Add watcher
          this.addWatcher(pathlib.join(TEXTURES_PATH, tag));
        }
      })
    }

    // Load all textures in fs
    let getDirectories = (srcpath) => {
      return fs.readdirSync(srcpath)
        .filter(file => fs.statSync(pathlib.join(srcpath, file)).isDirectory())
    }

    getDirectories(TEXTURES_PATH).forEach((path) => {
      this.addWatcher(pathlib.join(TEXTURES_PATH,path));
    });
  }

  addWatcher = (path) => {
    let watcher = chokidar.watch(path, {ignored: /(^|[\/\\])\../});

    // Get tag (textures folder)
    let tag = pathlib.parse(path).name;

    watcher.on('all', (event, path) => console.log(event, path));
    watcher.on('add', path => {

      // Exclude non-images
      if (path.match(/\.(jpeg|jpg|gif|png)$/i) === null)
        return;

      // Texture Name
      let texture = pathlib.parse(path).name;

      // Push texture
      let textures = this.state.textures;
      textures[texture] = { path: path, tag: tag };

      // Push tag
      let tags = this.state.tags;
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(textures[texture]);

      // Set state
      this.setState({ tags: tags, textures: textures });
    });

    watcher.on('unlink', path => {
      let texture = pathlib.parse(path).name;
      let textures = this.state.textures;

      // Remove from tags
      let tags = this.state.tags;
      tags[textures[texture].tag].splice(tags[textures[texture].tag].indexOf(textures[texture]), 1);

      // Remove from textures
      delete textures[texture];
      console.log(textures);

      this.setState({ tags: tags, textures: textures });
    });

    // Add watcher
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
    //clipboard.writeText(texturePath);
    let img = nativeImage.createFromPath(texturePath);
    clipboard.writeImage(img);
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

    // Delete textures associated to tag
    let textures = this.state.textures;
    Object.keys(textures).forEach((texture) => {
      if (texture.tag === tag) {
        delete textures[texture];
      }
    });

    this.setState({ textures: textures });

    // Remove directory
    rimraf(pathlib.join(TEXTURES_PATH, tag), (err) => console.log(err));
  }

  // Select Texture
  selectTexture = (texture) => {
    console.log(texture);
    let selectedTextures = this.state.selectedTextures;
    selectedTextures.push(texture);
    this.setState({ selectedTextures: selectedTextures });
  }

  // Deselect Texture
  deselectTexture = (texture) => {
    let selectedTextures = this.state.selectedTextures;
    selectedTextures.splice(selectedTextures.indexOf(texture));
    this.setState({ selectedTextures: selectedTextures });
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
          selectTexture={this.selectTexture}
          deselectTexture={this.deselectTexture}
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

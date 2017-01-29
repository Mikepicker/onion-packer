import React, { Component } from 'react';
import { clipboard, nativeImage } from 'electron';
import path from 'path';
import Search from './Search';
import TexturesGrid from './TexturesGrid';
import TagsGrid from './TagsGrid';
import Footer from './Footer';
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
      viewTextures: true // textures or tags
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

  copyToClipboard = (textureName) => {
    clipboard.writeImage(nativeImage.createFromPath('textures/' + textureName));
    this.setState({ footerText: 'Copied to clipboard!' });
  }

  toggleViewMode = () => {
    this.setState(prevState => ({
      viewTextures: !prevState.viewTextures
    }));
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
          copyToClipboard={this.copyToClipboard}
        />
      );

    });

    // Tags Grid
    const tagsGrid =
      <TagsGrid
        tags={this.state.tags}
        filterText={this.state.filterText}
        deleteTag={this.deleteTag}/>

    let content;
    if (this.state.viewTextures) {
      content = noTags ? dragDrop : texturesGrids;
    }
    else {
      content = noTags ? dragDrop : tagsGrid;
    }

    return(
      <div>
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

import React, { Component } from 'react';
import Tag from './Tag';

export default class TagsGrid extends Component {

  componentWillMount = () => {
    document.addEventListener('keyup', this.onKeyUp, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.onKeyUp, false);
  }

  onKeyUp = (e) => {

    // ENTER to add
    if (e.key === 'Enter' && this.props.filterText.length > 0) {
      this.props.addTag(this.props.filterText);
    }
  }

  render() {

    let filteredTags = [];
    Object.keys(this.props.tags).sort().forEach((tag) => {

      // Push filtered text only
      if (tag.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
        filteredTags.push(
          <Tag
            key={tag}
            text={tag}
            size={this.props.tags[tag].length}
            onClickTag={this.props.onClickTag}
            removeTag={() => this.props.deleteTag(tag)}
            assignTexturesToTag={this.props.assignTexturesToTag}/>
        );
      }

    });

    let noTags =
    <div style={noTagsStyle}>
      <div className="fa fa-chevron-up fontbulger"/>
      <div>Type and press Enter to add a new tag</div>
    </div>

    return(
      <div className="container-fluid" style={gridStyle}>
        {Object.keys(this.props.tags).length > 0 ? filteredTags : noTags}
      </div>
    );
  }
}

const gridStyle = {
  marginTop: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap'
}

const noTagsStyle = {
  position: 'absolute',
  width: '100%',
  top: '150px',
  color: '#a1a1a1',
  fontSize: '25px',
  textAlign: 'center',
  margin: '0 auto',
  opacity: '0.7'
}

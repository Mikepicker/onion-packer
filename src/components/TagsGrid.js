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
    Object.keys(this.props.tags).forEach((tag) => {

      // Push filtered text only
      if (tag.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
        filteredTags.push(
          <Tag
            key={tag}
            text={tag}
            onClickTag={this.props.onClickTag}
            removeTag={() => this.props.deleteTag(tag)}
            assignTexturesToTag={this.props.assignTexturesToTag}/>
        );
      }

    });

    return(
      <div className="container-fluid" style={gridStyle}>
        {filteredTags}
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

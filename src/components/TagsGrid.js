import React, { Component } from 'react';
import Tag from './Tag';

let tags = [];
tags.push('1234567890');
tags.push('Steel');
tags.push('Wall');
tags.push('Carpet');
tags.push('Grass');

export default class TagsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: tags
    };
  }

  componentWillMount = () => {
    document.addEventListener('keyup', this.onKeyUp, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.onKeyUp, false);
  }

  onKeyUp = (e) => {

    let temp = this.state.tags;

    // ENTER
    if (e.key === 'Enter' && this.props.filterText.length > 0 && temp.indexOf(this.props.filterText) === -1) {
      temp.push(this.props.filterText);
      this.setState({ tags: temp });
    }
  }

  removeTag = (tag) => {

    let temp = this.state.tags;
    var index = temp.indexOf(tag);
    if (index > -1) {
      temp.splice(index, 1);
      this.setState({ tags: temp });
    }
  }

  render() {

    let filteredTags = [];
    this.state.tags.forEach((tag) => {

      // Push filtered text only
      if (tag.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
        filteredTags.push(<Tag key={tag} text={tag} removeTag={this.removeTag}/>);
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

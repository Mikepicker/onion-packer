import React, { Component } from 'react';
import Tag from './Tag';

export default class TagsGrid extends Component {

  /*componentWillMount = () => {
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
  }*/

  render() {

    let filteredTags = [];
    Object.keys(this.props.tags).forEach((tag) => {

      // Push filtered text only
      if (tag.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
        filteredTags.push(<Tag key={tag} text={tag} removeTag={() => this.props.deleteTag(tag)}/>);
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

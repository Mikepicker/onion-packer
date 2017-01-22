import React, { Component } from 'react';
import Search from './Search';
import Grid from './Grid';
import Footer from './Footer';

export default class Container extends Component {
  render() {
    return(
      <div>
        <Search />
        <Grid />
        <Footer />
      </div>
    );
  }
}

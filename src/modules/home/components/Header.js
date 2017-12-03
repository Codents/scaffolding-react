import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';

import './Header.scss';

export default class Header extends Component {
  render() {
    const { city } = this.props;
    return (
      <header className='header h1-xl'>
        <Logo city={ city } />
      </header>
    );
  }
}

Header.propTypes = {
  city: PropTypes.string,
};

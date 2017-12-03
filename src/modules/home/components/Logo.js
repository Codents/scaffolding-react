import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Logo.scss';

export default class Logo extends Component {
  render() {
    const { city } = this.props;
    return <div className='logo'>{city}</div>;
  }
}

Logo.propTypes = {
  city: PropTypes.string,
};

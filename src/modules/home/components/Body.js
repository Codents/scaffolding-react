import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import './Body.scss';

export default class Body extends Component {
  render() {
    return (
      <main className='body'>
        <p className='text common justify'>
          <FormattedMessage id='about.bioinfo.text' />
        </p>
        <Link to={ { pathname: '/user/login', state: { arg1: 33, arg2: 44 } } }>Login</Link>
      </main>
    );
  }
}

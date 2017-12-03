import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import './Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <p className='h1-xl'>
          <FormattedMessage id='main.text.company.name' />
        </p>
      </footer>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Logo from './components/logo';

import './styles.scss';

class MainContainer extends Component {
  render() {
    return (
      <section className='home-page'>
        <header>
          <Logo />
        </header>
        <footer>
          <FormattedMessage id='main.text.company.name' />
        </footer>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MainContainer);

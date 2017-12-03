import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWeather } from './actions';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

import './styles.scss';

class MainContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getWeather());
  }

  render() {
    const { city } = this.props;
    return (
      <article className='home-page'>
        <Header city={ city } />
        <Body />
        <Footer />
      </article>
    );
  }
}

MainContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.string,
  city: PropTypes.string,
};

function mapStateToProps(state) {
  const { isAuthenticated, user, city } = state.home;
  return { isAuthenticated, user, city };
}

export default connect(mapStateToProps)(MainContainer);

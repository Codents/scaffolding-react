import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/object';

export default class Login extends React.Component {
  render() {
    const state = get(this.props, 'location.state', {});
    const { arg1, arg2 } = state;
    return (
      <div className='Grid Grid--alignCenter'>
        <div className='Grid-cell u-md-size6of12'>
          <div className='Login'>
            <div className='LoginForm'>
              <div>
                <form className='Form' noValidate>
                  <fieldset>
                    <div className='Form-group'>
                      <label htmlFor='username' className='Form-label'>
                        Nombre de usuario
                      </label>
                      <input
                        type='username'
                        name='username'
                        id='username'
                        className='Form-field'
                        defaultValue={ arg1 }
                        autoComplete='on'
                      />
                    </div>
                    <div className='Form-group'>
                      <label htmlFor='password' className='Form-label'>
                        Contraseña
                      </label>
                      <input
                        type='password'
                        name='password'
                        id='password'
                        defaultValue={ arg2 }
                        className='Form-field'
                        autoComplete='off'
                      />
                    </div>
                    <button
                      type='submit'
                      name='button'
                      className='Button Button--primary Button--medium Button--block'
                    >
                      Entrar en tu cuenta
                    </button>
                  </fieldset>
                </form>
                <p className='u-center u-divider-top'>
                  <a className='Button Button--link' href='/users/sign_up'>
                    ¿Todavía no tienes cuenta? ¡Regístrate!
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  arg1: PropTypes.string,
  arg2: PropTypes.string,
  state: PropTypes.object,
};

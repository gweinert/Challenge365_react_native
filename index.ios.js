/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component }   from 'react';
import { AppRegistry }        from 'react-native';
import { Provider }           from 'react-redux';
import { createStore }        from 'redux';
import AppReducer             from './src/Reducers';
import AppWithNavigationState from './src/Navigators';
import configureStore         from './src/Store'
const store = configureStore()

class ChallengeMe extends Component {
  // store = createStore(AppReducer)

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ChallengeMe', () => ChallengeMe);

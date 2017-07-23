import React                    from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import { 
    addNavigationHelpers, 
    StackNavigator }            from 'react-navigation';
import HomeScreen               from '../Screens/Home';
import DetailScreen             from '../Screens/Detail';
import CreateChallengeScreen    from '../Screens/CreateChallenge';

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
  CreateChallenge: { screen: CreateChallengeScreen },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
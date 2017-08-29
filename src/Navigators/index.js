import React                    from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { 
    addNavigationHelpers, 
    StackNavigator,
    TabNavigator 
}                               from 'react-navigation'
import HomeScreen               from '../Screens/Home'
import LoginScreen              from '../Screens/Login'
import DetailScreen             from '../Screens/Detail'
import CreateChallengeScreen    from '../Screens/CreateChallenge'
import TopPosts                 from '../Screens/TopPosts'
import Bookmark                 from '../Screens/Bookmark'
import Profile                  from '../Screens/Profile'
import UserProfile              from '../Screens/UserProfile'

const tabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'black',
    activeBackgroundColor: 'transparent',
    inactiveBackgroundColor: 'transparent',
    inactiveTintColor: 'transparent',
    style: {
      backgroundColor: 'white',
      borderWidth: 0,
      borderTopWidth: 0,
    },
    labelStyle: {

    },
    tabStyle: {
    }
  }
}

const MainScreenNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  Bookmark: { screen: Bookmark },
  CreateChallenge: { screen: CreateChallengeScreen },
  TopPosts: { screen: TopPosts },
  Profile: { screen: Profile }
}, tabNavigatorConfig);




const appStackNavigatorConfig = {
  headerMode: 'none'
}

const AppStackNavigator = StackNavigator({
  Main: { 
    screen: MainScreenNavigator,
    headerMode: 'none'
  },
  Detail: { screen: DetailScreen },
  UserProfile: { screen: UserProfile }
}, appStackNavigatorConfig)




const stackNavigatorConfig = {
  headerMode: 'none',

}

export const AppNavigator = StackNavigator({
  App: { 
    screen: AppStackNavigator
  },
  Login: { screen: LoginScreen },  
}, stackNavigatorConfig)



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
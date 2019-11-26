import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoginScreen from './pages/Login/Login';
import HomeScreen from './pages/Home/Home';
import FilterScreen from './pages/Filter/Filter';
import ProfileScreen from './pages/Profile/Profile';
import VerificationScreen from './pages/Verification/Verification';

const AuthStack = createStackNavigator({
  Sign: {screen: LoginScreen},
});

const VerificationStack = createStackNavigator({
  Verification: {screen: VerificationScreen},
});

const MainNavigator = createBottomTabNavigator(
  {
    Lançamentos: {
      screen: HomeScreen,
    },
    Filtro:{
      screen: FilterScreen,
    },
    Perfil: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Lançamentos',
      tabBarOptions: {
        showIcon: true,
        showLabel: true,
        inactiveBackgroundColor: '#202020',
        activeBackgroundColor: '#ff0000',
        labelStyle:{
          color: '#fff',
        },
        style: {
          width:'100%',
          height: 50,
          
      },
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavigator,
      AuthStack,
      VerificationStack,
    },
    {
      initialRouteName: 'VerificationStack',
    },
  ),
);

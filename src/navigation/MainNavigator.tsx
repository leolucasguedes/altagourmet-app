import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Main/Home';
import { MainStackParamList } from './types';

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;

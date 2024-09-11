import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/Auth/Login";
import RegisterScreen from "../screens/Auth/Register";
import RegisterNumber from "../screens/Auth/Register/RegisterNumber";
import RegisterError from "../screens/Auth/Register/RegisterError";
import RegisterVerify from "../screens/Auth/Register/RegisterVerify";
import RegisterSuccess from "../screens/Auth/Register/RegisterSuccess";
import { AuthStackParamList } from "./types";

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
        <AuthStack.Screen name="RegisterNumber" component={RegisterNumber} />
        <AuthStack.Screen name="RegisterError" component={RegisterError} />
        <AuthStack.Screen name="RegisterVerify" component={RegisterVerify} />
        <AuthStack.Screen name="RegisterSuccess" component={RegisterSuccess} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;

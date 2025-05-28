import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import LogInPage from "../AuthScreens/LogInPage";
import SignUpPage from "../AuthScreens/SignUpPage";

export const AuthStackNav = ({ navigator }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LogInPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
    </Stack.Navigator>
  );
};

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProductScreen from "../screens/ProductScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import BottomNav from "./BottomNav";

export const StackNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Products" component={ProductScreen} />
      <Stack.Screen name="Products Details" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

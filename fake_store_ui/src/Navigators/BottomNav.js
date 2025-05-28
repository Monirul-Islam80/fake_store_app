import React, { Component, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNav } from "./StackNav";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { CartScreen } from "../screens/CartScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import { useSelector } from "react-redux";

const BottomNav = ({ navigator }) => {
  const Tab = createBottomTabNavigator();
  const { totalQuantity } = useSelector((state) => state.carts);
  const { user, loading } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const [newOrderCount, setnewOrderCount] = useState(0);
  useEffect(() => {
    setnewOrderCount(
      orders?.filter(
        (order) => order.is_paid === false && order.is_delivered === false
      ).length
    );
  }, [orders]);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Orders") {
              iconName = focused ? "gift" : "gift-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={StackNav}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: false,
            tabBarBadge: totalQuantity ? totalQuantity : null,
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            headerShown: false,
            tabBarBadge: newOrderCount ? newOrderCount : null,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomNav;

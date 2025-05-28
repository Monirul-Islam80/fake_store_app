import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNav } from "./StackNav";
import { AuthStackNav } from "./AuthStackNav";
import { LoginFunc, setUserState } from "../redux/authSlice";
import { ActivityIndicator, View } from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import BottomNav from "./BottomNav";
import { editCart, getCart, setCart } from "../redux/cartSlice";
import { updateCart } from "../services/api";
import { getOrder } from "../redux/orderSlice";

export default function MainNavigator() {
  const dispatch = useDispatch();
  const [userData, setuserData] = useState();
  const { user, loading } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.carts);
  useEffect(() => {
    const userInit = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setuserData(parsedUser);
        dispatch(setUserState(parsedUser));
      }
    };
    userInit();
  }, [dispatch]);
  useEffect(() => {
    const setStorage = async () => {
      console.log("====================================");
      console.log("users", user);
      console.log("====================================");

      if (user?.name && cartItems) {
        updateCart(cartItems, user);
      }
      console.log("kdfjskdjf");
    };
    setStorage();
  }, [cartItems]);

  useEffect(() => {
    const setStorage = async () => {
      if (user.name && userData) {
        console.log("====================================");
        console.log(user, "user");
        console.log("====================================");
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }
    };
    setStorage();
  }, [user?.name]);

  useEffect(() => {
    const setData = async () => {
      if (user?.name) {
        console.log("====================================");
        console.log("user?.name", user?.name);
        console.log("====================================");
        dispatch(getCart(user));
        dispatch(getOrder(user));
      }
    };
    setData();
  }, [dispatch, user?.name]);

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user?.token ? <BottomNav /> : <AuthStackNav />}
    </NavigationContainer>
  );
}

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import CategoryScreen from "./CategoryScreen";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <CategoryScreen navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

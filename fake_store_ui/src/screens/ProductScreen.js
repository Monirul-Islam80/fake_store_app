import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import ProductList from "../components/Auth/ProductList";

const ProductScreen = ({ navigation }) => {
  const { selectedCategory } = useSelector((state) => state.products);

  return (
    <View style={{ flex: 1 }}>
      {selectedCategory ? (
        <ProductList navigation={navigation} />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default ProductScreen;

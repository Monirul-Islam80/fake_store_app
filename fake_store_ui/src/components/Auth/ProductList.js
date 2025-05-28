import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByCategory,
  getProductDetails,
  setSelectedProduct,
} from "../../redux/productSlice";
import globalStyles from "../../../styles/GlobalStyles";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

const ProductList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, selectedCategory, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    console.log(products + "aa");

    dispatch(getProductByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.pageTitleContainer}>
        <Text style={globalStyles.pageTitleText}>
          {selectedCategory[0].toUpperCase() +
            selectedCategory.slice(1).toLowerCase()}
        </Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setSelectedProduct(item.id));
              navigation.navigate("Products Details", navigation);
            }}
          >
            <View style={styles.productItem}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  margin: 5,
                  borderColor: "#ccc",
                  borderWidth: 1,
                }}
              />
              <View
                style={{
                  borderLeftColor: "black",
                  borderLeftWidth: 1,
                  height: 45,
                  marginRight: 5,
                }}
              ></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              <View></View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",

          margin: 10,
          position: "absolute",
          bottom: 0,

          alignSelf: "center",
          backgroundColor: "#00203F",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 5px 8px rgba(0, 0, 0, 0.32)",
          borderColor: "#ADEFD1",
          borderWidth: 1,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#ADEFD1" />
        <Text style={{ color: "#ADEFD1" }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productItem: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    backgroundColor: "#ADEFD1",
    borderColor: "#00203F",
    borderWidth: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "black",
  },
});

export default ProductList;

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "../redux/productSlice";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../../styles/GlobalStyles";
import { addToCart } from "../redux/cartSlice";

const ProductDetailsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { product, selectedProduct, loading } = useSelector(
    (state) => state.products
  );
  const handleAddtoCart = () => {
    dispatch(addToCart(product));
    console.log("====================================");
    console.log("added to cart");
    console.log("====================================");
  };

  useEffect(() => {
    dispatch(getProductDetails(selectedProduct));
  }, [dispatch, selectedProduct, addToCart]);
  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <>
      <View style={globalStyles.pageTitleContainer}>
        <Text style={globalStyles.pageTitleText}>Product Details</Text>
      </View>
      <ScrollView style={{ flex: 1, margin: 0, padding: 0 }}>
        <View style={styles.container}>
          <Image
            source={{ uri: product.image }}
            style={{
              width: "100%",
              height: "35%",
              aspectRatio: 1,
              borderRadius: 5,
              margin: 5,
              borderColor: "#ccc",
              borderWidth: 1,
            }}
          />
          <Text style={styles.title}>{product.title}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#ADEFD1",
              padding: 10,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#00203F",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  alignItems: "center",
                }}
              >
                Rate:
              </Text>
              <Text>
                {product.rating?.rate}
                <Ionicons name="star" size={16} color="gold" />
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  alignItems: "center",
                }}
              >
                Count:
              </Text>
              <Text> {product.rating?.count}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  alignItems: "center",
                }}
              >
                {" "}
                Price:
              </Text>
              <Text style={styles.price}>
                {" "}
                {product.price} <Ionicons name="pricetag" />
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "30%",

                margin: 10,

                backgroundColor: "#00203F",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "space-around",
                boxShadow: "0 5px 8px rgba(0, 0, 0, 0.32)",
                borderColor: "#ADEFD1",
                borderWidth: 1,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#ADEFD1" />
              <Text style={{ color: "#ADEFD1" }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",

                margin: 10,
                width: "40%",
                backgroundColor: "#00203F",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "space-around",
                boxShadow: "0 5px 8px rgba(0, 0, 0, 0.32)",
                borderColor: "#ADEFD1",
                borderWidth: 1,
              }}
              onPress={handleAddtoCart}
            >
              <Ionicons name="cart-outline" size={24} color="#ADEFD1" />
              <Text style={{ color: "#ADEFD1" }}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#ADEFD1",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              Description:
            </Text>

            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    color: "green",
    marginVertical: 10,
  },
});

export default ProductDetailsScreen;

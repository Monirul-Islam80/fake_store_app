import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setSelectedCategory } from "../redux/productSlice";

const CategoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.catergoryList}>
      <View style={globalStyles.pageTitleContainer}>
        <Text style={globalStyles.pageTitleText}>Categories</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={(C) => {
              console.log(item);
              dispatch(setSelectedCategory(item));
              navigation.navigate("Products");
            }}
          >
            <View style={styles.categoryItem}>
              <Text style={styles.categoryText}>
                {item[0].toUpperCase() + item.slice(1).toLowerCase()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  catergoryList: {
    flex: 1,
  },

  categoryItem: {
    padding: 30,
    margin: 20,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#6FE6FC",
    borderColor: "#00203F",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 5px 8px rgba(0, 31, 63, 0.47)",
  },
  categoryText: {
    color: "#00203F",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CategoryScreen;

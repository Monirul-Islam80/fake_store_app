import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { addToCart, clearCart, decreaseQuantity } from "../redux/cartSlice";
import { createOrder } from "../services/api";
import Toast from "react-native-toast-message";
import { getOrder } from "../redux/orderSlice";

export const CartScreen = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.carts
  );
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleCheckOut = () => {
    createOrder(user, items)
      .then(async (response) => {
        if (response.error) {
          Alert.alert("Sign Up Failed", response.error);
        }
        console.log("====================================");
        console.log(response, "response");
        console.log("====================================");
        if (response.status === "OK") {
          dispatch(clearCart());
          Toast.show({
            type: "success",
            text1: "Order added successfully!",
          });
        }
      })
      .then(() => {
        dispatch(getOrder(user));
      })
      .catch((error) => {
        Alert.alert("Check out failed", error.error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.pageTitleContainer}>
        <Text style={globalStyles.pageTitleText}>Shopping Cart</Text>
      </View>
      {items.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Your shopping cart is empty
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: -2,
              margin: 10,
              padding: 10,
              backgroundColor: "grey",
              borderRadius: 8,
              borderColor: "black",
              borderWidth: 1,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Item: {totalQuantity}
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>
              Total Price: {totalPrice.toFixed(2)}$
            </Text>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
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
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.productPrice}>${item.price}</Text>
                    <View style={styles.container}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          dispatch(decreaseQuantity(item.id));
                        }}
                      >
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>
                        quantity: {item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          dispatch(addToCart(item));
                        }}
                      >
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
          <View style={{ position: "relative", bottom: 1 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",

                margin: 10,

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
              onPress={handleCheckOut}
            >
              <Ionicons name="card" size={24} color="#ADEFD1" />
              <Text style={{ color: "#ADEFD1", marginLeft: 10 }}>
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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

  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6a97ae",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
});

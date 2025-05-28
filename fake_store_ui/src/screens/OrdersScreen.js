import React, { use, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import globalStyles from "../../styles/GlobalStyles";
import { updateOrder } from "../services/api";
import { getOrder } from "../redux/orderSlice";
import { useFocusEffect } from "@react-navigation/native";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

export const OrdersScreen = () => {
  const ordersData = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    new: true,
    paid: true,
    received: true,
  });

  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleOrder = (id) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handlePayment = async (id) => {
    setOrders((prev) =>
      prev?.map((order) =>
        order.id === id ? { ...order, is_paid: true } : order
      )
    );

    await updateOrder({ orderID: id, isPaid: true, isDelivered: false }, user);
    dispatch(getOrder(user));
  };

  const handleRecive = async (id) => {
    setOrders((prev) =>
      prev?.map((order) =>
        order.id === id ? { ...order, is_delivered: true } : order
      )
    );
    await updateOrder({ orderID: id, isPaid: true, isDelivered: true }, user);
    dispatch(getOrder(user));
  };
  useEffect(() => {
    if (Array.isArray(ordersData.orders)) {
      console.log("dddddddddddddddd");
      const data = ordersData.orders.map((order) => {
        console.log(order, "[[[[[[[[[[");

        return {
          ...order,
          id: order._id,
        };
      });
      setOrders(data);
    }

    console.log("|......", ordersData.orders);
  }, [ordersData]);
  const renderOrders = (key, title, filterFn) => {
    console.log(orders);

    const filtered = orders.filter(filterFn);
    const sectionExpanded = expandedSections[key];
    let bgcolor = "#3D90D7";
    let iconName = "checkmark-circle-outline";
    if (key === "new") {
      bgcolor = "#FE5D26";
      iconName = "bag-check";
    } else if (key === "paid") {
      bgcolor = "#7AE2CF";
      iconName = "card-outline";
    }
    return (
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity
          onPress={() => toggleSection(key)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: bgcolor,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name={iconName} size={24} color="white" />
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              {" "}
              {title}: {filtered.length}
            </Text>
          </View>

          <Ionicons
            name={sectionExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </TouchableOpacity>

        {sectionExpanded &&
          (filtered.length === 0 ? (
            <Text style={{ padding: 10 }}>No orders</Text>
          ) : (
            filtered.map((order) => {
              const isOrderExpanded = expandedOrders[order.id];
              return (
                <View
                  key={order.id}
                  style={{
                    borderWidth: 1,
                    marginVertical: 5,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    marginHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => toggleOrder(order.id)}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "#4E6688",
                      padding: 10,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          flex: 1,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          Order ID: {order.id}
                        </Text>
                        <Ionicons
                          name={isOrderExpanded ? "chevron-up" : "chevron-down"}
                          size={20}
                          color="white"
                        />
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          flex: 1,
                          gap: 20,
                        }}
                      >
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          Items: {order.item_numbers}
                        </Text>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          |
                        </Text>
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          Total: ${order.total_price.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {isOrderExpanded && (
                    <View style={{ padding: 10, backgroundColor: "#f5f5f5" }}>
                      <Text>
                        Status:{" "}
                        {order.is_paid
                          ? order.is_delivered
                            ? "Delivered"
                            : "Paid"
                          : "New"}
                      </Text>

                      {order.order_items.map((item, idx) => (
                        <View
                          key={idx}
                          style={{
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 5,
                              marginRight: 10,
                              borderColor: "#ccc",
                              borderWidth: 1,
                            }}
                          />
                          <View style={{ flex: 1 }}>
                            <Text>{item.title}</Text>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text>${item.price}</Text>
                              <Text>Quantity: {item.quantity}</Text>
                            </View>
                          </View>
                        </View>
                      ))}

                      {!order.is_paid && (
                        <Button
                          title="Pay"
                          onPress={() => handlePayment(order.id)}
                        />
                      )}
                      {order.is_paid && !order.is_delivered ? (
                        <Button
                          title="Receive"
                          onPress={() => handleRecive(order.id)}
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                  )}
                </View>
              );
            })
          ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.pageTitleContainer}>
        <Text style={globalStyles.pageTitleText}>Orders</Text>
      </View>
      <ScrollView style={{ paddingBottom: 100 }}>
        {renderOrders(
          "new",
          "New Orders",
          (order) => order.is_paid === false && order.is_delivered === false
        )}
        {renderOrders(
          "paid",
          "Paid Orders",
          (order) => order.is_paid === true && order.is_delivered === false
        )}
        {renderOrders(
          "received",
          "Received Orders",
          (order) => order.is_paid === true && order.is_delivered === true
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
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
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  emptyText: {
    fontStyle: "italic",
    color: "#888",
  },
  orderCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  orderId: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    marginLeft: 8,
    color: "#333",
  },
});

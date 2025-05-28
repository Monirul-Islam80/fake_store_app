import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "http://192.168.0.193:5000";

export const fetchProductCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/?path=categories`);
    console.log("Categories response:");

    return response.data;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${API_URL}/products/?path=category/${category}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Error fetching products by category");
  }
};

export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/?path=${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching product details");
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users/signin`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.data.status !== "OK") {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("====================================");
    console.log(response.data, "response");
    console.log("====================================");
    if (response.data.status !== "OK") {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};
export const updateUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users/update`, user, {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    });

    console.log("User updated successfully:", response.data);
    if (response.data.status !== "OK") {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
  }
};
export const fetchCart = async (user) => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    const items = response.data.items;

    let totalQuantity = 0;
    let totalPrice = 0;

    items.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    return {
      items,
      totalQuantity,
      totalPrice,
    };
  } catch (error) {
    throw new Error("Error fetching cart details", error);
  }
};
export const updateCart = async (cartData, user) => {
  try {
    const response = await axios.put(
      `${API_URL}/cart`,
      {
        items: cartData.items,
        username: user.name,
        totalQuantity: cartData.totalQuantity,
        totalPrice: cartData.totalPrice,
      },
      {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};
export const createOrder = async (user, items) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders/neworder`,
      { items: items },
      {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("====================================");
    console.log(response.data, "response");
    console.log("====================================");
    if (response.data.status !== "OK") {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const fetchOrder = async (user) => {
  try {
    const response = await axios.get(`${API_URL}/orders/all`, {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    });

    if (response.data.status !== "OK") {
      throw new Error(response.data.message);
    }
    console.log("----", response.data);

    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};
export const updateOrder = async (updatedOrder, user) => {
  console.log("====================================");
  console.log(updatedOrder);
  console.log("====================================");
  try {
    const response = await axios.post(
      `${API_URL}/orders/updateorder`,
      updatedOrder,
      {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status !== "OK") {
      throw new Error(response.data.message);
    }
    console.log("====================================");
    console.log(response.data);
    console.log("====================================");
    return response.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

import React, { use, useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import globalStyles from "../../styles/GlobalStyles";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { logout, setUserState, UpdateProfileFunc } from "../redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUser } from "../services/api";

export const ProfileScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [warning, setWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    password: "",
    token: user.token,
  });
  const dispatch = useDispatch();
  const handleUpdate = () => {
    if (formData.name === "" || formData.password === "") {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
      setWarning(true);
    } else {
      updateUser(formData)
        .then(async (response) => {
          console.log("====================================");
          console.log(response, "response");
          console.log("====================================");
          if (response.status !== "OK") {
            Toast.show({
              type: "error",
              text1: "Update Failed",
              text2: response.error,
            });
          }

          if (response.status === "OK") {
            setIsModalVisible(false);
            Toast.show({
              type: "success",
              text1: "Profile updated successfully!",
            });
            const { email, token } = user;
            dispatch(setUserState({ email, name: formData.name, token }));

            await AsyncStorage.setItem(
              "user",
              JSON.stringify({ email, name: formData.name, token })
            );
          }
        })
        .catch((error) => {
          Alert.alert("Update Failed", error.error);
        });
    }
  };
  const handleSignOut = async () => {
    dispatch(logout());
    await AsyncStorage.removeItem("user");
  };
  useEffect(() => {
    if (formData.name === "" || formData.password === "") {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [formData]);
  return (
    <View style={styles.container}>
      <View style={globalStyles.pageTitleContainer}>
        <Text style={globalStyles.pageTitleText}>Profile</Text>
      </View>
      <View style={styles.userdataContainer}>
        <Text style={styles.label}>Name: {user.name}</Text>
        <Text style={styles.label}>Email: {user.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#39a7f1",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="color-wand" size={20} color="white" />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              marginLeft: 5,
            }}
          >
            Update
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              marginLeft: 5,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Update Profile</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            {warning && formData.name === "" && (
              <Text style={{ color: "red" }}>Name field can't be empty!</Text>
            )}
            <Text style={styles.label}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="New or Current Password"
              value={formData.password}
              secureTextEntry
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />
            {warning && formData.password === "" && (
              <Text style={{ color: "red" }}>
                Password field is required. You must enter either your current
                password or a new one.
              </Text>
            )}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Button title="Save" onPress={handleUpdate} />
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userdataContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000099",
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelText: {
    color: "gray",
    marginRight: 20,
    fontSize: 16,
  },
});

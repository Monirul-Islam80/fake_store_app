import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { LoginFunc } from "../redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../assets/splash-icon-24.png";

const LogInPage = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogIn = async () => {
    if (email && password) {
      dispatch(LoginFunc({ email, password }))
        .unwrap()
        .then(async ({ name, email, token }) => {
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ name, email, token })
          );
        })
        .catch((error) => {
          Alert.alert("Login In Failed", error.error);
        });
    } else {
      Alert.alert("Input Error", "Please enter both email and password.");
    }
  };
  useEffect(() => {}, [dispatch, LoginFunc]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#22a6a3",
      }}
    >
      <Image
        source={logo}
        style={{
          width: "100%",
          height: "25%",
          aspectRatio: 1,

          margin: 5,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>LogIn</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setemail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="LogIn" onPress={handleLogIn} />

        <View style={{ flexDirection: "row", marginTop: "10" }}>
          <Text>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "blue", fontWeight: "bold" }}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  input: {
    width: "100%",
    color: "white",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default LogInPage;

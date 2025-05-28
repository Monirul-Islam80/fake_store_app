import React, { use, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "../redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "../services/api";
import logo from "../../assets/splash-icon-24.png";

const SignUpPage = ({ navigation }) => {
  const [inputemail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputCpassword, setinputcPassword] = useState("");
  const [inputname, setinputName] = useState("");
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const handleSignUp = async () => {
    if (
      inputemail &&
      inputPassword &&
      inputname &&
      inputCpassword &&
      inputPassword &&
      inputCpassword
    ) {
      if (inputPassword == inputCpassword) {
        registerUser({
          email: inputemail,
          password: inputPassword,
          name: inputname,
        })
          .then(async (response) => {
            if (response.error) {
              Alert.alert("Sign Up Failed", response.error);
            }
            if (response) {
              const { name, email, token } = response;
              dispatch(setUserState(response));
              await AsyncStorage.setItem(
                "user",
                JSON.stringify({ name, email, token })
              );
            }
          })
          .catch((error) => {
            Alert.alert("Sign Up Failed", error.error);
          });
      } else {
        Alert.alert("Error", "Passwords do not match ");
      }
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };
  loading &&
    Alert.alert("Loading", "Please wait while we process your request.");
  useEffect(() => {}, [dispatch]);
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
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={inputname}
          onChangeText={setinputName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={inputemail}
          onChangeText={setInputEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={inputPassword}
          onChangeText={setInputPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={inputCpassword}
          onChangeText={setinputcPassword}
          secureTextEntry
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Button
            title="Clear"
            color={"red"}
            onPress={() => {
              setInputEmail("");
              setInputPassword("");
              setinputcPassword("");
              setinputName("");
            }}
          />
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>

        <View style={{ flexDirection: "row", marginTop: "20" }}>
          <Text>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "blue", fontWeight: "bold" }}>Sign In</Text>
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
export default SignUpPage;

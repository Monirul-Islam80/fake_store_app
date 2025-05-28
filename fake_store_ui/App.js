import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/redux/store";

import { SafeAreaView } from "react-native-safe-area-context";
import MainNavigator from "./src/Navigators/MainNavigator";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
export default function App() {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, paddingTop: 6 }}>
        <MainNavigator />
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}

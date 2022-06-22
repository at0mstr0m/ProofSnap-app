import { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Montserrat_400Regular,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import COLORS from "./constants/colors";
import LoginScreen from "./screens/LoginScreen";
import TakePhotoScreen from "./screens/TakePhotoScreen";
import VerifyPhotoScreen from "./screens/VerifyPhotoScreen";
import AllPhotosScreen from "./screens/AllPhotosScreen";
import SignatureSendingScreen from "./screens/SignatureSendingScreen";
import SignatureSendingSuccessfulScreen from "./screens/SignatureSendingSuccessfulScreen";
import SignatureSendingFailedScreen from "./screens/SignatureSendingFailedScreen";
import VerificationSendingScreen from "./screens/VerificationSendingScreen";
import VerificationSendingSuccessfulScreen from "./screens/VerificationSendingSuccessfulScreen";
import VerificationSendingFailedScreen from "./screens/VerificationSendingFailedScreen";

// https://reactnavigation.org/docs/hello-react-navigation#creating-a-native-stack-navigator
const Stack = createNativeStackNavigator();

export default function App() {
  // https://docs.expo.dev/versions/latest/sdk/splash-screen/
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Montserrat_400Regular: Montserrat_400Regular,
          Montserrat_900Black: Montserrat_900Black,
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }} // https://reactnavigation.org/docs/native-stack-navigator/#headershown
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            animation: "slide_from_right",
            headerStyle: { backgroundColor: COLORS.header },
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            animation: "slide_from_right",
            headerStyle: { backgroundColor: COLORS.header },
          }}
        />
        <Stack.Screen
          name="TakePhotoScreen"
          component={TakePhotoScreen}
          options={{
            animation: "slide_from_right",
            headerStyle: { backgroundColor: COLORS.header },
            title: "Signiertes Foto erstellen",
          }}
        />
        <Stack.Screen
          name="VerifyPhotoScreen"
          component={VerifyPhotoScreen}
          options={{
            animation: "slide_from_right",
            headerStyle: { backgroundColor: COLORS.header },
            title: "Foto verifizieren",
          }}
        />
        <Stack.Screen
          name="AllPhotosScreen"
          component={AllPhotosScreen}
          options={{
            animation: "slide_from_right",
            headerStyle: { backgroundColor: COLORS.header },
          }}
        />
        <Stack.Screen
          name="SignatureSendingScreen"
          component={SignatureSendingScreen}
          options={{
            animation: "slide_from_right",
            title: "Signatur wird erstellt...",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: COLORS.header },
            // https://freakycoder.com/react-native-notes-28-how-to-prevent-go-back-with-react-navigation-v6-f214c45f6315
            gestureEnabled: false,
            headerBackVisible: false,
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="VerificationSendingScreen"
          component={VerificationSendingScreen}
          options={{
            animation: "slide_from_right",
            headerTitleAlign: "center",
            title: "Signatur wird überprüft...",
            headerStyle: { backgroundColor: COLORS.header },
            // https://freakycoder.com/react-native-notes-28-how-to-prevent-go-back-with-react-navigation-v6-f214c45f6315
            gestureEnabled: false,
            headerBackVisible: false,
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="SignatureSendingSuccessfulScreen"
          component={SignatureSendingSuccessfulScreen}
          options={{
            animation: "slide_from_right",
            title: "Signatur erstellt",
            headerStyle: { backgroundColor: COLORS.header },
          }}
        />
        <Stack.Screen
          name="SignatureSendingFailedScreen"
          component={SignatureSendingFailedScreen}
          options={{
            animation: "slide_from_right",
            title: "Signatur erstellen gescheitert",
            headerStyle: { backgroundColor: COLORS.header },
          }}
        />
        <Stack.Screen
          name="VerificationSendingSuccessfulScreen"
          component={VerificationSendingSuccessfulScreen}
          options={{
            animation: "slide_from_right",
            title: "Signatur überprüft",
            headerStyle: { backgroundColor: COLORS.header },
          }}
        />
        <Stack.Screen
          name="VerificationSendingFailedScreen"
          component={VerificationSendingFailedScreen}
          options={{
            animation: "slide_from_right",
            title: "Signatur überprüfen gescheitert",
            headerStyle: { backgroundColor: COLORS.header },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

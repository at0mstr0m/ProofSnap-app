import { StyleSheet, View, useWindowDimensions } from "react-native";
import HomeScreenButtonGradient from "../components/HomeScreenButtonGradient";
import HomeScreenButtonWhite from "../components/HomeScreenButtonWhite";
import Logo from "../components/Logo";
import COLORS from "../constants/colors";

export default function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  function onAboutButtonPressed() {
    navigation.navigate("AboutScreen");
  }
  function onLoginButtonPressed() {
    navigation.navigate("LoginScreen");
  }
  function onTakePhotoPressed() {
    navigation.navigate("TakePhotoScreen");
  }
  function onVerifyPhotoPressed() {
    navigation.navigate("VerifyPhotoScreen");
  }
  function onAllPhotosPressed() {
    navigation.navigate("AllPhotosScreen");
  }

  return (
    <View style={styles.container}>
      <Logo />
      <HomeScreenButtonWhite iconName="camera" onPress={onTakePhotoPressed}>
        Foto aufnehmen
      </HomeScreenButtonWhite>
      <HomeScreenButtonWhite iconName="check" onPress={onVerifyPhotoPressed}>
        Foto verifizieren
      </HomeScreenButtonWhite>
      <View style={[styles.doubleButtons, { maxWidth: (width * 3) / 4 }]}>
        <HomeScreenButtonGradient
          onPress={onAboutButtonPressed}
          startColor={COLORS.greenGradient.start}
          endColor={COLORS.greenGradient.end}
          position="left"
        >
          Info
        </HomeScreenButtonGradient>
        <HomeScreenButtonGradient
          onPress={onLoginButtonPressed}
          startColor={COLORS.blueGradient.start}
          endColor={COLORS.blueGradient.end}
          position="right"
        >
          Login
        </HomeScreenButtonGradient>
      </View>
      <HomeScreenButtonWhite iconName="photo" onPress={onAllPhotosPressed}>
        Alle Aufnahmen
      </HomeScreenButtonWhite>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    // justifyContent: "center",
  },
  doubleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
});

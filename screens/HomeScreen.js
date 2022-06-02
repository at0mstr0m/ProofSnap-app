import { StyleSheet, View, useWindowDimensions } from "react-native";
import HomeScreenButtonGradient from "../components/HomeScreenButtonGradient";
import HomeScreenButtonWhite from "../components/HomeScreenButtonWhite";
import Logo from "../components/Logo";
import COLORS from "../constants/colors";

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Logo />
      <HomeScreenButtonWhite iconName="camera">
        Foto aufnehmen
      </HomeScreenButtonWhite>
      <HomeScreenButtonWhite iconName="check">
        Foto verifizieren
      </HomeScreenButtonWhite>
      <View style={[styles.doubleButtons, { maxWidth: (width * 3) / 4 }]}>
        <HomeScreenButtonGradient
          startColor={COLORS.redGradient.start}
          endColor={COLORS.redGradient.end}
          position="left"
        >
          About
        </HomeScreenButtonGradient>
        <HomeScreenButtonGradient
          startColor={COLORS.blueGradient.start}
          endColor={COLORS.blueGradient.end}
          position="right"
        >
          Login
        </HomeScreenButtonGradient>
      </View>
      <HomeScreenButtonWhite iconName="photo">
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

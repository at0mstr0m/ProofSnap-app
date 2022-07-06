import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import COLORS from "../constants/colors";

export default function Logo() {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        { marginTop: height / 10, marginBottom: height / 20 },
      ]}
    >
      <Text style={styles.textContainer}>
        <Text style={styles.bold}>P</Text>
        <Text style={styles.regular}>roofSna</Text>
        <Text style={styles.bold}>P</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    fontSize: 30,
    color: COLORS.buttonText,
  },
  regular: {
    fontFamily: "Montserrat_400Regular",
  },
  bold: {
    fontFamily: "Montserrat_900Black",
  },
});

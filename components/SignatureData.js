import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import COLORS from "../constants/colors";
import { SHADOW, BORDER_RADIUS } from "../constants/design";
import CopyButton from "./CopyButton";
import * as Clipboard from "expo-clipboard";

const MARGIN = 12;

export default function SignatureData({ publicKey, signature }) {
  const { width, height } = useWindowDimensions();

  async function copyToClipboard() {
    await Clipboard.setStringAsync(
      JSON.stringify({
        public_key: publicKey,
        signature: signature,
      })
    );
  }

  return (
    <View style={[styles.container, { width: (width * 3) / 4 }]}>
      <View style={styles.topContainer}>
        <Text style={[styles.title, { marginTop: MARGIN * 2 }]}>PUBLIC KEY</Text>
        <CopyButton onPress={copyToClipboard} />
      </View>
      <View style={[styles.textContainer, { marginBottom: 0 }]}>
        <Text style={styles.text} numberOfLines={1}>
          {publicKey}
        </Text>
      </View>
      <Text style={styles.title}>SIGNATUR</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={1}>
          {signature}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    backgroundColor: COLORS.element,
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: BORDER_RADIUS,
    // padding: MARGIN,
    margin: MARGIN,
    marginBottom: MARGIN * 2, // avoids shadow being cut of by parent ScrollView
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Montserrat_400Regular",
    fontWeight: "900",
    marginBottom: MARGIN / 2,
    color: "white",
    marginLeft: MARGIN,
    marginTop: MARGIN,
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    padding: (MARGIN * 2) / 3,
    margin: MARGIN,
    marginTop: 0,
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    color: COLORS.element,
  },
});

import { StyleSheet, View, Text, Pressable } from "react-native";
import { SHADOW } from "../constants/design";
import COLORS from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CopyButton({ onPress }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <Text style={styles.text}>Kopieren</Text>
        <MaterialCommunityIcons
          name="content-copy"
          size={20}
          color={COLORS.element}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderRadius: 20,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 10,
  },
  pressable: {
    flexDirection: "row",
    margin: 4,
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    color: COLORS.element,
    marginRight: 6,
  },
});

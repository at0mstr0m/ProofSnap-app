import { StyleSheet, View, Text, Pressable } from "react-native";
import COLORS from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PasteButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
    >
      <Text style={styles.text}>Einfügen</Text>
      <MaterialCommunityIcons
        name="content-paste"
        size={20}
        color={COLORS.element}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "#e4e4e4",
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    color: COLORS.element,
    marginRight: 6,
  },
});

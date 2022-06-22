import { StyleSheet, useWindowDimensions, View, Pressable } from "react-native";
import { SHADOW, BORDER_RADIUS } from "../constants/design";
import { Foundation } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function ImagePreviewPlaceholder({ onPress }) {
  const { width, height } = useWindowDimensions();
  const containerWidth = (width * 3) / 4;
  const containerHeight = (containerWidth * 4) / 3;

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.container,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        <Foundation name="camera" size={50} color={COLORS.buttonText} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: BORDER_RADIUS,
    backgroundColor: "white",
  },
});

import { StyleSheet, Image, useWindowDimensions, View } from "react-native";
import { SHADOW, BORDER_RADIUS } from "../constants/design";
import { Foundation } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function ImagePreviewPlaceholder() {
  const { width, height } = useWindowDimensions();
  const containerWidth = (width * 3) / 4;
  const containerHeight = (containerWidth * 4) / 3;

  return (
    <View
      style={[
        styles.container,
        { width: containerWidth, height: containerHeight },
      ]}
    >
      <Foundation name="camera" size={50} color={COLORS.buttonText} />
    </View>
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

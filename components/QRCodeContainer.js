import { StyleSheet, View } from "react-native";
import COLORS from "../constants/colors";
import { SHADOW, BORDER_RADIUS, SIGNATURE_DATA_PADDING } from "../constants/design";

export default function QRCodeContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    // somehow here a background color is necessary again, otherwise the shadow does not work
    // https://stackoverflow.com/a/58111728/13128152
    backgroundColor: COLORS.element,
    borderRadius: BORDER_RADIUS,
    marginBottom: 20,
    padding: SIGNATURE_DATA_PADDING,
  },
});

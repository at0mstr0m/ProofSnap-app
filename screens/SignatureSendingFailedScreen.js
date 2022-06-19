import { StyleSheet, View, Text } from "react-native";
import ImagePreview from "../components/ImagePreview";
import COLORS from "../constants/colors";

export default function SignatureSendingFailedScreen({ route }) {
  const image = route.params.image;
  const title = route.params.title;

  return (
    <View style={styles.container}>
      <Text>SignatureSendingFailedScreen</Text>
      <Text>Title: {title}</Text>
      <ImagePreview image={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundRed,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

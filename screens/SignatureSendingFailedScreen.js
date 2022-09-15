import { StyleSheet, View, Text } from "react-native";
import ImagePreview from "../components/ImagePreview";
import Title from "../components/Text/Title";
import COLORS from "../constants/colors";

// is displayed when something goes wrong during signing 
export default function SignatureSendingFailedScreen({ route }) {
  const image = route.params.image;
  const title = route.params.title;

  return (
    <View style={styles.container}>
      <Title text={title} />
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

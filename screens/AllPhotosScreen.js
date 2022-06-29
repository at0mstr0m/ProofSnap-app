import { useContext } from "react";
import { SignedImagesContext } from "../context/SignedImagesContext";
import { StyleSheet, View, Text, FlatList } from "react-native";
import COLORS from "../constants/colors";
import SignedImagesPreview from "../components/SignedImagesPreview";

export default function AllPhotosScreen({ navigation }) {
  const signedImagesContext = useContext(SignedImagesContext);

  function imagePreviewPressHandler(id) {
    navigation.navigate("SignedImageDetailScreen", {
      signedImageData: signedImagesContext.getByID(id),
    });
  }

  function renderSignedImagesPreviews(itemData) {
    const itemProps = { ...itemData.item, onPress: imagePreviewPressHandler };
    return <SignedImagesPreview {...itemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={signedImagesContext.signedImages}
        keyExtractor={(item) => item.id}
        renderItem={renderSignedImagesPreviews}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

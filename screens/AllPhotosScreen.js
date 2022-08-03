import { useContext } from "react";
import { SignedImagesContext } from "../context/SignedImagesContext";
import { StyleSheet, View, Text, FlatList } from "react-native";
import COLORS from "../constants/colors";
import SignedImagesPreview from "../components/SignedImagesPreview";
import Title from "../components/Text/Title";

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
    {/* if there are no signed Images, display text instead */}
      {signedImagesContext.signedImages.length !== 0 ? (
        <FlatList
          data={signedImagesContext.signedImages}
          keyExtractor={(item) => item.id}
          renderItem={renderSignedImagesPreviews}
          showsVerticalScrollIndicator={false} // disable scrolling effects on all platforms
          bounces={false} // https://reactnative.dev/docs/scrollview#bounces-ios
          overScrollMode={"never"} // https://reactnative.dev/docs/scrollview.html#overscrollmode-android
          style={styles.scroller}
        />
      ) : (
        <Title text="Hier werden signierte Fotos gespeichert" />
      )}
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
  scroller: {
    flex: 1,
  },
});

import { useContext } from "react";
import {
  SignedImagesContext,
  sortByNewest,
} from "../context/SignedImagesContext";
import { StyleSheet, View, useWindowDimensions, Image } from "react-native";
import HomeScreenButtonGradient from "../components/Buttons/HomeScreenButtonGradient";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import SignedImagesPreview from "../components/SignedImagesPreview";
import COLORS from "../constants/colors";
import PreconfiguredScrollView from "../components/PreconfiguredScrollView";

// The Screen that is shown when the app has launched.
export default function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const signedImagesContext = useContext(SignedImagesContext);
  let imagePreviews = []; // stores max 3 rendered preview items
  let previewItems = []; // stores data of max 3 items

  // opens SignedImageDetailScreen for the pressed ImagePreview
  function imagePreviewPressHandler(id) {
    navigation.navigate("SignedImageDetailScreen", {
      signedImageData: signedImagesContext.getByID(id),
    });
  }

  function renderSignedImagesPreviews(item) {
    const itemProps = { ...item, onPress: imagePreviewPressHandler };
    return (
      // key declaration necessary here to avoid problems with react
      <View key={item.id}>
        <SignedImagesPreview {...itemProps} />
      </View>
    );
  }

  // previews of up to 3 most recent signed images
  if (signedImagesContext.signedImages.length === 1) {
    imagePreviews = signedImagesContext.signedImages;
  } else if (signedImagesContext.signedImages.length > 1) {
    imagePreviews = signedImagesContext.signedImages
      .sort(sortByNewest)
      .slice(0, 3);
  }
  if (imagePreviews?.length > 0) {
    for (const imagePreview of imagePreviews) {
      previewItems.push(renderSignedImagesPreviews(imagePreview));
    }
  }

  return (
    <View style={styles.container}>
      <PreconfiguredScrollView>
        {/* <Logo /> */}
        <Image
          source={require("../assets/icon.png")}
          style={[
            styles.logo,
            {
              width: width / 2,
              height: width / 2,
              marginTop: height / 18,
            },
          ]}
        />
        <HomeScreenButtonWhite
          iconName="camera"
          onPress={() => navigation.navigate("TakePhotoScreen")}
          title="Foto aufnehmen"
        />
        <HomeScreenButtonWhite
          iconName="check"
          onPress={() => navigation.navigate("VerifyPhotoScreen")}
          title="Foto verifizieren"
        />

        <View style={[styles.doubleButtons, { maxWidth: (width * 3) / 4 }]}>
          <HomeScreenButtonGradient
            title="Info"
            onPress={() => navigation.navigate("AboutScreen")}
            startColor={COLORS.greenGradient.start}
            endColor={COLORS.greenGradient.end}
            position="left"
          />
          <HomeScreenButtonGradient
            title="Login"
            onPress={() => navigation.navigate("LoginScreen")}
            startColor={COLORS.blueGradient.start}
            endColor={COLORS.blueGradient.end}
            position="right"
          />
        </View>
        <HomeScreenButtonWhite
          iconName="photo"
          onPress={() => navigation.navigate("AllPhotosScreen")}
          title="Alle Aufnahmen"
        />
        {previewItems}
      </PreconfiguredScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    // justifyContent: "center",
  },
  logo: {
    marginBottom: 10,
    borderRadius: 20,
  },
  doubleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
});

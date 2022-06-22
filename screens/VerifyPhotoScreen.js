import { useState } from "react";
import { StyleSheet, View, Platform, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import COLORS from "../constants/colors";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import ImagePreview from "../components/ImagePreview";
import ImagePreviewPlaceholder from "../components/ImagePreviewPlaceholder";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import SignatureDataInput from "../components/SignatureDataInput";
import { requestPermissionsAsync } from "expo-media-library";

export default function VerifyPhotoScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");

  async function selectImage() {
    const mediaLibraryPermissionResponse = await requestPermissionsAsync();
    if (!mediaLibraryPermissionResponse.granted) {
      console.error("permission not granted");
      return;
    }
    const newImage = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      exif: true,
    });
    if (newImage.cancelled) return;
    console.log("newImage.exif", newImage.exif);
    // width and height are confused on iOS, so they have to be switched
    if (Platform.OS === "ios") {
      let height = newImage.height;
      newImage.height = newImage.width;
      newImage.width = height;
    }
    setImage(newImage);
  }

  function openQRCodeScanner() {
    console.log("openQRCodeScanner");
  }

  async function checkSignature() {
    // const { sha256Hash, sha512Hash } = await generateHashes(image.base64);
    // const response = await verifyHashes(sha256Hash, sha512Hash);
    // console.log(response.data);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "VerificationSendingScreen",
          params: {
            image: image,
            publicKey: publicKey,
            signature: signature,
          },
        },
      ],
    });
  }

  if (!image || image.cancelled === true) {
    return (
      <View style={styles.container}>
        <Pressable onPress={selectImage}>
          <ImagePreviewPlaceholder />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false} // https://reactnative.dev/docs/scrollview#showsverticalscrollindicator
        // disable scrolling effects on all platforms
        bounces={false} // https://reactnative.dev/docs/scrollview#bounces-ios
        overScrollMode={"never"} // https://reactnative.dev/docs/scrollview.html#overscrollmode-android
        contentContainerStyle={styles.scrollView}
      >
        <Pressable onPress={selectImage}>
          <ImagePreview image={image} method="verify" />
        </Pressable>
        <HomeScreenButtonWhite
          onPress={openQRCodeScanner}
          iconName="qr"
          title="QR-Code scannen"
        />
        <SignatureDataInput
          publicKey={publicKey}
          setPublicKey={setPublicKey}
          signature={signature}
          setSignature={setSignature}
        />
        <HomeScreenButtonWhite
          onPress={checkSignature}
          iconName="check"
          title="Verifizieren"
          style={styles.button}
        />
      </KeyboardAwareScrollView>
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
  scrollView: { alignItems: "center" },
  image: {
    // marginBottom: 50,
  },
  button: {
    marginBottom: 20,
  },
});

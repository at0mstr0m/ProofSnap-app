import { useState } from "react";
import { StyleSheet, View, Text, Button, Image, Platform } from "react-native";
import COLORS from "../constants/colors";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { generateHashes } from "../helpers/HashHelper";
import { verifyHashes } from "../helpers/HttpHelper";
import ImagePreview from "../components/ImagePreview";

export default function VerifyPhotoScreen({ navigation }) {
  const [image, setImage] = useState(null);

  async function selectImage() {
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
          },
        },
      ],
    });
  }

  if (!image || image.cancelled === true) {
    return (
      <View style={styles.container}>
        <Text>VerifyPhotoScreen</Text>
        <Button title="Pick" onPress={selectImage} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImagePreview image={image} method="verify"/>
      <Button title="Check" onPress={checkSignature} />
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
  image: {
    // marginBottom: 50,
  },
});

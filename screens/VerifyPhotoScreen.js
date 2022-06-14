import { useState } from "react";
import { StyleSheet, View, Text, Button, Image, Platform } from "react-native";
import COLORS from "../constants/colors";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { generateHashes } from "../helpers/HashHelper";
import { verifyHashes } from "../helpers/HttpHelper";

export default function VerifyPhotoScreen({ params }) {
  const [image, setImage] = useState(null);

  async function selectImage() {
    const newImage = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      exif: true,
      // quality: 0.01,
    });
    console.log(newImage.exif);
    // width and height are confused on iOS, so they have to be switched
    if (Platform.OS === "ios") {
      let height = newImage.height;
      newImage.height = newImage.width;
      newImage.width = height;
    }
    setImage(newImage);
  }

  async function checkSignature() {
    const { sha256Hash, sha512Hash } = await generateHashes(image.base64);
    const response = await verifyHashes(sha256Hash, sha512Hash);
    console.log(response.data);
  }

  if (image === null || image.cancelled === true) {
    return (
      <View style={styles.container}>
        <Text>VerifyPhotoScreen</Text>
        <Button title="Pick" onPress={selectImage} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image.uri,
          width: image.height * 0.1,
          height: image.width * 0.1,
        }}
      />
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

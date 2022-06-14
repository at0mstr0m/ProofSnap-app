import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TextInput,
  useWindowDimensions,
  Alert,
} from "react-native";
import COLORS from "../constants/colors";
import { launchCameraAsync } from "expo-image-picker";
import HomeScreenButtonWhite from "../components/HomeScreenButtonWhite";
import { createAssetAsync, requestPermissionsAsync } from "expo-media-library";
import { generateHashes } from "../helpers/HashHelper";
import { signHashes } from "../helpers/HttpHelper";
import ImagePreview from "../components/ImagePreview";

export default function TakePhotoScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [enteredTitle, setEnteredTitle] = useState("");
  const { width, height } = useWindowDimensions();

  function titleInputHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  async function takeImage() {
    const newImage = await launchCameraAsync({
      allowsEditing: false,
      base64: true,
      exif: true,
      // quality: 0.01,
      // quality: 0.99,
    });
    // cannot go on without an image
    if (newImage.cancelled) return;
    console.log(newImage.exif);

    // width and height are confused on iOS, so they have to be switched
    if (Platform.OS === "ios") {
      let height = newImage.height;
      newImage.height = newImage.width;
      newImage.width = height;
    }
    setImage(newImage);
  }

  async function onSendButtonPressed() {
    if (enteredTitle === "") {
      Alert.alert("Titel fehlt", "Bitte geben Sie einen Titel ein", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    const permissionResponse = await requestPermissionsAsync();
    if (!permissionResponse.granted) {
      console.error("permission not granted");
      return;
    }
    navigation.navigate("SendingScreen", {
      image: image,
      method: "sign",
    });
  }

  // directly open camera when screen is called
  useEffect(() => {
    takeImage();
  }, []);

  if (image === null || image.cancelled === true) {
    return (
      <View style={styles.container}>
        <Text>TakePhotoScreen</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <ImagePreview image={image} />
      <TextInput
        style={[styles.titleInput, { width: (width * 3) / 4 }]}
        maxLength={100}
        placeholder="Titel"
        onChangeText={titleInputHandler}
        value={enteredTitle}
      />
      <HomeScreenButtonWhite iconName="send" onPress={onSendButtonPressed}>
        Signatur erstellen
      </HomeScreenButtonWhite>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
  },
  titleInput: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : null,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    margin: 10,
    height: 50,
    padding: 12,
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    color: COLORS.buttonText,
  },
});

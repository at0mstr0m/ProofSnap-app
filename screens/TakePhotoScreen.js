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
import { SHADOW } from "../constants/design";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
} from "expo-image-picker";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import { requestPermissionsAsync } from "expo-media-library";
import ImagePreview from "../components/ImagePreview";
import ImagePreviewPlaceholder from "../components/ImagePreviewPlaceholder";
import PreconfiguredKeyboardAwareScrollView from "../components/PreconfiguredKeyboardAwareScrollView";

export default function TakePhotoScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [enteredTitle, setEnteredTitle] = useState("");
  const { width } = useWindowDimensions();

  function titleInputHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  async function takeImage() {
    const cameraPermissionResponse = await requestCameraPermissionsAsync();
    if (!cameraPermissionResponse.granted) {
      console.error("permission not granted");
      return;
    }
    const newImage = await launchCameraAsync({
      allowsEditing: false,
      base64: true,
      exif: true,
      // quality: 0.01,
      // quality: 0.99,
    });
    // cannot go on without an image
    if (newImage.cancelled) return;
    // console.log(newImage.exif);
    // width and height are confused on iOS, so they have to be switched
    if (Platform.OS === "ios") {
      let height = newImage.height;
      newImage.height = newImage.width;
      newImage.width = height;
    }
    setImage(newImage);
  }

  async function initSigning() {
    if (enteredTitle === "") {
      Alert.alert("Titel fehlt", "Bitte geben Sie einen Titel ein", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    const mediaLibraryPermissionResponse = await requestPermissionsAsync();
    if (!mediaLibraryPermissionResponse.granted) {
      console.error("permission not granted");
      return;
    }
    // navigate to SendingScreen without the Possibility to go back and
    // accidentally start signing multiple times
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "SignatureSendingScreen",
          params: {
            image: image,
            title: enteredTitle.trim(), // remove unnecessary spaces at the end of the title that could be added by auto completion
          },
        },
      ],
    });
  }

  // directly open camera when screen is called
  useEffect(() => {
    takeImage();
  }, []);

  const imagePreview =
    !image || image.cancelled === true ? (
      <ImagePreviewPlaceholder onPress={takeImage} />
    ) : (
      <ImagePreview image={image} onPress={takeImage} />
    );

  return (
    // https://stackoverflow.com/a/57730773
    <View style={[styles.container]}>
      {/* https://github.com/APSL/react-native-keyboard-aware-scroll-view */}
      <PreconfiguredKeyboardAwareScrollView style={styles.scrollView}>
        {imagePreview}
        <TextInput
          style={[styles.titleInput, { width: (width * 3) / 4 }]}
          maxLength={100}
          placeholder="Titel"
          onChangeText={titleInputHandler}
          value={enteredTitle}
        />
        <HomeScreenButtonWhite
          iconName="send"
          onPress={initSigning}
          title="Signatur erstellen"
          style={styles.button}
        />
      </PreconfiguredKeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
  },
  titleInput: {
    ...SHADOW,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 10,
    height: 50,
    padding: 12,
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    color: COLORS.buttonText,
  },
  button: {
    margin: 20,
  },
});

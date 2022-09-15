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

// This screen leads the user through the process of signing an image
export default function TakePhotoScreen({ navigation }) {
  const [image, setImage] = useState(null); // stores the captured image
  const [enteredTitle, setEnteredTitle] = useState(""); // stores the image title
  const { width } = useWindowDimensions(); // screen width is used for styling

  // handles title input
  function titleInputHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  // handles taking an image
  async function takeImage() {
    // permission to use camera is necessary and will be requested from user if not yet granted
    const cameraPermissionResponse = await requestCameraPermissionsAsync();
    if (!cameraPermissionResponse.granted) {
      console.error("permission not granted");
      return;
    }
    // launch camera to take a photo
    const newImage = await launchCameraAsync({
      allowsEditing: false,
      base64: true,
      exif: true,
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

  // init sending the image to the backend
  async function initSigning() {
    // title must not be empty
    if (enteredTitle === "") {
      Alert.alert("Titel fehlt", "Bitte geben Sie einen Titel ein.", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    // permission to use the phones media library is necessary and will be requested from user if not yet granted
    const mediaLibraryPermissionResponse = await requestPermissionsAsync();
    if (!mediaLibraryPermissionResponse.granted) {
      console.error("permission not granted");
      return;
    }
    // Navigate to SendingScreen without the possibility to go back.
    // By this the signing process cannot be started multiple times.
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

  // rendered preview of the image
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

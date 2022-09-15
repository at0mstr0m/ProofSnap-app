// code inspired by
// https://github.com/academind/react-native-practical-guide-code/blob/07-redux-context/code/04-managing-favorite-meals/store/context/favorites-context.js

import { createContext, useState, useEffect } from "react";
// https://github.com/uuidjs/uuid#getrandomvalues-not-supported
// 'react-native-get-random-values' must be imported before uuid
import "react-native-get-random-values";
import { v4 as uuidV4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// necessary to share data across screens and persist it in the application
export const SignedImagesContext = createContext({
  signedImages: [],
  addSignedImage: (signedImage) => {},
  removeSignedImage: (id) => {},
  getByID: (id) => {},
});

export function SignedImagesContextProvider({ children }) {
  const [signedImages, setSignedImages] = useState([]);

  async function loadSignedImagesFromAsyncStore() {
    const allKeys = await AsyncStorage.getAllKeys();
    if (allKeys.length === 0) return; // AsyncStorage seems to be empty, can stop here
    const wholeStorage = await AsyncStorage.multiGet(allKeys);
    for (const keyItemPair of wholeStorage) {
      setSignedImages((currentSignedImagesIds) => [
        ...currentSignedImagesIds,
        JSON.parse(keyItemPair[1]),
      ]);
    }
  }

  useEffect(() => {
    loadSignedImagesFromAsyncStore();
  }, []);

  function addSignedImage(signedImageProps) {
    const id = uuidV4();
    const data = {
      ...signedImageProps,
      id: id,
    };
    setSignedImages((currentSignedImages) => [
      ...currentSignedImages,
      data,
    ]);
    AsyncStorage.setItem(id, JSON.stringify(data));
  }

  function removeSignedImage(id) {
    setSignedImages((currentSignedImages) =>
      currentSignedImages.filter((signedImage) => signedImage.id !== id)
    );
    AsyncStorage.removeItem(id);
  }

  function getByID(id) {
    return signedImages.find((item) => item.id === id);
  }

  const value = {
    signedImages: signedImages,
    addSignedImage: addSignedImage,
    removeSignedImage: removeSignedImage,
    getByID: getByID,
  };

  return (
    <SignedImagesContext.Provider value={value}>
      {children}
    </SignedImagesContext.Provider>
  );
}

// https://stackoverflow.com/a/1129270/13128152
export function sortByNewest(itemA, itemB) {
  if (itemA.timestamp < itemB.timestamp) {
    return 1;
  }
  if (itemA.timestamp > itemB.timestamp) {
    return -1;
  }
  return 0;
}

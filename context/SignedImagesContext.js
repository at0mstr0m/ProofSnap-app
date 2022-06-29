// code inspired by
// https://github.com/academind/react-native-practical-guide-code/blob/07-redux-context/code/04-managing-favorite-meals/store/context/favorites-context.js

import { createContext, useState } from "react";
// https://github.com/uuidjs/uuid#getrandomvalues-not-supported
// 'react-native-get-random-values' must be imported before uuid
import "react-native-get-random-values";
import { v4 as uuidV4 } from "uuid";

export const SignedImagesContext = createContext({
  signedImages: [],
  addSignedImage: (signedImage) => {},
  removeSignedImage: (id) => {},
  getByID: (id) => {},
});

export function SignedImagesContextProvider({ children }) {
  const [signedImages, setSignedImages] = useState([]);

  function addSignedImage(signedImageProps) {
    setSignedImages((currentSignedImagesIds) => [
      ...currentSignedImagesIds,
      {
        ...signedImageProps,
        id: uuidV4(),
      },
    ]);
  }

  function removeSignedImage(id) {
    setSignedImages((currentSignedImages) =>
      currentSignedImages.filter((signedImage) => signedImage.id !== id)
    );
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

import * as RNHash from "react-native-hash";

export async function generateHashes(base64String) {
  let sha256Hash;
  let sha512Hash;
  try {
    sha256Hash = await RNHash.JSHash(
      base64String,
      RNHash.CONSTANTS.HashAlgorithms.sha256
    );
    sha512Hash = await RNHash.JSHash(
      base64String,
      RNHash.CONSTANTS.HashAlgorithms.sha512
    );
    console.log(sha256Hash);
    console.log(sha512Hash);
  } catch (error) {
    console.error(error);
  }
  return {
    sha256Hash: sha256Hash,
    sha512Hash: sha512Hash,
  };
}

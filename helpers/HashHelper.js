import { digestStringAsync, CryptoDigestAlgorithm } from "expo-crypto";

export async function generateHashes(base64String) {
  let sha256Hash;
  let sha512Hash;
  // https://docs.expo.dev/versions/v45.0.0/sdk/crypto/#usage
  try {
    sha256Hash = await digestStringAsync(
      CryptoDigestAlgorithm.SHA256,
      base64String
    );
    sha512Hash = await digestStringAsync(
      CryptoDigestAlgorithm.SHA512,
      base64String
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

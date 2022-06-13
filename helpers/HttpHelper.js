import axios from "axios";

const BACKEND_IP = "http://192.168.188.40:1337";
const REQUEST_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
};

export async function signHashes(sha256Hash, sha512Hash) {
  const payload = new FormData();
  payload.append("user_id", "yxc321yxc");
  payload.append("sha256Hash", sha256Hash);
  payload.append("sha512Hash", sha512Hash);
  let response;
  /*
    ****** just the same POST request using the fetch API ******

    const response = await fetch("http://192.168.188.40:1337/sign", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: payload,
    });
    console.log(JSON.stringify(response));
    */
  try {
    response = await axios.post(`${BACKEND_IP}/sign`, payload, REQUEST_CONFIG);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  return response;
}

export async function verifyHashes(
  sha256Hash,
  sha512Hash,
  publicKey = "0081f033dde3d1960802044f51e6b2660905c961a81a86889df567a7956ea9d7893e55e352e8f84dca0268433198b88eaeb286e07143297817c5b823bcc5815d7af601ee555043ec748b02707f0df28564de6ee59205156bbf719af3dcddd7d8d80f9aca8344c31c742a1f1df59200f16333bea43ba5d1c92b57f5505e7b1ddc932db071",
  signature = "01ee5f516bda0b4387465c43da3cd5869f91e2590505babbfefd08caec6378abc87ae1ea23e4d45dadf6561a061577086da206255f8f6876a08cc38f665445e13da201197facec6af1d2f277834253f701c751a0c94d6753a8422179dd7cbda0133aa722814e6a7c1c3836c8989307c1de2cf0b2ad4cc80b639ef663ea4ab3e936d74111"
) {
  const payload = new FormData();
  payload.append("user_id", "yxc321yxc");
  payload.append("sha256Hash", sha256Hash);
  payload.append("sha512Hash", sha512Hash);
  payload.append("publicKey", publicKey);
  payload.append("signature", signature);
  let response;
  try {
    response = await axios.post(`${BACKEND_IP}/check`, payload, REQUEST_CONFIG);
  } catch (error) {
    console.error(error);
  }
  return response;
}

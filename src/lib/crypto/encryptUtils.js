import JSEncrypt from "jsencrypt";

/**
 * Encrypts any object using RSA public key
 */
export const encryptClientPayload = (data) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY);
  const json = JSON.stringify(data);
  return encryptor.encrypt(json);
};

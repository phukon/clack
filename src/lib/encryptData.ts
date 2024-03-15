import * as crypto from "crypto";

export const encryptData = ({ data, enKey, initVector }: { data: any; enKey: string; initVector: string }): string => {
  const stringData = JSON.stringify(data);
  const algorithm = "aes-256-cbc";
  const keyBuffer = Buffer.from(enKey, "hex"); // Convert hex string to buffer
  const ivBuffer = Buffer.from(initVector, "hex"); // Convert hex string to buffer

  const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);
  let encryptedData = cipher.update(stringData, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  return encryptedData;
};

export const decryptData = ({
  encryptedData,
  enKey,
  initVector,
}: {
  encryptedData: string;
  enKey: string;
  initVector: string;
}): string => {
  const algorithm = "aes-256-cbc";
  const keyBuffer = Buffer.from(enKey, "hex"); // Convert hex string to buffer
  const ivBuffer = Buffer.from(initVector, "hex"); // Convert hex string to buffer

  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
};

/**
 * Example Usage below
 * The key should be 32 bytes or 256 bits in length!!
 * Come up with a better approach later.
 * ~ Riki

const data = 'Hello, world!';
const key = '16e8632fcd04627647c2bbef1495d6b2c2da8fe37d579708abb00f2ab63586';
const iv = '450fd739c2e540bad33a847aac8c6811';

const encryptedString = encryptData({
  data: data,
  enKey: key,
  initVector: iv,
});

console.log("Encrypted:", encryptedString);

const decryptedString = decryptData({
  encryptedData: encryptedString,
  enKey: key,
  initVector: iv,
});

console.log("Decrypted:", decryptedString);
 */

import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.scryptSync(process.env.AES_SECRET!, 'salt', 32);
const IV = crypto.randomBytes(16); // vector de inicialización

export const encryptAES = (text: string): string => {
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return IV.toString('hex') + ':' + encrypted;
};

export const decryptAES = (hash: string): string => {
  const [ivHex, encrypted] = hash.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

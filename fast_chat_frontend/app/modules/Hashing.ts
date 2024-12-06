import { pbkdf2 as cryptoPbkdf2 } from 'crypto';
import { promisify } from 'util';

const pbkdf2 = promisify(cryptoPbkdf2);

const salt = 'a_secure_random_salt'; // Replace this with a securely generated salt for each user
const iterations = 10000; // Number of iterations
const keyLength = 64; // Length of the derived key
const digest = 'sha512'; // Hashing algorithm

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await pbkdf2(password, salt, iterations, keyLength, digest);
    return hashedPassword.toString('hex');
  } catch (error: any) {
    throw new Error(`Failed to hash password: ${error.message}`);
  }
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    const hash = await pbkdf2(password, salt, iterations, keyLength, digest);
    return hash.toString('hex') === hashedPassword;
  } catch (error: any) {
    throw new Error(`Failed to verify password: ${error.message}`);
  }
};

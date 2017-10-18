/*
 * This code lifted from bvaughn/babel-repl
 * Thank you!
 */
import LZString from 'lz-string';

export const compress = (string: string) =>
  LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

export const decompress = (string: string) =>
  LZString.decompressFromBase64(
    string
      .replace(/-/g, '+') // Convert '-' to '+'
      .replace(/_/g, '/') // Convert '_' to '/'
  );

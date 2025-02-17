
export const cleanControlSequences = (text: string): string => {
  return text.replace(
    /[\x03-\x05\x07\x08\x0B-\x1F\x7F\x90\x9B\x9C]/g,
    (char) => `(U+${char.charCodeAt(0).toString(16).padStart(4, '0')})`
  );
};

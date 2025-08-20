/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export const convertIntoShorterText = (
  text: string,
  amountOfCharacters: number
) => {
  if (text.length > amountOfCharacters) {
    return text.substring(0, amountOfCharacters).concat("...");
  }
  return text;
};

export const removeParentTitle = (title?: string): string => {
  if (title?.includes(" | ")) {
    title = title.split(" | ")[1] || title;
  }

  return title || "";
};

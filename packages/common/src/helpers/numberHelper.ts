/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
const NUMBER_SUFFIX = { "3": "k", "6": "M", "9": "G" };

export const formatWithMultiplierSuffix = (num: number) => {
  const rank = Math.floor(Math.log10(num) / 3) * 3;
  return `${Math.floor(num / Math.pow(10, rank))}${
    (NUMBER_SUFFIX as any)[`${rank}`] ?? ""
  }`;
};

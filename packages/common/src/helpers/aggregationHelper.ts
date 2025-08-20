/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
type Occurrences<T extends string> = {
  [key in T]: number;
};
export const countOccurrences = <T extends string>(items: T[]) =>
  items.reduce(
    (occurrences: Occurrences<T>, item: T) => ({
      ...occurrences,
      [item]: (occurrences[item] ?? 0) + 1,
    }),
    {} as Occurrences<T>
  );

export const pickTopOccurrence = <T extends string>(
  occurrences: Occurrences<T>
) =>
  Object.entries<number>(occurrences).sort(
    ([, count1], [, count2]) => count2 - count1
  )[0]?.[0] as T | undefined;

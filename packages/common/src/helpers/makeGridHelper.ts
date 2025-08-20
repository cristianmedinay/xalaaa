/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export const makeGridHelper = <GridItem>(
  items: GridItem[],
  numColumns: number
) => {
  const gridItems: GridItem[][] = [];

  items.forEach((_, index, array) => {
    if (index % numColumns === 0) {
      gridItems.push(array.slice(index, index + numColumns));
    }
  });

  return gridItems;
};

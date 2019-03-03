export const getClampedListItem = (list, index) => {
  const numItems = list.length;
  const clampedIndex = Math.floor(index % numItems);
  return list[clampedIndex];
};

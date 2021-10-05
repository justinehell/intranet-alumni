export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    if (item[key])
      return {
        ...obj,
        [item[key]]: item,
      };
  }, initialValue);
};

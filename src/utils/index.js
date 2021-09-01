export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const formatDate = (date) => {
  if (!date) return null;
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

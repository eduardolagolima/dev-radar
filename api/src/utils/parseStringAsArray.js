module.exports = function parseStringAsArray(arrayAsString) {
  if (!arrayAsString) return [];

  return arrayAsString.split(',').map(item => item.trim());
};

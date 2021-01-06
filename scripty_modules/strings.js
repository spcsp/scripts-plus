function increment(str) {
  return str.replace(/(\d+)+/g, (match, number) => parseInt(number) + 1);
}

function decrement(str) {
  return str.replace(/(\d+)+/g, (match, number) => parseInt(number) - 1);
}

module.exports = {
  decrement,
  increment
};
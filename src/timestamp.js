function timestamp() {
  const date = new Date();

  let t = date.getMonth() + 1;
  let g = date.getDate();
  let n = date.getHours();
  let a = date.getMinutes();
  let r = date.getSeconds();

  t = (t < 10 ? "0" : "") + t;
  g = (g < 10 ? "0" : "") + g;
  n = (n < 10 ? "0" : "") + n;
  a = (a < 10 ? "0" : "") + a;
  r = (r < 10 ? "0" : "") + r;

  return date.getFullYear() + "-" + t + "-" + g + " " + n + ":" + a + ":" + r;
}

module.exports = timestamp;

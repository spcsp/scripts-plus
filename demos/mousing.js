const { floor, random } = Math;
const { Width, Height } = sp.ForegroundWindow().Size;
const half = num => floor(parseInt(num) / 2);
const randomBetween = (min, max) => floor(random() * (max - min + 1) + min);
const randX = () => randomBetween(0, Width);
const randY = () => randomBetween(0, Height);

$.keyboard.hook(() => $.mouse.move(randX(), randY()));
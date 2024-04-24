/** @type {HTMLElement} */
const main = document.querySelector("main");
/** @type {HTMLVideoElement} */
const video = document.querySelector("video");
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/** @type {HTMLHeadingElement} */
const h1 = document.querySelector("h1");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});

const playRate = 500;
video.addEventListener("loadedmetadata", () => {
  const duration = video.duration;
  main.style.height = `${Math.floor(duration) * playRate}px`;
  drawVideo();
});

let lastScroll = 0;
function drawVideo() {
  const scroll = window.scrollY;
  const max = main.clientHeight - window.innerHeight;
  const frame = lerp(0, video.duration, scroll / max);
  console.log(frame);
  if (frame != lastScroll) {
    video.currentTime = frame;
    lastScroll = frame;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    h1.style.color = sampleCanvas();
  }
  requestAnimationFrame(drawVideo);
}

function sampleCanvas() {
  const randomX = Math.floor(Math.random() * canvas.width);
  const randomY = Math.floor(Math.random() * canvas.height);
  const color = ctx.getImageData(randomX, randomY, 1, 1).data;
  const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  return rgb;
}

/**
 * @param a {number}
 * @param b {number}
 * @param t {number}
 * @returns {number}
 */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

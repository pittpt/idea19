const html = document.documentElement;
const canvas = document.getElementById('scrollAnimation');
const context = canvas.getContext('2d');
const btn = document.getElementById('wish');

const frameCount = 420;
const currentFrame = (index) =>
  `/img/bg_${index.toString().padStart(5, '0')}.png`;

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1080;
canvas.height = 1920;
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

let access;
window.addEventListener('scroll', () => {
  // how far has the user scrolled
  const scrollTop = html.scrollTop;
  // maximum that the user can scroll inside the current window
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;

  // when hits half way then opacity is 1 otherwise opacity moves towards 0
  // copy.style.opacity = scrollFraction > 0.5 ? 1 - scrollFraction : 1;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  btn.style.opacity = frameIndex > 370 ? 1 : 0;
  access = frameIndex > 370 ? true : false;

  // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

btn.onclick = function fuck() {
  if (access) {
    console.log('click');
    window.open('/wish.html', '_self');
  }
};

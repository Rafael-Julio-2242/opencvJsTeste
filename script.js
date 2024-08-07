const video = document.getElementById("video-input");
const canvas = document.getElementById("canvas-output");

(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  let cap = new cv.VideoCapture(video);

  video.srcObject = stream;
  video.play();

  const FPS = 30;

  function proccessVideo() {

   let begin = Date.now();

   cap.read(src);

   let gray = new cv.Mat();
   cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

   let thresh = new cv.Mat();
   cv.threshold(gray, thresh, 90, 255, cv.THRESH_BINARY);


   cv.imshow("canvas-output", thresh);

   let delay = 1000 / FPS - (Date.now() - begin);
   setTimeout(proccessVideo, delay);
  }

  setTimeout(proccessVideo, 0);

})();

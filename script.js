let canvasOutput = document.getElementById("canvas-output");

let canvasInput = document.getElementById("canvas-input");

let fileInput = document.getElementById("file-input");

fileInput.addEventListener('change', (e) => {

 let files = e.target.files;

 if (files.length > 0) {
  let imgUrl = URL.createObjectURL(files[0]);

  // Aqui eu carrego ela no canvas
  let ctx = canvasInput.getContext('2d');
  let img = new Image();

  img.onload = function () {
   canvasInput.width = img.width;
   canvasInput.height = img.height;
   ctx.drawImage(img, 0, 0, img.width, img.height);
   
   // canvasOutput.width = img.width;
   // canvasOutput.height = img.height;
   // ctxOutput.drawImage(img, 0, 0, img.width, img.height);

  }
  img.src = imgUrl;

  // Agora, utilizando o opencv
  let src = cv.imread('canvas-input');
  let gray = new cv.Mat();

  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
  cv.imshow('canvas-output', gray);

 }


})

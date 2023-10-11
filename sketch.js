let sourceImg = null;
let maskImg = null;
let cnv;

let sourceFile = "input_new2.jpg"; // Your source image file
let maskFile = "mask_new2.png"; // Your mask image file

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup() {
  cnv = createCanvas(sourceImg.width, sourceImg.height);

  // Apply the curve effect to the entire image
  applyEffectToCanvas();
  // Overlay the source image where the mask is white
  overlaySourceWithMask();
  // Overlay checherboad pattern over mask
  overlayDistortedCheckerboardPatternOverMask();
  // Draw outline
  drawMaskOutline();
  noLoop();
}

function overlayDistortedCheckerboardPatternOverMask() {
  let patternSize = 20; 
  strokeWeight(1);
  for (let col = 0; col < sourceImg.width; col++) {
    for (let row = 0; row < sourceImg.height; row++) {
      let maskColor = maskImg.get(col, row);
      let sourceColor = sourceImg.get(col, row);
      
      // If the mask pixel is not black and source pixel is grey or white
      if (!(red(maskColor) < 1 && green(maskColor) < 1 && blue(maskColor) < 1) && (red(sourceColor) > 195 && green(sourceColor) > 195 && blue(sourceColor) > 195)) {
        
        // Create a distortion using sin and cos functions
        let distortion = Math.sin(col * 0.05) * 5 + Math.cos(row * 0.05) * 5;
        
        // Apply the distortion to the checkerboard pattern
        let isChecker = (Math.floor((col + distortion) / patternSize) + Math.floor((row + distortion) / patternSize)) % 2 == 0;
        if (isChecker) {
          // Set the pixel to grey
          stroke(66, 66, 66);
          point(col, row);
        }
      }
    }
  }
}

function drawMaskOutline() {
  stroke(255, 255, 46);  // Yellow color for the outline
  strokeWeight(12);    
  for (let col = 1; col < maskImg.width - 1; col++) {
    for (let row = 1; row < maskImg.height - 1; row++) {
      let maskColor = maskImg.get(col, row);
      if (red(maskColor) > 30 && green(maskColor) > 30 && blue(maskColor) > 30) {
        // Check adjacent pixels
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            let adjacentColor = maskImg.get(col + dx, row + dy);
            if (red(adjacentColor) < 20 || green(adjacentColor) < 20 || blue(adjacentColor) < 20) {
              point(col, row);
              break;
            }
          }
        }
      }
    }
  }
}


function drawSmartMaskOutline() {
  stroke(255, 255, 46);  // Yellow color for the outline
  strokeWeight(12);

  let minimumDistance = 15; 
  let foundDots = [];  
  for (let row = maskImg.height - 2; row >= 1; row--) {
    for (let col = 1; col < maskImg.width - 1; col++) {
      let maskColor = maskImg.get(col, row);
      if (red(maskColor) > 10 && green(maskColor) > 10 && blue(maskColor) > 10) {
        
        // Check if any dots are nearby
        let nearbyDotExists = false;
        for (let dot of foundDots) {
          let distance = Math.sqrt(Math.pow(col - dot.x, 2) + Math.pow(row - dot.y, 2));
          if (distance < minimumDistance) {
            nearbyDotExists = true;
            break;
          }
        }

        if (foundDots.length > 10 && !nearbyDotExists) {
          continue;  // Skip this iteration if no dots are nearby after the first few dots
        }

        // Check adjacent pixels
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            let adjacentColor = maskImg.get(col + dx, row + dy);
            if (red(adjacentColor) < 10 || green(adjacentColor) < 10 || blue(adjacentColor) < 10) {
              point(col, row);
              foundDots.push({ x: col, y: row });
              break;
            }
          }
        }
      }
    }
  }
}


function applyEffectToCanvas() {
  for (let col = 0; col < sourceImg.width; col += 10) {
    for (let row = 0; row < sourceImg.height; row += 10) {
      let xPos = col;
      let yPos = row;
      let c = sourceImg.get(xPos, yPos); 

      push();
      translate(xPos, yPos);
      noFill();
      strokeWeight(random(3));
      stroke(color(c));
      curve(xPos, yPos, sin(xPos) * 68, cos(xPos) * sin(xPos) * 40,
              0, 0, cos(yPos) * sin(yPos) * random(140), cos(xPos) * sin(xPos) * 50);
      pop();
    }
  }
}

function overlaySourceWithMask() {
  for (let col = 0; col < sourceImg.width; col++) {
    for (let row = 0; row < sourceImg.height; row++) {
      let maskColor = maskImg.get(col, row);
      // If the mask pixel is not black show source image
      if (red(maskColor) > 1 && green(maskColor) > 1 && blue(maskColor) > 1) {
        let originalColor = sourceImg.get(col, row);
        stroke(originalColor);
        point(col, row);
      }
    }
  }
}

function keyTyped() {
  if (key == '!') {
    saveCanvas(cnv, 'myCanvas', 'jpg');
  }
}

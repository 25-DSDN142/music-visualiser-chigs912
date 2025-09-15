function setup() {
  colorMode(HSB);
  createCanvas(600, 400);
}

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(255, 174, 66); // orange sky
  textFont('Verdana');
  rectMode(CENTER);
  textSize(24);
  noStroke();

  // Switch scene after 76 seconds
  if (counter >= 76 * 60) {
    draw_new_scene(words, vocal, drum, bass, other, counter);
  } else {
    draw_original_scene(words, vocal, drum, bass, other, counter);
  }
}

// first scene, mountains w/sun
function draw_original_scene(words, vocal, drum, bass, other, counter) {
  let speed = 2;
  let loopLength = width + 200;
  let shift = (counter * speed) % loopLength;

  // Drums for mountain height
  let drumHeight = map(drum, 0, 100, 0, 80);

  noStroke();
  fill(100, 100, 100);
  triangle(100 - shift, 400, 300 - shift, 150 - drumHeight, 500 - shift, 400);
  fill(120, 120, 120);
  triangle(300 - shift, 400, 450 - shift, 200 - drumHeight, 600 - shift, 400);
  fill(80, 80, 80);
  triangle(0 - shift, 400, 200 - shift, 200 - drumHeight, 400 - shift, 400);

  // Duplicate for looping
  fill(100, 100, 100);
  triangle(100 - shift + loopLength, 400, 300 - shift + loopLength, 150 - drumHeight, 500 - shift + loopLength, 400);
  fill(120, 120, 120);
  triangle(300 - shift + loopLength, 400, 450 - shift + loopLength, 200 - drumHeight, 600 - shift + loopLength, 400);
  fill(80, 80, 80);
  triangle(0 - shift + loopLength, 400, 200 - shift + loopLength, 200 - drumHeight, 400 - shift + loopLength, 400);

  // bass for sun
  let sunX = width - 120;
  let sunY = 100;
  let rotation = counter * 0.05;
  let sunSize = map(bass, 0, 100, 40, 120); // bass makes sun grow
  let sunBrightness = map(bass, 0, 100, 100, 255);

  push();
  translate(sunX, sunY);
  rotate(rotation);
  noStroke();
  fill(255, 255, sunBrightness);
  ellipse(-60, 0, sunSize, sunSize);
  pop();

  // eyeball for vocals
  let startFrame = 27.5 * 60;
  let endFrame = 30 * 60;
  if (counter >= startFrame && counter <= endFrame) {
    let progress = (counter - startFrame) / (endFrame - startFrame);

    let eyeballY = (progress <= 0.5)
      ? map(progress, 0, 0.5, 0, 100)
      : map(progress, 0.5, 1, 100, 0);

    let eyeballX = width / 2;
    let eyeballSize = map(words, 0, 100, 50, 120); // words make eyeball grow

    push();
    noStroke();
    fill(255, 255, 255);
    ellipse(eyeballX, eyeballY, eyeballSize, eyeballSize * 0.75);
    fill(0);
    ellipse(eyeballX, eyeballY, eyeballSize / 3, eyeballSize / 2.5);
    pop();
  }
}

// new scene with bees and clouds
function draw_new_scene(words, vocal, drum, bass, other, counter) {
  background(255, 174, 66);


  // vocals for clouds
  let cloudAlpha = map(vocal, 0, 100, 100, 255);
  let cloudShift = map(vocal, 0, 100, -20, 20); // wobble left/right
  fill(255, 255, 255, cloudAlpha);
  noStroke();
  for (let i = 0; i < 3; i++) {
    let cloudX = 100 + i * 200 + (counter % 60) + cloudShift;
    let cloudY = 80 + (i % 2) * 20;
    ellipse(cloudX, cloudY, 80, 50);
    ellipse(cloudX + 30, cloudY + 10, 60, 40);
    ellipse(cloudX - 30, cloudY + 10, 60, 40);
  }

  // other for bees
  for (let i = 0; i < 5; i++) {
    drawBee(i, counter, other);
  }

  // bass for sun
  let sunX = width - 100;
  let sunY = 80;
  let sunSize = map(bass, 0, 100, 40, 120);
  let sunBrightness = map(bass, 0, 100, 150, 255);

  push();
  translate(sunX, sunY);
  rotate(counter * 0.03);
  noStroke();
  fill(255, 255, sunBrightness);
  ellipse(0, 40, sunSize, sunSize);
  pop();
}

// 5 bees in zigzag pattern, each moves independently
for (let i = 0; i < 5; i++) {
  drawBee(i, counter);
}

// bee with zig zag movement
function drawBee(index, counter) {
  // Horizontal movement, bees move left to right, spaced out
  let baseX = (counter * 2 + index * 100) % (width + 100) - 50;

  // Zigzag vertical
  let zigzagSpeed = 2;
  let zigzagRange = 30;
  let phase = (counter * zigzagSpeed + index * 20) % 60;
  let zigzagY;

  if (phase < 30) {
    // going down
    zigzagY = map(phase, 0, 30, 150, 150 + zigzagRange);
  } else {
    // going up
    zigzagY = map(phase, 30, 60, 150 + zigzagRange, 150);
  }

  // Draw bee body
  push();
  noStroke();
  fill(249, 201, 1); // bright yellow-ish color
  ellipse(baseX, zigzagY, 20, 12); // bee body

  // Wings (two small ellipses)
  fill(255, 255, 255, 150); // semi-transparent white wings
  ellipse(baseX - 6, zigzagY - 8, 12, 6);
  ellipse(baseX + 6, zigzagY - 8, 12, 6);

  // Bee stripes (black lines)
  stroke(0);
  strokeWeight(1);
  line(baseX - 7, zigzagY - 3, baseX - 7, zigzagY + 3);
  line(baseX, zigzagY - 4, baseX, zigzagY + 4);
  line(baseX + 7, zigzagY - 3, baseX + 7, zigzagY + 3);
  pop();
}

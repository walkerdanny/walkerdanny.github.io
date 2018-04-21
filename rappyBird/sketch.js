// Rappy Bird by Danny Walker
// http://danny.makesthings.work
// Original Flappy bird clone by:

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

var bird;
var pipes;
var parallax = 0.8;
var score = 0;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;
var slider;
var button;
var beatRecorder;
var thisBeat;
var recording = false;

sounds = [];
soundFileNames = ["1.wav", "2.wav", "3.wav", "4.wav", "5.wav", "6.wav", "1a.wav", "2a.wav", "3a.wav", "4a.wav", "5a.wav"];

function preload() {
  soundFormats('wav')
  for (fileName of soundFileNames){
    sounds.push(loadSound("samples/" + fileName));
  }
  pipeBodySprite = loadImage('graphics/moneystack.png');
  pipePeakSprite = loadImage('graphics/moneystack.png');
  birdSprite = loadImage('graphics/bird.png');
  bgImg = loadImage('graphics/sky.png');
  slider = createSlider(0.1, 0.7, 0.5, 0.1);
  button = createButton("Download last beat");
  button.mousePressed(downloadLastBeat);
}

function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent("rightColumn");
  br = createSpan("<br/><br/");
  br.parent("rightColumn");
  if(slider){
    slider.parent("rightColumn");
  }
  if(button){
    button.parent("rightColumn");
  }
  reset();
  textFont("VT323");
}

function draw() {
  background(0);
  if(!recording){
    beatRecorder = new p5.SoundRecorder();
    thisBeat = new p5.SoundFile();
    beatRecorder.record(thisBeat);
    recording = true;
  }

  image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;

  if(bird && slider){
    bird.gravity = slider.value();
  }

  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].pass(bird)) {
      score++;
    }

    if (pipes[i].hits(bird)) {
      if(recording){
        try{
          beatRecorder.stop();
        } catch (err){
          console.log("This error exists and I have no more time to troubleshoot it");
          console.log("Maybe one day I'll fix it. For the time being, I'm just catching it.");
          console.log(err)
        }
        recording = false;
      }
      gameover();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  if (bird.edges()){
    if(recording){
      try{
        beatRecorder.stop();
      } catch (err){
        console.log("This error exists and I have no more time to troubleshoot it");
        console.log("Maybe one day I'll fix it. For the time being, I'm just catching it.");
        console.log(err)
      }
      recording = false;
    }
    gameover();
  }

  bird.update();
  bird.show();

  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  showScores();
}

function showScores() {
  textSize(32);
  fill(255,200,0);
  text('Score: ' + score, 1, 32);
  text('Hi Score: ' + maxScore, 1, 64);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  fill(255,200,0);
  text('Game Over :(', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}

function keyTyped() {
  switch(key){
    case ' ':
      bird.up();
      if (isOver) reset();
      break;
    case "e":
      bird.up();
      sounds[0].play();
      if (isOver) reset();
      break;
    case "r":
      bird.up();
      sounds[1].play();
      if (isOver) reset();
      break;
    case "t":
      bird.up();
      sounds[2].play();
      if (isOver) reset();
      break;
    case "y":
      bird.up();
      sounds[3].play();
      if (isOver) reset();
      break;
    case "u":
      bird.up();
      sounds[4].play();
      if (isOver) reset();
      break;
    case "i":
      bird.up();
      sounds[5].play();
      if (isOver) reset();
      break;
    case "d":
      bird.up();
      sounds[6].play();
      if (isOver) reset();
      break;
    case "f":
      bird.up();
      sounds[7].play();
      if (isOver) reset();
      break;
    case "g":
      bird.up();
      sounds[8].play();
      if (isOver) reset();
      break;
    case "h":
      bird.up();
      sounds[9].play();
      if (isOver) reset();
      break;
    case "j":
      bird.up();
      sounds[10].play();
      if (isOver) reset();
      break;
  }
}

function downloadLastBeat(){
  if(thisBeat){
    save(thisBeat, 'SUPER SICK HIP HOP BEAT.wav');
  }
}

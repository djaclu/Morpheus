let background_sound;
let selection;
let p = false; //waiting for input status
let count = 0;
let rates = [1, 1];
let last_start = 0;
let game_duration = 40*60*1000;
var w = window.innerWidth;
var h = window.innerHeight;
let xm = w/2;
let ym = h/2;


function preload() {
  //permissions
  getAudioContext().suspend();

  //assets
  soundFormats('mp3');
  background_sound = loadSound('Weightless.mp3');
  tone = loadSound('tone.mp3');
  correct = loadSound('correct.mp3');
}


function setup() {
//background
  canvas = createCanvas(w, h);
  background_sound.play();
  background_sound.loop();
}

function draw() {
  //visual interface
  background(0);
  stroke(128, 128, 128);
  line(0, ym, w, ym);


  push();
  textAlign(CENTER,CENTER);
  fill(40, 40, 40);
  stroke(40, 40, 40);
  textSize(128);
  text('Higher', xm, h*(1/4));
  text('Lower', xm, h*(3/4));
  pop();



  //audio interface
  if (p == false && (millis()-last_start) > 3000) {
    if (tone.isPlaying() == false){
      rates[count] = tone.rate(random(0.5, 1.5));
      tone.play();
      count+=1;

      if(count == 2){
        p = true;
      }
    }
  }

  //volume control
  let progress = map(millis(), 0, game_duration, 1, 0);
  background_sound.setVolume(progress);
}

function evaluate() {

  if ((rates[1] > rates[0] && selection == "higher") ||
      (rates[1] < rates[0] && selection == "lower")) {
    correct.play();
  }
}

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w,h);
  xm = w/2;
  ym = h/2;
}

function touchStarted () {
  userStartAudio();
  
  let t = touches;
  
  if(p == true){
    
    if (t[0].y <= ym) {
    selection = "higher";
  } else {
    selection = "lower";
  }
    evaluate();
    p = false;
    count = 0;
    last_start = millis();
  }
  
}

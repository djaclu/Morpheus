let background_sound;
let selection;
let p = false; //waiting for input status
let count = 0;
let rates = [1, 1];
let last_start = 0;
let game_duration = 40*60*1000;


function preload() {
  //permissions
  getAudioContext().suspend();
  
  //assets
  soundFormats('mp3', 'wav');
  background_sound = loadSound('Weightless.mp3');
  tone = loadSound('tone.mp3');
  correct = loadSound('correct.mp3');
}

function setup() {
  fullscreen();
//background
  createCanvas(displayWidth, displayHeight);
  background_sound.play();
  background_sound.loop();
  
  let hm = displayHeight/2;
  let wm = displayWidth/2;
}

function draw() {
  //visual interface
  background(0);
  stroke(128, 128, 128);
  let hm = displayHeight/2;
  let wm = displayWidth/2;
  line(0, wm, displayWidth, wm);
  
  
  push();
  textAlign(CENTER,CENTER);
  fill(40, 40, 40);
  stroke(40, 40, 40);
  textSize(128);
  text('Higher', hm, (wm/2)*1);
  text('Lower', hm, (wm/2)*3);
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

function mousePressed() {
  
  if(p == true){
    
    if (mouseY <= hm) {
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

function touchStarted(){
  userStartAudio();
}

function evaluate() {
  
  if ((rates[1] > rates[0] && selection == "higher") ||
      (rates[1] < rates[0] && selection == "lower")) {
    correct.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

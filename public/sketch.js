/**

 * KEYS
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png

 */

var mycanvas

var x = 0;
var y = 0;
var stepSize = 0.01;

var font = 'Georgia';
var letters = 'ciao ';
var agents = [];
var init = 0;
var agentCount = 0; // initial agents
var maxAgentCount = 10; // max agents
var noiseScale = 500; // you can modify it to change the vorticity of the flux
var noiseStrength = 10;
var strokeWidth = 0.3;
var fontSizeMin = 14;

//impostazioni riconoscimento vocale //
let speechRec;
let lang = 'en-US'; //|| 'it-IT'
let vol_map;
let vol2 = 1;
let spoke = false;
var micBtn;

//impostazioni firebase
var readData = []; //read data container
var texts;

function setup() {
  //FIREBASE SETTINGS
  database = firebase.database(); //start database
  texts = database.ref('texts'); //start collection
  //END FIREBASE SETTINGS

  speechRec = new p5.SpeechRec(lang, gotSpeech);
  mic = new p5.AudioIn();
  mic.start();

  mycanvas = createCanvas(windowWidth, windowHeight / 100 * 85);
  mycanvas.parent('canvas');
  // mycanvas.mouseClicked(writeOnCanvas)

  colorMode(RGB, 150, 150, 150); //colorMode(mode, max1, max2, max3, [maxA])
  textFont(font, fontSizeMin);

  //load data from storage
  texts.once("value", gotData)
  texts.on("value", updateData); //The “value” event is triggered when changes are made to the database

  micBtn=document.getElementById('panel').contentWindow.document.getElementById('micBtn')
  micBtn.addEventListener('mousedown', startMic);
  micBtn.addEventListener('mouseup', stopMic)
}; //fine setup


function draw() {
  frameRate(9); // questo per far brutalmente rallentare le scritte
  // //volume
  vol = round(mic.getLevel(), 2);
  vol_map = map(vol, 0, 1, 1, 150);
  // console.log("volume " + vol_map);

  if (getAudioContext().state !== 'running') {
    text('non funziona audio', width / 2, height / 2);
  } else {
    text('audio abilitato', width / 2, height / 2);
  }

  fill('rgba(255,255,255, 0.05)');
  noStroke();
  rect(0, 0, width, height);

  // Draw agents
  for (var i = 0; i < agentCount; i++) {
    agents[i].update(noiseScale, noiseStrength, strokeWidth);
  }
} //fine draw;

function gotData(data) { //load data from server
  var texts = data.val(); //The val() function returns an object.
  var keys = Object.keys(texts); // Grab the keys to iterate over the object
  agentCount = keys.length;
  for (var i = 0; i < keys.length; i++) { //for each object
    var userText = texts[keys[i]]; //assign his data to var userText
    agents[i] = new Agent(userText.xPos, userText.yPos, color(userText.rCol, userText.gCol, userText.bCol), userText.letters, userText.vol_map);
  }
}

function updateData(data) { //update text list
  var texts = data.val();
  var keys = Object.keys(texts);
  agentCount = keys.length;
  for (var i = keys.length - 1; i < keys.length; i++) { //select last object
    var userText = texts[keys[i]];
    agents[i] = new Agent(userText.xPos, userText.yPos, color(userText.rCol, userText.gCol, userText.bCol), userText.letters, userText.vol_map);
  }
}


function writeOnCanvas() {
  if (spoke==true) {
  var rCol=document.getElementById('panel').contentWindow.document.getElementById('slider1').value
  var gCol=document.getElementById('panel').contentWindow.document.getElementById('slider2').value
  var bCol=document.getElementById('panel').contentWindow.document.getElementById('slider3').value

  agents[agentCount] = new Agent(mouseX, mouseY, color(rCol, gCol, bCol), letters, vol_map);
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  //write data
  var data = { //crate user data
    xPos: mouseX,
    yPos: mouseY,
    rCol: rCol,
    gCol: gCol,
    bCol: bCol,
    letters: letters,
    vol_map: vol_map
  }
  texts.push(data); //push user data to the firebase collection
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == ' ') {
    var newNoiseSeed = floor(random(10000));
    noiseSeed(newNoiseSeed);
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
};

function startMic() {
  let continuous = true; //continua a registrare
  let interim = false;
  speechRec.start(continuous, interim);
  console.log("listening");
  document.getElementById('panel').contentWindow.document.getElementById('micBtn').style.backgroundImage = "url('../assets/image/04.2_Mic.gif')"
}

function stopMic() {
  document.getElementById('panel').contentWindow.document.getElementById('micBtn').style.backgroundImage = "url('../assets/image/04.1_Mic fermo.png')"
}

function gotSpeech() {
  if (speechRec.resultValue) {
    let text = speechRec.resultString;
    letters = text + ' ';
    spoke = true
    console.log(speechRec.resultString)
    console.log("sono nella funzione gotspeech");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight / 100 * 85);
}

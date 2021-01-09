var sketchMic = function(m) {

  var micImg;
  var myCanvas;
  var dimMic;
  var mouseOnMic = false;

  m.setup = function() {
    myCanvas = m.createCanvas(m.windowWidth / 2, m.windowHeight / 4);
    myCanvas.parent("mic");
    micImgStatic = m.loadImage('../assets/image/04.1_Mic fermo.png')
    micImgDynamic = m.loadImage('../assets/image/04.2_Mic.gif')

  };

  m.draw = function() {
    dimMic = myCanvas.width / 2.5;
    m.background(0);
    m.image(micImgStatic, (myCanvas.width / 2 - dimMic / 2), (myCanvas.height / 2 - dimMic / 2), dimMic, dimMic)

    if (((m.mouseX < myCanvas.width / 2 + dimMic / 2) && (m.mouseX > myCanvas.width / 2 - dimMic / 2)) &&
      ((m.mouseY < myCanvas.height / 2 + dimMic / 2) && (m.mouseY > myCanvas.height / 2 - dimMic / 2))) {
        mouseOnMic = true;
      } else {
        mouseOnMic = false
      }

    if (mouseOnMic==true && m.mouseIsPressed) {
      m.micMove()
    }
  }


  m.micMove = function() {
    m.background(0);
    m.image(micImgDynamic, (myCanvas.width / 2 - dimMic / 2), (myCanvas.height / 2 - dimMic / 2), dimMic, dimMic)
  };

  m.windowResized = function() {
    m.resizeCanvas(m.windowWidth / 2, m.windowHeight / 4)
  };

}

myp5 = new p5(sketchMic);

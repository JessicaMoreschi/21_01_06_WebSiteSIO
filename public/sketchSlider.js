var sketchSlider = function(s) {

  var myCanvas

  s.setup = function() {
    myCanvas = s.createCanvas(s.windowWidth / 2, s.windowHeight / 4);
    myCanvas.parent("slider");
  };

  s.draw = function() {
    s.background(0);
    s.fill(255);
    s.textFont('typekaM')
    s.textSize(15)
    s.text('feel1', 0, myCanvas.height / 10 + 2.5*myCanvas.height / 10)
    s.text('feel3', 0, myCanvas.height / 10 + 5*myCanvas.height / 10)
    s.text('feel4', 0, myCanvas.height / 10 + 7.5*myCanvas.height / 10)
    s.text('feel2', myCanvas.width / 10*7.4, myCanvas.height / 10 + 2.5*myCanvas.height / 10)
    s.text('feel4', myCanvas.width / 10*7.4, myCanvas.height / 10 + 5*myCanvas.height / 10)
    s.text('feel6', myCanvas.width / 10*7.4, myCanvas.height / 10 + 7.5*myCanvas.height / 10)

    s.rect(myCanvas.width/2-25,myCanvas.height / 10 + 1.5*myCanvas.height / 10,50,10,10)
    s.rect(myCanvas.width/2-25,myCanvas.height / 10 + 4*myCanvas.height / 10,50,10,10)
    s.rect(myCanvas.width/2-25,myCanvas.height / 10 + 6.5*myCanvas.height / 10,50,10,10)

    s.push()
    s.fill(0);
    s.strokeWeight(2)
    s.stroke(255)
    s.ellipse(myCanvas.width/2,myCanvas.height / 10 + 2*myCanvas.height / 10, 15)
    s.ellipse(myCanvas.width/2,myCanvas.height / 10 + 4.5*myCanvas.height / 10, 15)
    s.ellipse(myCanvas.width/2,myCanvas.height / 10 + 7*myCanvas.height / 10, 15)
    s.pop()

  };


  s.windowResized = function() {
    s.resizeCanvas(s.windowWidth / 2, s.windowHeight / 4)
  };

}

var myp5 = new p5(sketchSlider);

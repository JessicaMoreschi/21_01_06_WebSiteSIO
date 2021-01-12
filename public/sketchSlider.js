var sketchSlider = function(s) {

  var myCanvas
  var slider1;
  var slider2;
  var slider3
  var cursor

  s.setup = function() {
    slider1 = s.createSlider(0, 255, 127.5);
    slider1.parent('slider1');
    slider2 = s.createSlider(0, 255, 127.5);
    slider2.parent('slider2');
    slider3 = s.createSlider(0, 255, 127.5);
    slider3.parent('slider3');

    cursor=document.getElementById('slider1').style=""
  };


  s.draw = function() {
    let r = slider1.value();
    let g = slider2.value();
    let b = slider3.value();

  };


}

var myp5 = new p5(sketchSlider);

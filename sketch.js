document.getElementById('demosMenu').addEventListener('change', function(e){
    var dropdown = document.getElementById('demosMenu');
    window.location.href = dropdown.options[dropdown.selectedIndex].getAttribute('id') + '.html';
});

function buy(){
  document.getElementById('testoBuy').style.display='block';
  var btn = document.getElementById("testoBuyBtn");
  btn.innerHTML = "Comprato";
  btn.style.backgroundColor='#f9f9f8';
  btn.style.borderColor='#887b86';
  btn.style.color='#887b86';

}

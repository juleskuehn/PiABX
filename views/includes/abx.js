$(document).ready(function(){

// sends switching commands to server

var xhttp = new XMLHttpRequest();

function doSwitch(letter) {
  xhttp.open("POST", "/switch"+letter, true);
  xhttp.send();
}

// coin toss for random X (and Y)

function defineRandomXY() {
  randomX = 'A';
  randomY = 'B';
  var coinFlip = Math.floor(Math.random() * 2);
  if (coinFlip) {
  	randomX = 'B';
  	randomY = 'A';
  }
}

// init

var randomX, randomY;
var path = window.location.pathname;

function trialInit() {

  defineRandomXY();

  // set initial switch position (leftmost button is active)

  if (path==='/xy') {
    doSwitch(randomX);
  } else {
    doSwitch('A');
  }

}

var trialResults = [];
trialInit();

function nextTrial() {
  if (trialResults.length>=25) {
   $('p#trialNumber').html('Completed maximum (25) trials'); 
   $('#computeResults').click();   
  } else {
   $('p#trialNumber').html('Trial '+Math.floor(trialResults.length+1));
   trialInit();
  }
}

// button behaviour

$('#switchA,#switchB,#switchX,#switchY').click(function(e){
  $('#switchA,#switchB,#switchX,#switchY').removeClass('active');
  $(this).addClass('active');
});

$('#switchA').click(function(){
  doSwitch('A');
});

$('#switchB').click(function(){
  doSwitch('B');
});

$('#switchX').click(function(){
  doSwitch(randomX);
});

$('#switchY').click(function(){
  doSwitch(randomY);
});

$('#revealXY').click(function(){
  $('#reveal').html('X is '+randomX+'. Y is '+randomY+'. <a href="/xy">Restart XY test</a>');
});

$('#revealX').click(function(){
  $('#reveal').html('X is '+randomX+'. <a href="/abx">Restart ABX test</a>');
});

// multiple Trials behaviour

$('#preferA').click(function(){
  if (trialResults.length>=25) {
   $('p#trialNumber').html('Completed maximum (25) trials');    
  } else {
   trialResults.push('A');
   nextTrial();
  }
});

$('#preferB').click(function(){
  if (trialResults.length>=25) {
   $('p#trialNumber').html('Completed maximum (25) trials');    
  } else {
   trialResults.push('B');
   nextTrial();
  }
});

$('#preferX').click(function(){
  if (trialResults.length>=25) {
   $('p#trialNumber').html('Completed maximum (25) trials');    
  } else {
   trialResults.push(randomX);
   nextTrial();
  }
});

$('#preferY').click(function(){
  if (trialResults.length>=25) {
   $('p#trialNumber').html('Completed maximum (25) trials');    
  } else {
   trialResults.push(randomY);
   nextTrial();
  }
});

$('#chooseA').click(function(){
  if (trialResults.length>=25) {
   $('p#trialNumber').html('Completed maximum (25) trials');    
  } else {
   trialResults.push(randomX==='A');
   nextTrial();
  }
});

$('#chooseB').click(function(){
  if (trialResults.length>=25) {
   $('p#trialNumber').html('Completed maximum (25) trials');    
  } else {
   trialResults.push(randomX==='B');
   nextTrial();
  }
});

// end Trial and show results

$('#computeResults').click(function(){
  var niceResults = '';
  if (trialResults[0] == undefined) {
    return;
  }
  choiceA = trialResults[0];
  var consistency = 0;
  var mostChosen;
  for (i=0;i<trialResults.length;i++) {
    if (trialResults[i]===choiceA) {
      consistency++;
    }
    else {
      mostChosen = trialResults[i];
    }
  };
  consistency /= trialResults.length;
  if (consistency>=0.5){
    mostChosen = choiceA;
  } else {
    consistency = Math.abs(consistency-1);
  }
  niceResults = Math.round(consistency*100) +'% '+mostChosen+'. ';
  if (trialResults.length>=10) {
    // calculate probability of guessing
    significantResults = [9,9,10,10,11,12,12,13,13,14,15,15,16,16,17,18];
    if (consistency*trialResults.length >= significantResults[trialResults.length-10]) {
      niceResults += '<strong>Statistically significant result!</strong> (95% confidence)'
    }
    else {
      niceResults += 'Not statistically significant.'
    }
  } else {
    niceResults += 'Need at least 10 trials for significant results.'
  }
  niceResults += '<ul>';
  for (i=0;i<trialResults.length;i++) {
    niceResults += '<li>'+trialResults[i]+'</li>';
  };
  niceResults += '</ul>';
  $('p#results').html(niceResults);
});

$('#resetTest').click(function(){
  trialResults = [];
  nextTrial();
  $('p#results').html('');
});

});
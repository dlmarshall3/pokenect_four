const chill = document.getElementById('chill');
const chillBall1 = document.getElementById('chillBall1')
const chillBall2 = document.getElementById('chillBall2')

const fever = document.getElementById('fever');
const feverBall1 = document.getElementById('feverBall1')
const feverBall2 = document.getElementById('feverBall2')

const btnPlay = document.getElementById('btnPlay');
const gameSelect = document.getElementById('gameHidden');
const btnDiv = document.getElementById('btnPlayDiv');


//play/pause button for the music
function play(){
  let intro = document.getElementById('intro');
  intro.volume = 0.25;
  return intro.paused ? intro.play() : intro.pause();
}

//hides play button when clicked and starts background music
btnPlay.addEventListener('click', function(){
  gameSelect.classList.toggle('hidden');
  btnDiv.classList.add('btnHide');
  const audio = document.getElementById('intro');
  audio.play();
  audio.volume = 0.25;
})

//reveals pokeballs to the left/right of chill button
chill.addEventListener('mouseenter', function(){
  chillBall1.classList.add('reveal');
  chillBall2.classList.add('reveal');
  const hover = document.getElementById('hover');
  hover.play();
  hover.volume = 0.15;
})

//hides pokeballs to the left/right of chill button
chill.addEventListener('mouseleave', function(){
  chillBall1.classList.toggle('reveal');
  chillBall2.classList.toggle('reveal');
})

//reveals pokeballs to the left/right of hide button
fever.addEventListener('mouseenter', function(){
  feverBall1.classList.add('reveal');
  feverBall2.classList.add('reveal');
  const hover = document.getElementById('hover');
  hover.play();
  hover.volume = 0.15;
})

//hides pokeballs to the left/right of fever button
fever.addEventListener('mouseleave', function(){
  feverBall1.classList.toggle('reveal');
  feverBall2.classList.toggle('reveal');
})

//plays sound effect when chill button is clicked, pauses music, and loads chill.html
chill.addEventListener('click', function(e){
  // e.preventDefault();
  document.getElementById('intro').pause();
  const save = document.getElementById('save');
  save.play();
  save.volume = 0.15;
  setTimeout(function(){
    document.location.href = 'chill.html';
  }, 1000)
})

//plays sound effect when fever button is clicked, pauses music, and loads fever.html
fever.addEventListener('click', function(e){
  console.log('Here we go!')
  document.getElementById('intro').pause();
  const save = document.getElementById('save');
  save.play();
  save.volume = 0.15;
  setTimeout(function(){
    document.location.href = 'fever.html';
  }, 1000)
})

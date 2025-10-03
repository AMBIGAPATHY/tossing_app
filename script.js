const tossBtn  = document.getElementById('tossBtn');
const coin     = document.getElementById('coin');
const coinInner= document.getElementById('coinInner');
const result   = document.getElementById('result');

let isBusy = false;

function pickResult() {
  return Math.random() < 0.5 ? 'HEADS' : 'TAILS';
}

function setFinalFace(face) {
  coin.classList.remove('show-heads', 'show-tails');
  if (face === 'HEADS') {
    coin.classList.add('show-heads');
  } else {
    coin.classList.add('show-tails');
  }
}

tossBtn.addEventListener('click', () => {
  if (isBusy) return;
  isBusy = true;

  result.textContent = 'TOSSING…';

  // Randomize duration slightly for variety
  const duration = 1100 + Math.floor(Math.random() * 400);
  coin.style.setProperty('--toss-duration', duration + 'ms');

  // Reset orientation before toss and force reflow to restart animation
  coin.classList.remove('show-heads', 'show-tails');
  void coin.offsetWidth;

  // Start toss
  coin.classList.add('tossing');

  const outcome = pickResult();

  // On animation end, show result and settle to the winning face
  const onEnd = () => {
    coin.classList.remove('tossing');
    setFinalFace(outcome);
    result.textContent = outcome;
    coinInner.removeEventListener('animationend', onEnd);
    isBusy = false;
  };
  coinInner.addEventListener('animationend', onEnd, { once: true });
});

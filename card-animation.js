let lastClickedTab = 0;

document.querySelectorAll('.card').forEach((card, index) => {
 const tab = card.querySelector('.tab');
 tab.addEventListener('click', function () {
  const cards = document.querySelectorAll('.card');
  const isBack = card.classList.contains('card--back');

  cards.forEach((otherCard, otherIndex) => {
      if (isBack && otherIndex > index) {
        otherCard.classList.add('active');
      } else if (!isBack && otherIndex < index) {
        otherCard.classList.add('active');
      } else {
        otherCard.classList.remove('active');
      }
    });
  console.log(lastClickedTab);
  if (lastClickedTab !== tab) {
  const deck = document.querySelector('.deck');

  deck.classList.add('flipping');
  setTimeout(() => {
    deck.classList.remove('flipping');
   }, 750);
  }
  lastClickedTab = tab;

 });
});

window.addEventListener('load', function () {
  const cards = document.querySelectorAll('.card');
  let delay = 0;

  for (let i = 0; i < 3; i++) {
    const card = cards[i]; // Select individual card
    setTimeout(() => {
      card.classList.add('active');
      const deck = document.querySelector('.deck');
      deck.classList.add('flipping');

  setTimeout(() => {
  deck.classList.remove('flipping');
  }, 2000);
}, delay);
delay += 500; // Delay between animations for each card
}
});

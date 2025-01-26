let lastClickedTab = 0;

document.querySelectorAll('.card').forEach((card, index) => {
 const tab = card.querySelector('.tab');
 tab.addEventListener('click', function () {
  if (lastClickedTab == tab) return;
  const cards = document.querySelectorAll('.card');
  const isBack = card.classList.contains('active');
  if (isBack) card.classList.remove('active');

  cards.forEach((otherCard, otherIndex) => {
    console.log(otherIndex);
    const isActive = otherCard.classList.contains('active');
      if (isBack && otherIndex > index && isActive) {
        otherCard.classList.remove('active');
        otherCard.style.zIndex =  `calc(1000 - var(--i))`;
       console.log("im flipping this card up");
      } else if (!isBack && otherIndex < index && !isActive) {
        otherCard.classList.add('active');
       console.log("im flipping this card down")
      } else {
        console.log("im doing nothing")
      }
    });

  const deck = document.querySelector('.deck');

  deck.classList.add('flipping');
  setTimeout(() => {
    deck.classList.remove('flipping');
    cards.forEach((card, index) => {
      console.log(index);
    card.style.zIndex = `calc(100 - var(--i))`;
  });
   }, 750);

  lastClickedTab = tab;

 });
});

window.addEventListener('load', function () {
  const cards = document.querySelectorAll('.card');
  let delay = 0;

  for (let i = 0; i < 3; i++) {
    const card = cards[i];
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

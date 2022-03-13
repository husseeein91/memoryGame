const prepare = {};
prepare.cards = [];
prepare.progress = 0;
const numberOfCards = 26;
const tempNumbers = [];
let cardsHtmlContent = "";
const getRandomInt = (min, max) => {
  let result;
  let exists = true;
  min = Math.ceil(min);
  max = Math.floor(max);
  while (exists) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!tempNumbers.find((no) => no === result.toString())) {
      exists = false;
      tempNumbers.push(result.toString());
    }
  }
  return result;
};
const toggleFlip = (index) => {
  const card = prepare.cards[index];
  if (!card.flip && card.clickable) {
    flip(card, index);
    selectCard(card, index);
  }
};
const flip = (card, index) => {
  if (card) {
    card.flip = card.flip === "" ? "flip" : "";
    document.getElementById(`card-flip-${index}`).classList.value = card.flip;
  }
};
const selectCard = (card, index) => {
  if (!prepare.selectedCard_1) {
    prepare.selectedCard_1 = card;
    prepare.selectedIndex_1 = index;
  } else if (!prepare.selectedCard_2) {
    prepare.selectedCard_2 = card;
    prepare.selectedIndex_2 = index;
  }
  if (prepare.selectedCard_1 && prepare.selectedCard_2) {
    if (prepare.selectedCard_1.src === prepare.selectedCard_2.src) {
      prepare.selectedCard_1.clickable = false;
      prepare.selectedCard_2.clickable = false;
      prepare.selectedCard_1 = null;
      prepare.selectedCard_2 = null;
      changeProgress();
      checkFinish();
    } else {
      setTimeout(() => {
        flip(prepare.selectedCard_1, prepare.selectedIndex_1);
        flip(prepare.selectedCard_2, prepare.selectedIndex_2);
        prepare.selectedCard_1 = null;
        prepare.selectedCard_2 = null;
      }, 2000);
    }
  }
};
const changeProgress = () => {
  const progress =
    (prepare.cards.filter((card) => !card.clickable).length / numberOfCards) *
    100;
  const progressElement = document.getElementById("progress");
  progressElement.style.width = `${Math.ceil(progress)}%`;
  progressElement.innerText = `${Math.ceil(progress)}%`;
};
const checkFinish = () => {
  if (
    prepare.cards.filter((card) => !card.clickable).length === numberOfCards
  ) {
    alert("congratulations you finished the game successfully");
  }
};
for (let index = 0; index < numberOfCards / 2; index++) {
  prepare.cards.push({
    id: getRandomInt(0, numberOfCards),
    src: `./assets/images/${index}.jpg`,
    flip: "",
    clickable: true,
    index,
  });
  prepare.cards.push({
    id: getRandomInt(0, numberOfCards),
    src: `./assets/images/${index}.jpg`,
    flip: "",
    clickable: true,
    index,
  });
}
prepare.cards.sort((a, b) => (a.id > b.id ? 1 : -1));
prepare.cards.forEach((item, index) => {
  cardsHtmlContent += `<span class="col-sm-3 col-lg-2">
    <div onclick="toggleFlip(${index})" class="card-flip">
      <div id="card-flip-${index}">
        <div class="front">
          <div class="card">
            <img src="./assets/back.jpg" class="card-image" alt="Loading..." />
            <span class="card-content">${index + 1}</span>
          </div>
        </div>
        <div class="back">
          <div class="card">
            <img
              src="./assets/images/${item.index}.jpg"
              alt="Image [100%x180]"
              data-holder-render="true"
              style="height: 120px; width: 100%; display: block"
            />
          </div>
        </div>
      </div>
    </div>
  </span>`;
  document.getElementById("cards").innerHTML = cardsHtmlContent;
});

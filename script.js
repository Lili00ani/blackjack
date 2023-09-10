//HIGH CARD

let inputField = document.getElementById("input-field");
let submitButton = document.getElementById("submit-button");
let cardRank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
let cardSuit = ["hearts", "diamonds", "clubs", "spades"];
let cardName = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
];
let cardObject = { name: "", suit: "", rank: 0 };
let deck = [];

for (let each of cardSuit) {
  for (let index = 0; index < cardRank.length; index++) {
    cardObject = { name: cardName[index], suit: each, rank: cardRank[index] };
    deck.push(cardObject);
  }
}

let randInt = function (length) {
  return Math.floor(Math.random() * length);
};

let shuffled = function (cardDeck) {
  for (let index = 0; index < cardDeck.length; index++) {
    let swapIndex = randInt(cardDeck.length);
    let tempCard = cardDeck[index];
    cardDeck[index] = cardDeck[swapIndex];
    cardDeck[swapIndex] = tempCard;
  }
  return cardDeck;
};

let myCardText = function (cards) {
  let text = "";
  for (let i = 0; i < cards.length; i++) {
    text += `(${cards[i]["name"]} of ${emoji(cards[i]["suit"])})`;
  }
  text += `. Total is ${sumCards(cards)}`;
  return text;
};

let emoji = function (suit) {
  if (suit == "hearts") {
    return `♥`;
  } else if (suit == "spades") {
    return `♠`;
  } else if (suit == "diamonds") {
    return `♦`;
  } else if (suit == "clubs") {
    return `♣`;
  }
};

let dealTwoCards = function (deck) {
  let cards = [];
  cards.push(deck.pop());
  cards.push(deck.pop());
  return cards;
};

let sumCards = function (cards) {
  let sum = 0;
  let aceIndex = 0;
  for (let i = 0; i < cards.length; i++) {
    let rank = cards[i]["rank"];
    if (rank == 1) {
      aceIndex++;
    }
    sum += rank;
  }
  while (aceIndex > 0 && sum <= 11) {
    sum += 10;
    aceIndex--;
  }
  return sum;
};

let checkBlackJack = function (cards) {
  return sumCards(cards) == 21;
};

let checkOver = function (cards) {
  return sumCards(cards) > 21;
};

let summary = function (playerCard, compCard) {
  let text = `Player had ${myCardText(playerCard)}`;
  text += `<br>Computer had `;
  text += myCardText(compCard);
  return text;
};

let playerCard = [];
// playerCard = [
//   { name: "2", suit: "hearts", rank: 2 },
//   { name: "3", suit: "spades", rank: 3 },
// ];
let compCard = [];
let playerContinue = true;

let gameMode = "start";
let shuffledDeck = shuffled(deck);

let main = function (input) {
  if (gameMode == "start") {
    submitButton.textContent = "Submit";
    playerCard = dealTwoCards(shuffledDeck);
    compCard = dealTwoCards(shuffledDeck);
    let text = `Player had ${myCardText(playerCard)} <br>`;
    text += `Computer had (${compCard[0].name} of ${emoji(
      compCard[0].suit
    )})<br><br> `;
    // text += `Computer had ${myCardText(compCard)}`;
    if (checkBlackJack(compCard)) {
      text += `😭You lose.<br> Computer had ${myCardText(compCard)} <br>`;
      inputField.placeholder = "Click to restart";
      submitButton.textContent = "Restart";
    } else if (checkBlackJack(playerCard)) {
      text += `🏆You won!`;
      inputField.placeholder = "Click to restart";
      submitButton.textContent = "Restart";
    } else {
      inputField.placeholder = "Type 'hit' or 'stand";
      gameMode = "decide";
      return text;
    }
  }

  if (gameMode == "decide") {
    if (input == "hit") {
      playerCard.push(shuffledDeck.pop());
      let text = "";
      if (checkBlackJack(compCard) || checkOver(playerCard)) {
        text += `😭You lose.<br> ${summary(playerCard, compCard)} <br>`;
        inputField.placeholder = "Click submit to restart";
        submitButton.textContent = "Restart";
        gameMode = "start";
      } else if (checkBlackJack(playerCard) || checkOver(compCard)) {
        text += `🏆You won! <br>${summary(playerCard, compCard)} <br>`;
        inputField.placeholder = "Click submit to restart";
        submitButton.textContent = "Restart";
        gameMode = "start";
      } else {
        text += `Player had ${myCardText(playerCard)} <br>`;
        text += `Computer had (${compCard[0].name} of ${emoji(
          compCard[0].suit
        )})<br><br> `;
        inputField.placeholder = "Type 'hit' or 'stand'";
      }
      return text;
    } else if (input == "stand") {
      let text = "";
      if (sumCards(compCard) < 17) {
        compCard.push(shuffledDeck.pop());
      }
      if (checkBlackJack(compCard) || checkOver(playerCard)) {
        text += `😭You lose.<br> ${summary(playerCard, compCard)} <br>`;
      } else if (checkBlackJack(playerCard) || checkOver(compCard)) {
        text += `🏆You won! <br> ${summary(playerCard, compCard)} <br>`;
      } else {
        if (sumCards(playerCard) > sumCards(compCard)) {
          text += `🏆You won! <br> ${summary(playerCard, compCard)} <br>`;
        } else if (sumCards(playerCard) == sumCards(compCard)) {
          text += `Draw! <br> ${summary(playerCard, compCard)} <br>`;
        } else {
          text += `😭You lose.<br> ${summary(playerCard, compCard)} <br>`;
        }
      }
      inputField.placeholder = "Click to restart";
      submitButton.textContent = "Restart";
      gameMode = "start";
      return text;
    } else {
      return `Invalid input. Type hit or stand.`;
    }
  }
};

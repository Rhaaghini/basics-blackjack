var GAME_START = "GAME_START";
var GAME_CARDS_DRAWN = "GAME_CARDS_DRAWN";
var GAME_RESULTS_DISPLAY = "GAME_RESULTS_DISPLAY";
var GAME_HIT_OR_STAND = "GAME_HIT_OR_STAND";
var currentGameMode = GAME_START;

var playerHand = [];
var dealerHand = [];

var gameDeck = [];

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffleDeck = shuffleCards(newDeck);
  return shuffleDeck;
};

var checkForBlackjack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
};

var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue + totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player Hand 🤚:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  index = 0;
  var dealerMessage = "Dealer Hand 💻:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value:" +
    playerHandValue +
    "<br>Dealer total hand value:" +
    dealerHandValue;
  return totalHandValueMessage;
};

var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == GAME_START) {
    gameDeck = createNewDeck();
    console.log(gameDeck);
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log(playerHand);
    console.log(dealerHand);
    currentGameMode = GAME_CARDS_DRAWN;
    myOutputValue =
      "Everyone has been dealt 2 cards. 🃏🃏 Click on the submit button to evaluate the cards! ";
    return myOutputValue;
  }
  if (currentGameMode == GAME_CARDS_DRAWN) {
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "It is a blackjack tie!";
      } else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " Player wins by blackjack!";
      } else {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dealer wins by blackjack!";
      }
    } else {
      myOutputValue =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        " There is no blackjack!<br><br>Pleapse input either 'hit' or 'stand'.";
      currentGameMode = GAME_HIT_OR_STAND;
    }
    return myOutputValue;
  }
  if (currentGameMode == GAME_HIT_OR_STAND) {
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      myOutputValue =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br> You drew another card. <br>Please input either 'hit' or 'stand'.";
    } else if (input == "stand") {
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      console.log(playerHandTotalValue);
      console.log(dealerHandTotalValue);
      if (playerHandTotalValue == dealerHandTotalValue) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>It is a tie!<br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br> Please refresh the page to play again!";
      } else if (playerHandTotalValue > dealerHandTotalValue) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins!<br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br> Please refresh the page to play again!";
      } else {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins!<br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br> Please refresh the page to play again!";
      }
    } else {
      myOutputValue =
        "Wrong input! Please select either 'hit' or 'stand'!<br><br>" +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }
  }
  return myOutputValue;
};

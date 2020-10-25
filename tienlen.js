const readline = require('readline-sync');

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  toString() {
    return `${this.rank}(${this.suit})`;
  }
}

class Deck {
  constructor() {
    this.deck = [];
  }
  
  initialize() {
    const CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
      'J', 'Q', 'K', 'A'];
    const CARD_SUITS = ['S', 'C', 'D', 'H'];

    CARD_SUITS.forEach(suit => {
      CARD_RANKS.forEach(rank => {
        this.deck.push(new Card(rank, suit));
      });
    });
  }

  print() {
    console.log(this.deck);
  }

  cardsLeft() {
    return this.deck.length;
  }

  shuffle() {
    for (let index = 0; index < this.deck.length; index += 1) {
      let randomIndex = Math.floor(Math.random() * this.deck.length);
      let currCard = this.deck[index];
      this.deck[index] = this.deck[randomIndex];
      this.deck[randomIndex] = currCard;
    }
  }

  deal() {
    return this.deck.pop();
  }
}


class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  getHand() {
    return this.hand.map(card => card.toString()).join(', ');
  }

  playCards(cardIndices) {
    cardIndices.reverse().forEach(index => {
      this.hand.splice(index,1);
    });
  }
}


class Tienlen {
  constructor(players, deck) {
    this.players = players;
    this.deck = deck;
    this.roundStarterIndex = 0;
  }

  static get RANK_ORDER() {
    return ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  }

  static get SUIT_ORDER() {
    return ['S', 'C', 'D', 'H'];
  }

  static sortHand(hand) {
    hand.sort((a, b) => Tienlen.RANK_ORDER.indexOf(a.rank) -
      Tienlen.RANK_ORDER.indexOf(b.rank));
  }

  newGame() {
    this.deck.initialize();
    this.deck.shuffle();
    this.roundStarterIndex = Math.floor(Math.random() * this.players.length);
  }

  dealHands() {
    const MAX_CARDS = 13;
    for (let cardCount = 0; cardCount < MAX_CARDS; cardCount += 1) {
      this.players.forEach(player => {
        player.hand.push(this.deck.deal());
      });
    }
  }

  displayHands() {
    this.players.forEach(player => {
      Tienlen.sortHand(player.hand);
      console.log(`${player.name}: ${player.getHand()}`);
    });
  }

  whoseTurn() {
    console.log(`Turn: ${this.players[this.roundStarterIndex].name}`);
  }

  playTurn(player) {

  }
}

let player1 = new Player("Sorim");
let player2 = new Player("Lessaj");
let player3 = new Player("Kat");
let game = new Tienlen([player1, player2, player3], new Deck());
game.newGame();
game.dealHands();
game.displayHands();
game.whoseTurn();
console.log(player1.playCards([1,2,8]));
game.displayHands();
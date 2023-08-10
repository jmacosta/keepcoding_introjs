import { listPlayers } from "./modules/data.js";
import {
  createMatch,
  hasAnyNull,
  hasOnlyOneWinner,
  initPlayers,
  playOff,
} from "./modules/functions.js";
const tournament = (listPlayers) => {
  let tournamentWinner = "";
  let allPlayers = initPlayers(listPlayers);

  while (hasAnyNull(allPlayers) && !hasOnlyOneWinner(allPlayers)) {
    while (hasAnyNull(allPlayers)) {
      const [playerA, playerB] = playOff(
        allPlayers.filter((element) => element.winnerMatch === null)
      );
      const game = createMatch(playerA.name, playerB.name);
      let gameScore = game.getGameScore();
      let matchScore = game.getMatchScore();
      while (!game.getWinner()) {
        game.pointWonBy(Math.floor(Math.random() * 2) + 1);
        console.log(game.getCurrentRoundScore());
        if (matchScore !== game.getMatchScore()) {
          console.log(`win this game ${game.getMatchScore()}`);
          matchScore = game.getMatchScore();
        } else if (gameScore !== game.getGameScore()) {
          console.log(`Round score ${game.getGameScore()}`);
          gameScore = game.getGameScore();
        }
      }
      allPlayers.forEach((element) => {
        if (element.name === playerA.name || element.name === playerB.name) {
          element.winnerMatch = element.name === game.getWinner();
        }
      });
      tournamentWinner = game.getWinner();
    }
    if (allPlayers.length > 2) {
      allPlayers = allPlayers.filter((element) => element.winnerMatch);
      allPlayers.map((element) => (element.winnerMatch = null));
    }
  }
  return tournamentWinner;
};

console.log(`Tournament winner is ${tournament(listPlayers)}`);

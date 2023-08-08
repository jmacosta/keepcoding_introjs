import { listPlayers } from "./modules/data.js";
import {
  createMatch,
  hasAnyNull,
  initPlayers,
  playOff,
} from "./modules/functions.js";
const tournament = (listPlayers) => {
  const allPlayers = initPlayers(listPlayers);

  //while (hasAnyNull(allPlayers) || !hasOnlyOneWinner(allPlayers)) {
  while (hasAnyNull(allPlayers)) {
    const [playerA, playerB] = playOff(
      allPlayers.filter((element) => element.winnerMatch === null)
    );
    const game = createMatch(playerA.name, playerB.name);
    while (!game.getWinner()) {
      game.pointWonBy(Math.floor(Math.random() * 2) + 1);
      game.debugPlayers();
    }
    allPlayers.forEach((element) => {
      if (element.name === playerA.name || element.name === playerB.name) {
        element.winnerMatch = element.name === game.getWinner();
      }
    });
    console.log(allPlayers);
  }
  // to do clean losers and play again
  //};
};

tournament(listPlayers);

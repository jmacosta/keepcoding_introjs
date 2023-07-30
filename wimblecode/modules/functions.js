const listPlayers = [
  "Alberto Casero",
  "David Jiménez",
  "Javier de Miguel",
  "Eduardo Aguilar",
];
const scoreSystemDefault = [0, 15, 30, 40];
const settingsDefault = {
  MAX_ROUND: 7,
  WIN_ROUND: 4,
  DIFERENCE_BETWEEN_ROUNDS: 2,
};

function createMatch(
  player_1,
  player_2,
  scoreSystem = scoreSystemDefault,
  settings = settingsDefault
) {
  let players = {
    id_1: {
      name: player_1,
      roundScore: 0,
      gameScore: 0,
      matchScore: 0,
      advantage: false,
    },
    id_2: {
      name: player_2,
      roundScore: 0,
      gameScore: 0,
      matchScore: 0,
      advantage: false,
    },
  };
  let winner = "yo";

  const pointWonBy = (playerId) => {
    // pending feats
    if (playerId === 1 || playerId === 2) {
      players["id_" + playerId].roundScore++;
    }
  };
  const getCurrentRoundScore = () => {
    let result = "";
    if (
      players.id_1.roundScore < scoreSystem.length - 2 ||
      players.id_2.roundScore < scoreSystem.length - 2
    ) {
      result = `${players.id_1.name} ${
        scoreSystem[players.id_1.roundScore]
      } - ${players.id_2.name} ${scoreSystem[players.id_2.roundScore]}`;
    } else if (
      (players.id_1.roundScore <= scoreSystem.length - 1 &&
        players.id_2.roundScore <= scoreSystem.length - 1 &&
        players.id_1.advantage) ||
      players.id_2.advantage
    ) {
      result = "deuce";
    } else if (players.id_1.advantage) {
      result = "advantage " + players.id_1.name;
    } else {
      result = "advantage " + players.id_2.name;
    }
    return result;
  };
  const resetScore = () => {
    players.id_1.roundScore = 0;
    players.id_2.roundScore = 0;
    players.id_1.advantage = false;
    players.id_2.advantage = false;
  };
  const getGameScore = () => {
    return (
      players.id_1.name +
      " " +
      players.id_1.gameScore +
      " " +
      "\n" +
      players.id_2.name +
      " " +
      players.id_2.gameScore
    );
  };
  const getMatchScore = () => {
    return (
      players.id_1.name +
      " " +
      players.id_1.matchScore +
      " " +
      "\n" +
      players.id_2.name +
      " " +
      players.id_2.matchScore
    );
  };
  const getWinner = () => {
    return winner;
  };
  return {
    pointWonBy,
    getCurrentRoundScore,
    getGameScore,
    getMatchScore,
    getWinner,
  };
}

const game = createMatch(listPlayers[0], listPlayers[1]);
console.log(game.getMatchScore());
game.pointWonBy(1);
game.pointWonBy(1);
game.pointWonBy(1);
game.pointWonBy(2);
game.pointWonBy(2);
game.pointWonBy(2);
console.log(game.getCurrentRoundScore());

console.log(`The winner is ${game.getWinner()}`);

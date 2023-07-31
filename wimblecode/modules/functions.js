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
  let winner = "";
  let currentRoundScore = "";

  const pointWonBy = (playerId) => {
    if (playerId === 1 || playerId === 2) {
      players["id_" + playerId].roundScore++;
      // Score < 40 - 40
      if (
        players.id_1.roundScore <= scoreSystem.length - 2 ||
        players.id_2.roundScore <= scoreSystem.length - 2
      ) {
        currentRoundScore = `${players.id_1.name} ${
          scoreSystem[players.id_1.roundScore]
        } - ${players.id_2.name} ${scoreSystem[players.id_2.roundScore]}`;
      } else {
        if (currentRoundScore != "deuce") {
          currentRoundScore = "deuce";
          // if (players.id_1.advantage) {
          //   currentRoundScore = "advantage " + players.id_1.name;
          // } else if (players.id_2.advantage) {
          //   currentRoundScore = "advantage " + players.id_2.name;
          // }
        } else {
          if (!players.id_1.advantage && !players.id_2.advantage) {
            players["id_" + playerId].advantage = true;
            currentRoundScore = "advantage " + players["id_" + playerId].name;
          }
        }
      }

      if (
        players.id_1.roundScore === scoreSystem.length - 1 &&
        players.id_2.roundScore === scoreSystem.length - 1
      ) {
        if (players.id_1.advantage) {
          currentRoundScore = "advantage " + players.id_1.name;
        } else if (players.id_2.advantage) {
          currentRoundScore = "advantage " + players.id_2.name;
        }
      }
    }
  };
  const getCurrentRoundScore = () => {
    return currentRoundScore;
  };
  const resetScore = () => {
    players.id_1.roundScore = 0;
    players.id_2.roundScore = 0;
    players.id_1.advantage = false;
    players.id_2.advantage = false;
    currentRoundScore = "";
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
game.pointWonBy(1);
console.log(game.getCurrentRoundScore());

console.log(`The winner is ${game.getWinner()}`);

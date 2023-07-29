const listPlayers = [
  "Alberto Casero",
  "David Jiménez",
  "Javier de Miguel",
  "Eduardo Aguilar",
];
const scoreSystemDefault = [0, 15, 30, 40, "Ganas"];
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
    id_1: { name: player_1, roundScore: 0, gameScore: 0, matchScore: 0 },
    id_2: { name: player_2, roundScore: 0, gameScore: 0, matchScore: 0 },
  };

  const pointWonBy = (playerId) => {
    if (playerId === 1 || playerId === 2) {
      players["id_" + playerId].roundScore++;
    }
  };
  const getCurrentRoundScore = () => {
    console.log(players);
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
  const getWinner = () => {};
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
game.getCurrentRoundScore();

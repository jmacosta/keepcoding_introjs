const listPlayers = [
  "Alberto Casero",
  "David Jiménez",
  "Javier de Miguel",
  "Eduardo Aguilar",
];

const settingsDefault = {
  MAX_ROUND: 7,
  WIN_ROUND: 4,
  DIFERENCE_BETWEEN_ROUNDS: 2,
  SCORE_SYSTEM: [0, 15, 30, 40],
};

function createMatch(player_1, player_2, settings = settingsDefault) {
  let players = {
    id_1: {
      name: player_1,
      roundScore: 0,
      gameScore: 0,
      matchScore: 0,
      advantage: false,
      opponent: "id_2",
    },
    id_2: {
      name: player_2,
      roundScore: 0,
      gameScore: 0,
      matchScore: 0,
      advantage: false,
      opponent: "id_1",
    },
  };
  let winner = "";
  let currentRoundScore = "";
  const { SCORE_SYSTEM: scoreSystem } = settings;

  const pointWonBy = (playerId) => {
    if (playerId === 1 || playerId === 2) {
      players["id_" + playerId].roundScore++;
      // Score < 40 - 40
      if (players["id_" + playerId].roundScore < scoreSystem.length) {
        return (currentRoundScore = `${players.id_1.name} ${
          scoreSystem[players.id_1.roundScore]
        } - ${players.id_2.name} ${
          scoreSystem[players.id_2.roundScore]
        } la scores es ${players["id_" + playerId].roundScore}`);
      }
      if (
        players[players["id_" + playerId].opponent].roundScore ===
        scoreSystem.length - 1
      ) {
        return (currentRoundScore = "deuce");
      }
      if (
        players[players["id_" + playerId].opponent].roundScore <
        scoreSystem.length - 1
      ) {
        return winRoundScore(playerId);
      }

      // to do managment avantage of players

      // if (currentRoundScore == "deuce") {
      //   players["id_" + playerId].advantage = true;

      //   return (currentRoundScore = `Advantage ${
      //     players["id_" + playerId].name
      //   }`);
      // }
      // if (players["id_" + playerId].roundScore > scoreSystem.length - 1) {
      //   players["id_" + playerId].gameScore++;
      //   resetRoundScore();
      // }

      // if (players["id_" + playerId] > scoreSystem.length - 1)
      //   if (!players.id_1.advantage && !players.id_2.advantage) {
      //     players["id_" + playerId].advantage = true;
      //     currentRoundScore = `Advantage ${players["id_" + playerId].name}`;
      //   } else {
      //     if (!players["id_" + playerId].advantage) {
      //       //the opponent loose advantage
      //       players[players["id_" + playerId].opponent].advantage = false;
      //       // reset state to deuce
      //       players["id_" + playerId].roundScore--;
      //       players[players["id_" + playerId].opponent].roundScore--;
      //       currentRoundScore = "deuce";
      //     } else {
      //       // to do player win 4 or more rounds
      //       players["id_" + playerId].gameScore++;
      //       resetRoundScore();
      //     }
      //   }
    }
  };

  const getCurrentRoundScore = () => {
    return currentRoundScore;
  };
  const resetRoundScore = () => {
    players.id_1.roundScore = 0;
    players.id_2.roundScore = 0;
    players.id_1.advantage = false;
    players.id_2.advantage = false;
    currentRoundScore = "";
  };
  const resetGameScore = () => {
    players.id_1.gameScore = 0;
    players.id_2.gameScore = 0;
    resetRoundScore();
  };
  const winRoundScore = (playerId) => {
    players["id_" + playerId].gameScore++;
    resetRoundScore();
    return (currentRoundScore = `${
      players["id_" + playerId].name
    } win this round`);
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
  const debugPlayers = () => {
    console.log(players);
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
    debugPlayers,
  };
}

const game = createMatch(listPlayers[0], listPlayers[1]);
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // 15-0
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // 30-0
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // 40-0
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // Jugador A Gana Juego
console.log(game.getGameScore());
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // 0-15
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // 0-30
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // 0-40
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // 15-40
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // Jugador B gana
console.log(game.getGameScore());
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // 15-0
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // 30-0
game.pointWonBy(1);
console.log(game.getCurrentRoundScore()); // 40-0
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // 40-15
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // 40-30
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // deuce
game.pointWonBy(2);
console.log(game.getCurrentRoundScore()); // advantage 2
game.debugPlayers();

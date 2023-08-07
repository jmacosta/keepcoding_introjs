import { settingsDefault } from "./data.js";
export function createMatch(player_1, player_2, settings = settingsDefault) {
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
        if (isDeuce()) {
          return (currentRoundScore = "deuce");
        }
        currentRoundScore = `${players.id_1.name} ${
          scoreSystem[players.id_1.roundScore]
        } - ${players.id_2.name} ${
          scoreSystem[players.id_2.roundScore]
        } la scores es ${players["id_" + playerId].roundScore}`;
        return;
      }

      if (
        players[players["id_" + playerId].opponent].roundScore <
        scoreSystem.length - 1
      ) {
        return winRoundScore(playerId);
      }

      if (players["id_" + playerId].roundScore >= scoreSystem.length) {
        if (!players.id_1.advantage && !players.id_2.advantage) {
          players["id_" + playerId].advantage = true;
          currentRoundScore = `Advantage ${players["id_" + playerId].name}`;
          return;
        }
        if (!players["id_" + playerId].advantage) {
          //the opponent loose advantage
          players[players["id_" + playerId].opponent].advantage = false;
          // reset state to deuce
          players["id_" + playerId].roundScore--;
          players[players["id_" + playerId].opponent].roundScore--;
          currentRoundScore = "deuce";
          return;
        }
        if (players["id_" + playerId].advantage) {
          winRoundScore(playerId);
          return;
        }
      }
    }
  };

  const isDeuce = () => {
    return (
      players.id_1.roundScore === scoreSystem.length - 1 &&
      players.id_2.roundScore === scoreSystem.length - 1
    );
  };
  const resetRoundScore = () => {
    players.id_1.roundScore = 0;
    players.id_2.roundScore = 0;
    players.id_1.advantage = false;
    players.id_2.advantage = false;
    currentRoundScore = "";
    return;
  };
  const resetGameScore = () => {
    players.id_1.gameScore = 0;
    players.id_2.gameScore = 0;
    return;
  };
  const winRoundScore = (playerId) => {
    players["id_" + playerId].gameScore++;
    checkWinSet(playerId);
    resetRoundScore();
    currentRoundScore = `${players["id_" + playerId].name} win this round`;
    return;
  };
  const checkWinSet = (playerId) => {
    if (
      players["id_" + playerId].gameScore >= settings.MAX_GAMES_TO_WIN ||
      (players["id_" + playerId].gameScore >= settings.GAMES_TO_WIN_SET &&
        diferenceBetweenPlayers(playerId) >=
          settings.DIFERENCE_GAMES_BETWEEN_PLAYERS)
    ) {
      players["id_" + playerId].matchScore++;
      resetGameScore();
    }
    checkWinnerMatch(playerId);
  };
  const diferenceBetweenPlayers = (playerId) => {
    return (
      players["id_" + playerId].gameScore -
      players[players["id_" + playerId].opponent].gameScore
    );
  };
  const checkWinnerMatch = (playerId) => {
    if (players["id_" + playerId].matchScore >= settings.SET_TO_WIN_MATCH) {
      winner = players["id_" + playerId].name;
    }
  };
  const getCurrentRoundScore = () => {
    return currentRoundScore;
  };
  const getGameScore = () => {
    return `${players.id_1.name} ${players.id_1.gameScore}\n ${players.id_2.name} ${players.id_2.gameScore}`;
  };
  const getMatchScore = () => {
    return `${players.id_1.name} ${players.id_1.matchScore}\n ${players.id_2.name} ${players.id_2.matchScore}`;
  };
  const getWinner = () => {
    return winner;
  };
  const debugPlayers = () => {
    return console.log(players);
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

export const playOff = (listPlayers) => {
  const matchPlayers = [];
  for (let i = 0; i < listPlayers.length / 2; i++) {
    for (let j = 0; j < 2; j++) {
      const playerNumber = Math.floor(Math.random() * listPlayers.length);
      if (
        !matchPlayers.find((element) => element === listPlayers[playerNumber])
      ) {
        matchPlayers.push(listPlayers[playerNumber]);
      } else {
        j--;
      }
    }
  }
  return matchPlayers;
};

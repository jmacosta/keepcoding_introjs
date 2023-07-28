function createMatch(player_1, player_2) {
  let players = [
    { id: 1, name: player_1, score: 0 },
    { id: 2, name: player_2, score: 0 },
  ];
  const pointWonBy = (playerId) => {
    if (playerId === 1 || playerId === 2) {
      // haz algo
    }
  };
  const getCurrentRoundScore = () => {};
  const getGameScore = () => {};
  const getMatchScore = () => {};
  const getWinner = () => {};
  return {
    pointWonBy,
    getCurrentRoundScore,
    getGameScore,
    getMatchScore,
    getWinner,
  };
}

import { listPlayers } from "./modules/data.js";
import { createMatch, playOff } from "./modules/functions.js";

const pairing = playOff(listPlayers);
const game = createMatch(pairing[0], pairing[1]);
game.debugPlayers();

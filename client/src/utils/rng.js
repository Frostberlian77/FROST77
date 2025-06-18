const seedrandom = require('seedrandom');
const rng = seedrandom('frost77_seed', { entropy: true });

const getRandomSymbol = (symbols) => symbols[Math.floor(rng() * symbols.length)];

export { getRandomSymbol };

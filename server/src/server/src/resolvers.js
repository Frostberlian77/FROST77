const User = require('./models/User');
const { getRandomSymbol } = require('./utils/rng');
const tf = require('@tensorflow/tfjs-node');

module.exports = {
  Query: {
    leaderboard: async () => await User.find().sort({ wins: -1 }).limit(10),
    user: async (_, __, { user }) => await User.findById(user?.id)
  },
  Mutation: {
    updateStats: async (_, { coins, wins }, { user }) => {
      await User.updateOne({ _id: user.id }, { coins, wins });
      return true;
    },
    claimBonus: async (_, __, { user }) => {
      const u = await User.findById(user.id);
      const now = new Date();
      if (u.lastBonus && now - new Date(u.lastBonus) < 24 * 60 * 60 * 1000) {
        throw new Error('Bonus sudah diklaim!');
      }
      const bonus = 100;
      u.coins = parseInt(decrypt({ iv: Buffer.from('frost77_iv').toString('hex'), encryptedData: u.coins })) + bonus;
      u.lastBonus = now;
      await u.save();
      return bonus;
    },
    recommendTheme: async (_, __, { user }) => {
      const u = await User.findById(user.id);
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 3, inputShape: [1] }));
      model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
      const wins = tf.tensor2d([[u.wins]]);
      const themes = ['arctic', 'cyberpunk', 'mythical'];
      const prediction = model.predict(wins).dataSync();
      return themes[Math.floor(prediction[0] % 3)];
    },
    spin: async (_, { bet }, { user }) => {
      const symbols = ['ice_cherry', 'cyber_lemon', 'frost_seven', 'snow_bar', 'wild'];
      const result = symbols.map(() => getRandomSymbol(symbols));
      const win = (result[0] === result[1] && result[1] === result[2]) || result.includes('wild');
      return { result, win };
    }
  }
};

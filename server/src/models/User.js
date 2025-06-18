const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/crypto');

const UserSchema = new mongoose.Schema({
  username: String,
  coins: { type: String, default: encrypt('1000').encryptedData },
  wins: { type: String, default: encrypt('0').encryptedData },
  lastBonus: Date,
  playHistory: [Number]
});

UserSchema.pre('save', function(next) {
  this.coins = encrypt(this.coins.toString()).encryptedData;
  this.wins = encrypt(this.wins.toString()).encryptedData;
  next();
});

UserSchema.post('find', function(docs) {
  docs.forEach(doc => {
    doc.coins = parseInt(decrypt({ iv: doc.iv || Buffer.from('frost77_iv').toString('hex'), encryptedData: doc.coins }));
    doc.wins = parseInt(decrypt({ iv: doc.iv || Buffer.from('frost77_iv').toString('hex'), encryptedData: doc.wins }));
  });
});

module.exports = mongoose.model('User', UserSchema);

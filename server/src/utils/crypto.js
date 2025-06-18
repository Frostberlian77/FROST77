const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY || 'frost77key32byteslong1234567890ab', 'utf8');
const iv = Buffer.from('frost77iv16bytes', 'utf8');

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
};

const decrypt = (data) => {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(data.iv, 'hex'));
  let decrypted = decipher.update(data.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encrypt, decrypt };

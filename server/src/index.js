const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const dotenv = require('dotenv');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

dotenv.config();
const app = express();
app.use(express.json());

// Session untuk Keycloak
app.use(session({ secret: 'frost77_secret', resave: false, saveUninitialized: true }));
const kc = new Keycloak({ store: new session.MemoryStore() }, {
  realm: 'frost77',
  'auth-server-url': process.env.KEYCLOAK_URL,
  'ssl-required': 'external',
  resource: 'frost77-app',
  'public-client': true,
  'confidential-port': 0
});
app.use(kc.middleware());

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Server Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return {};
    try {
      return { user: jwt.verify(token, process.env.JWT_SECRET) };
    } catch (e) {
      return {};
    }
  }
});
server.applyMiddleware({ app });

// Route Keycloak
app.get('/login', kc.protect(), (req, res) => {
  const token = req.kauth.grant.access_token.token;
  res.json({ token });
});

app.listen(4000, () => console.log('Server berjalan di http://localhost:4000/graphql'));

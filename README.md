frost77/
├── client/                         # Frontend (React.js, Three.js)
│   ├── src/
│   │   ├── components/
│   │   │   ├── SlotMachine.jsx   # Komponen slot 3D
│   │   │   └── Leaderboard.jsx   # Komponen papan peringkat
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   ├── arctic/       # Tema Arctic
│   │   │   │   │   ├── ice_cherry.glb
│   │   │   │   │   ├── cyber_lemon.glb
│   │   │   │   │   └── frost_seven.glb
│   │   │   │   ├── cyberpunk/
│   │   │   │   └── mythical/
│   │   │   └── sounds/
│   │   │       ├── spin.mp3
│   │   │       └── win.mp3
│   │   ├── App.jsx               # Komponen utama
│   │   ├── index.js              # Entry point
│   │   ├── styles.css            # Styling Tailwind
│   │   └── utils/
│   │       └── rng.js            # RNG client-side
│   ├── package.json
│   ├── tailwind.config.js
│   └── vercel.json
├── server/                         # Backend (Node.js, GraphQL)
│   ├── src/
│   │   ├── models/
│   │   │   └── User.js         # Model MongoDB
│   │   ├── utils/
│   │   │   ├── crypto.js       # Enkripsi AES-256
│   │   │   └── rng.js          # RNG Mersenne Twister
│   │   ├── schema.js           # Skema GraphQL
│   │   ├── resolvers.js        # Resolver GraphQL
│   │   └── index.js            # Server utama
│   ├── package.json
│   └── .env
├── README.md
└── setup-guide.md              # File tambahan: Panduan setup

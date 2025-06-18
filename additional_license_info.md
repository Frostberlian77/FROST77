---

### Script yang Disempurnakan
Berikut adalah file yang diperbarui dan ditambahkan untuk memastikan semua fitur FROST77 berfungsi dengan baik.

#### 1. **client/src/App.jsx**
```jsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SlotMachine from './components/SlotMachine';
import Leaderboard from './components/Leaderboard';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [coins, setCoins] = useState(1000);
  const [wins, setWins] = useState(0);
  const [result, setResult] = useState('Putar untuk mulai!');
  const [theme, setTheme] = useState('arctic');

  useEffect(() => {
    const recommendTheme = async () => {
      const { data } = await axios.post('/api/recommend-theme', { wins });
      setTheme(data.recommendedTheme);
    };
    recommendTheme();
  }, [wins]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-iceBlue to-black text-white font-orbitron">
      <div className="snow"></div>
      <h1 className="text-center text-4xl pt-6">FROST77 🎰</h1>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between mb-4">
          <span>Koin: {coins}</span>
          <span>Kemenangan: {wins}</span>
          <select onChange={(e) => setTheme(e.target.value)} className="bg-iceBlue text-white p-2 rounded">
            <option value="arctic">Arctic</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="mythical">Mythical Ice</option>
          </select>
        </div>
        <Canvas style={{ height: '300px' }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <SlotMachine theme={theme} coins={coins} setCoins={setCoins} setWins={setWins} setResult={setResult} />
          <OrbitControls />
        </Canvas>
        <div className="text-center text-xl mb-4">{result}</div>
        <div className="flex justify-center gap-4">
          <button className="frost-button" onClick={() => document.getElementById('spin').click()}>
            Putar
          </button>
          <button className="frost-button" onClick={() => document.getElementById('autoSpin').click()}>
            Putar Otomatis
          </button>
          <button className="frost-button" onClick={async () => {
            const { data } = await axios.post('/api/claim-bonus');
            setCoins(coins + data.bonus);
            setResult(`Bonus harian ${data.bonus} koin!`);
          }}>
            Klaim Bonus
          </button>
          <button className="frost-button" onClick={() => window.location.href = '/login'}>
            Login
          </button>
        </div>
        <Leaderboard />
      </div>
    </div>
  );
};

export default App;

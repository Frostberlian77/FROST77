import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import axios from 'axios';
import { getRandomSymbol } from '../utils/rng';

const SlotMachine = ({ theme, coins, setCoins, setWins, setResult }) => {
  const symbols = ['ice_cherry', 'cyber_lemon', 'frost_seven', 'snow_bar', 'wild'];
  const reels = [useRef(), useRef(), useRef()];
  const models = symbols.map(sym => useGLTF(`/assets/images/${theme}/${sym}.glb`));

  const spin = async () => {
    const spinSound = new Audio('/assets/sounds/spin.mp3');
    spinSound.play();
    if (coins < 10) {
      setResult('Koin tidak cukup!');
      return;
    }
    setCoins(coins - 10);

    const { data } = await axios.post('/api/spin', { bet: 10 });
    const result = data.result;

    reels.forEach((reel, i) => {
      reel.current.rotation.y += Math.PI * 10;
      setTimeout(() => {
        reel.current.geometry = models[symbols.indexOf(result[i])].nodes.default.geometry;
      }, (i + 1) * 500);
    });

    setTimeout(async () => {
      if (data.win) {
        const winSound = new Audio('/assets/sounds/win.mp3');
        winSound.play();
        const winAmount = 100;
        setCoins(coins + winAmount - 10);
        setWins(wins + winAmount);
        setResult(`Jackpot! +${winAmount} koin!`);
        await axios.post('/api/update-stats', { coins: coins + winAmount - 10, wins: wins + winAmount }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        setResult('Coba lagi!');
      }
    }, 2000);
  };

  useFrame(() => {
    reels.forEach(reel => {
      if (reel.current.rotation.y > 0) reel.current.rotation.y -= 0.1;
    });
  });

  return (
    <>
      {reels.map((reel, i) => (
        <mesh ref={reel} position={[i * 2 - 2, 0, 0]} key={i}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial map={models[0].materials.default} />
        </mesh>
      ))}
      <mesh visible={false} id="spin" onClick={spin} />
      <mesh visible={false} id="autoSpin" onClick={() => {
        const interval = setInterval(spin, 2500);
        setTimeout(() => clearInterval(interval), 10000);
      }} />
    </>
  );
};

symbols.forEach(sym => useGLTF.preload(`/assets/images/arctic/${sym}.glb`));
export default SlotMachine;

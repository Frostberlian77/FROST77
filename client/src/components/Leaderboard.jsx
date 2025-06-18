import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard').then(({ data }) => setLeaders(data));
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-2xl">Leaderboard Global</h3>
      <ul className="space-y-2">
        {leaders.map(player => (
          <li key={player._id} className="bg-iceBlue bg-opacity-50 p-2 rounded">
            {player.username}: {player.wins} koin
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

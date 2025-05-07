// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProgressPage from './ProgressPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/


function App() {
  const [score, setScore] = useState('');
  const [log, setLog] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hungry-log')) || [];
    setLog(stored);
  }, []);

  const handleSubmit = () => {
    if (score === '') return;
    const newLog = [...log, { score, date: new Date().toLocaleString() }];
    setLog(newLog);
    localStorage.setItem('hungry-log', JSON.stringify(newLog));
    setScore('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>空腹スコア・アプリ</h1>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="スコアを入力"
      />
      <button onClick={handleSubmit}>記録</button>
      <ul>
        {log.map((entry, idx) => (
          <li key={idx}>
            {entry.date} - スコア: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

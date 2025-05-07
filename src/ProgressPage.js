import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProgressPage() {
  const [scores, setScores] = useState([]);
  const [monthlyGoal, setMonthlyGoal] = useState(300);

  useEffect(() => {
    const saved = localStorage.getItem("scores");
    const savedGoal = localStorage.getItem("monthlyGoal") || localStorage.getItem("goal");
    if (saved) setScores(JSON.parse(saved));
    if (savedGoal) setMonthlyGoal(Number(savedGoal));
  }, []);

  const thisMonth = new Date()
    .toLocaleDateString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
    })
    .slice(0, 7);

  const monthlyTotal = scores
    .filter((entry) => entry.date.startsWith(thisMonth))
    .reduce((sum, entry) => sum + entry.score, 0);

  const progress = monthlyGoal > 0 ? Math.min(monthlyTotal / monthlyGoal, 1) : 0;

  const pieData = [
    { name: "達成", value: progress },
    { name: "残り", value: 1 - progress },
  ];

  const COLORS = ["#FFA500", "#eeeeee"];

  const dailyTotals = Object.values(
    scores.reduce((acc, { date, score }) => {
      if (!acc[date]) acc[date] = { date, total: 0 };
      acc[date].total += score;
      return acc;
    }, {})
  );

  return (
    <div style={{ padding: "5vw", maxWidth: "90vw", margin: "auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "6vw" }}>📊 月間進捗</h1>

      <PieChart width={200} height={200}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={90}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          isAnimationActive={true}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>

      <p style={{ fontSize: "4vw" }}>今月の達成率: {(progress * 100).toFixed(1)}%</p>
      <p style={{ fontSize: "4vw" }}>あと {monthlyGoal - monthlyTotal} 点で目標達成！</p>

      <h2 style={{ fontSize: "5vw", marginTop: "20px" }}>日別スコア推移</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={dailyTotals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

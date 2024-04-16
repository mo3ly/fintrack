"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Feb",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Mar",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Apr",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "May",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Jun",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Jul",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Aug",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Sep",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Oct",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Nov",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
  {
    name: "Dec",
    // total: Math.floor(Math.random() * 5000) + 1000,
    total: 0,
  },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `ج.م ${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

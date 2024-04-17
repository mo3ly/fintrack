"use client";
import { useIsRTL } from "@/lib/hooks/useIsRTL";
import { formatCurrency } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface RevenueExpensesChartProps {
  totalRevenues: number;
  totalExpenses: number;
  currency: string | undefined;
}

const RevenueExpensesChart: React.FC<RevenueExpensesChartProps> = ({
  totalRevenues,
  totalExpenses,
  currency,
}) => {
  const data: ChartData[] = [
    { name: "Revenues", value: totalRevenues, color: "#13f999" },
    { name: "Expenses", value: totalExpenses, color: "#eb133b" },
  ];
  const isRTL = useIsRTL();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          labelLine={false}
          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          stroke="1"
          // fill="#8884d8"
          dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          wrapperClassName="!rounded-lg  dark:!bg-white !border-none !text-xs !py-2 !px-3 "
          labelClassName="!text-xs !text-white"
          formatter={(value: number) => [
            `${formatCurrency(value, currency, isRTL)}`,
          ]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RevenueExpensesChart;

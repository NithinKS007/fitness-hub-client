import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

interface ReusableLineChartProps {
  data: any[];
  lines: { dataKey: string; stroke: string }[];
  xAxisKey: string;
  yAxisValue?: string;
}

const ReusableLineChart: React.FC<ReusableLineChartProps> = ({
  data,
  lines,
  xAxisKey,
  yAxisValue,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3"  />
        <XAxis dataKey={xAxisKey} />
        {yAxisValue ? (
          <YAxis
            label={{
              value: yAxisValue,
              angle: -90,
              position: "insideLeft",
              textAnchor: "middle",
              style: { textAnchor: "middle" },
            }}
          />
        ) : (
          <YAxis />
        )}
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            strokeWidth={2}
            dot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReusableLineChart;

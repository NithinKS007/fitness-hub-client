import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ReusablePieChartProps {
  data: any[];
  dataKey: string;
  outerRadius: string;
  fill: string;
  labelLine: boolean;
}

const ReusablePieChart: React.FC<ReusablePieChartProps> = ({
  data,
  dataKey,
  outerRadius,
  fill,
  labelLine,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          outerRadius={outerRadius}
          fill={fill}
          labelLine={labelLine}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ReusablePieChart;

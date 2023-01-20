
import {
  LineChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

// Sample chart data

export function Exemple1({ data }) {
  return (
    <>
      <h3 className="text-heading">
        Variação Preço Médio {data[0].Modelo}
      </h3>
        <small>{data[0].Marca}</small>

      <br></br>
      <ResponsiveContainer width="100%" aspect={4}>
        <LineChart data={data} margin={{ right: 300 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="MesReferencia"
            interval={'preserveStartEnd'} />
          <YAxis ></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="Valor" strokeWidth={3} type="monotone"
            stroke="#8884d8" activeDot={{ r: 8 }} />

        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

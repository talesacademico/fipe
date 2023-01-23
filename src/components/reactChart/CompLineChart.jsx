
import {
  LineChart,
  AreaChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import {TamplateGrafic} from "./styled"

// Sample chart data

function adapterDate(data){
  let [month,, year] = data.split(' ')
  return `${month}/${year}`
}
export function Exemple1({ data }) {
  return (
    <>
    <TamplateGrafic>
    <nav>
      <h3 className="text-heading">
        Variação Preço Médio {data[0].Modelo}
      </h3>
        <small>{data[0].Marca}</small>
      <br></br>
    </nav>

      <ResponsiveContainer width="100%" minHeight={300}>
        <AreaChart data={data}>

          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={2}/>
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="MesReferencia" aria-placeholder='ok'
            interval={'preserveStartEnd'}
            tickFormatter={(value)=>adapterDate(value)
            }
            stroke="#ccc"
            axisLine={false}
            tickLine={false}
            tickCount={4}
            />
          <YAxis tickFormatter={(value)=> `${value} Mil`}
              axisLine={false}
              tickLine={false}
            stroke="#ccc"

          >
          </YAxis>
          <Legend />
          <Tooltip />
          <Area dataKey="Valor" strokeWidth={3} type="monotone"
            stroke="#2451B7" activeDot={{ r: 8 }} fill="url(#color)" 

            
            />

        </AreaChart>
      </ResponsiveContainer>
    </TamplateGrafic>


    </>
  );
}

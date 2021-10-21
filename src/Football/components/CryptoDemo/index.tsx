import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import axiosInstance from 'axios';
import Chart from './Chart';

interface Props {
  data: any[];
}

const CryptoDemo = (props: Props) => {
  const [estao, setEstao] = useState(null as any);
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    const getit = async () => {
      const hh = await axiosInstance.get(
        'https://localhost:44300/weatherforecast'
      );

      const items = (hh as any).data.content.items.map((x: any) => ({
        name: new Date(x.item1).getTime(),
        pv: x.item2,
        uv: 0,
        amt: 2,
      }));

      const candles = (hh as any).data.content.candles.map((x: any) => ({
        high: x.max,
        low: x.min,
        open: x.items[0],
        close: x.items[x.items.length - 1],
        ts: new Date(x.startTime).getTime(),
        avg: x.mobileAvg1 > 0 ? x.mobileAvg1 : x.items[0],
      }));
      const fulobj = { items: items, candles: candles };

      setEstao(fulobj);
    };

    getit();
  }, []);

  if (estao) {
    const minValue = Math.min(...estao.items);
    const maxValue = Math.max(...estao.items);

    return (
      <div style={{ height: '900px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={300}
            data={estao.items}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis domain={[minValue, maxValue]} />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='pv'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
            {/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
          </LineChart>
        </ResponsiveContainer>
        <Chart candleData={estao.candles} />
      </div>
    );
  }
  return <div></div>;
};

export default CryptoDemo;

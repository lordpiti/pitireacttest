import React, { useEffect, useState } from 'react';
// import {
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';
import axiosInstance from 'axios';
import Chart from './Chart';
import moment from 'moment';

interface Props {
  data: any[];
}

const CryptoDemo = (props: Props) => {
  const [estao, setEstao] = useState(null as any);
  const [currentSymbol, setCurrentSymbol] = useState('BTCUSDT');
  const [symbols, setSymbols] = useState([] as string[]);

  const getData = async (symbol: string) => {
    setCurrentSymbol(symbol);
    const response = await axiosInstance.get(
      `https://localhost:44300/api/trading/klines/${symbol}`
    );

    // const items = (hh as any).data.items.map((x: any) => ({
    //   name: new Date(x.item1).getTime(),
    //   pv: x.item2,
    //   uv: 0,
    //   amt: 2,
    // }));

    // debugger;
    // const yy = moment('24/12/2019 09:15:00', 'DD MM YYYY hh:mm:ss').format(
    //   'YYYY-MM-DD'
    // );

    const candles = (response as any).data.candles.map(
      (x: any, index: number) => ({
        high: x.high,
        low: x.low,
        open: x.open,
        close: x.close,
        ts: moment(new Date(x.date)).format('D/M/yyyy hh:mm'),
        ema: (response as any).data.emaList[index].ema,
        ema2: (response as any).data.emaList2[index].ema,
      })
    );

    const emaList = (response as any).data.emaList.map((x: any) => ({
      high: x.high,
      low: x.low,
      open: x.open,
      close: x.close,
      ts: new Date(x.date).getTime(),
    }));
    const fulobj = { items: emaList, candles: candles };

    setEstao(fulobj);
  };

  useEffect(() => {
    getData(currentSymbol);
  }, [currentSymbol]);

  useEffect(() => {
    (async () => {
      const responseSymbols = await axiosInstance.get(
        'https://localhost:44300/api/trading/symbols/USDT'
      );

      const loadedSymbols = (responseSymbols as any).data.symbols;
      setSymbols(loadedSymbols);
    })();
  }, []);

  if (estao) {
    // const minValue = Math.min(...estao.items);
    // const maxValue = Math.max(...estao.items);

    return (
      <div style={{ height: '900px' }}>
        {/* <ResponsiveContainer width='100%' height='100%'>
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
          </LineChart>
        </ResponsiveContainer> */}
        <Chart
          currentSymbol={currentSymbol}
          candleData={estao.candles}
          updateDataCallback={setCurrentSymbol}
          symbols={symbols}
        />
      </div>
    );
  }
  return <div></div>;
};

export default CryptoDemo;

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
import moment from 'moment';

interface Props {
  data: any[];
}

const CryptoDemo = (props: Props) => {
  const [estao, setEstao] = useState(null as any);
  const [currentSymbol, setCurrentSymbol] = useState('BTCUSDT');
  const [currentKlinesInterval, setCurrentKlinesInterval] = useState(5);
  const [symbols, setSymbols] = useState([] as string[]);

  const getData = async (symbol: string, klinesInterval: number) => {
    setCurrentSymbol(symbol);
    setCurrentKlinesInterval(klinesInterval);
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_TRADING_API_URL}/api/trading/klines/${symbol}/interval/${klinesInterval}`
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

    const fulobj = {
      items: emaList,
      candles: candles,
      macd: (response as any).data.macd,
    };

    setEstao(fulobj);
  };

  useEffect(() => {
    getData(currentSymbol, currentKlinesInterval);
  }, [currentSymbol, currentKlinesInterval]);

  useEffect(() => {
    (async () => {
      const responseSymbols = await axiosInstance.get(
        `${process.env.REACT_APP_TRADING_API_URL}/api/trading/symbols/USDT`
      );

      const loadedSymbols = (responseSymbols as any).data.symbols;
      setSymbols(loadedSymbols);
    })();
  }, []);

  if (estao) {
    const minValueMacd = Math.min(...estao.macd.map((x: any) => x.macd));
    const maxValueMacd = Math.max(...estao.macd.map((x: any) => x.macd));

    const minValueSignal = Math.min(...estao.macd.map((x: any) => x.signal));
    const maxValueSignal = Math.max(...estao.macd.map((x: any) => x.signal));

    debugger;
    return (
      <div style={{ height: '900px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={300}
            data={estao.macd}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis
              domain={[
                Math.floor(Math.min(minValueMacd, minValueSignal)),
                Math.ceil(Math.max(maxValueMacd, maxValueSignal)),
              ]}
            />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='macd'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
            <Line
              type='monotone'
              dataKey='signal'
              stroke='#e28743'
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <Chart
          currentSymbol={currentSymbol}
          currentKlinesInterval={currentKlinesInterval}
          candleData={estao.candles}
          updateDataCallback={setCurrentSymbol}
          updateDataIntervalCallback={setCurrentKlinesInterval}
          symbols={symbols}
        />
      </div>
    );
  }
  return <div></div>;
};

export default CryptoDemo;

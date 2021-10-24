import React from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  ComposedChart,
  Tooltip,
  Legend,
} from 'recharts';

const colors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
];

const intervals = [
  { name: '1 min', value: 0 },
  { name: '3 min', value: 1 },
  { name: '5 min', value: 2 },
  { name: '15 min', value: 3 },
  { name: '30 min', value: 4 },
  { name: '1 hour', value: 5 },
  { name: '2 hours', value: 6 },
  { name: '4 hours', value: 7 },
  { name: '6 hours', value: 8 },
  { name: '8 hours', value: 9 },
  { name: '12 hours', value: 10 },
  { name: '1 day', value: 11 },
  { name: '3 days', value: 12 },
  { name: '1 week', value: 13 },
];

const Candlestick = (props: any) => {
  const {
    //fill,
    x,
    y,
    width,
    height,
    low,
    high,
    openClose: [open, close],
  } = props;
  const isGrowing = open < close;
  const color = isGrowing ? 'green' : 'red';
  const ratio = Math.abs(height / (open - close));

  return (
    <g stroke={color} fill='none' strokeWidth='2'>
      <path
        d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
      />
      {/* bottom line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - low) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - low) * ratio}
          `}
        />
      )}
      {/* top line */}
      {isGrowing ? (
        <path
          d={`
            M ${x + width / 2}, ${y}
            v ${(close - high) * ratio}
          `}
        />
      ) : (
        <path
          d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - high) * ratio}
          `}
        />
      )}
    </g>
  );
};

const prepareData = (data: any) => {
  return data.map(({ open, close, ...other }: { open: any; close: any }) => {
    return {
      ...other,
      openClose: [open, close],
    };
  });
};

const CustomShapeBarChart = ({
  candleData,
  updateDataCallback,
  updateDataIntervalCallback,
  symbols,
  currentSymbol,
  currentKlinesInterval,
}: any) => {
  const data = prepareData(candleData);

  const minValue = data.reduce(
    (
      minValue: any,
      { low, openClose: [open, close] }: { low: any; openClose: any }
    ) => {
      const currentMin = Math.min(low, open, close);
      return minValue === null || currentMin < minValue ? currentMin : minValue;
    },
    null
  );
  const maxValue = data.reduce(
    (
      maxValue: any,
      { high, openClose: [open, close] }: { high: any; openClose: any }
    ) => {
      const currentMax = Math.max(high, open, close);
      return currentMax > maxValue ? currentMax : maxValue;
    },
    minValue
  );

  return (
    <div style={{ height: '900px' }}>
      <div>
        <span>QuoteAsset</span>
        <select
          name='symbol'
          value={currentSymbol}
          onChange={(event: any) => {
            updateDataCallback(event.target.value);
          }}
        >
          {symbols.map((item: string) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <span>Interval</span>
        <select
          name='interval'
          value={currentKlinesInterval}
          onChange={(event: any) => {
            updateDataIntervalCallback(event.target.value);
          }}
        >
          {intervals.map((item: any) => (
            <option value={item.value}>{item.name}</option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          // width={600}
          height={300}
          data={data}
          // barCategoryGap={0}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey='ts' />
          <YAxis domain={[minValue, maxValue]} />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar
            name='Klines'
            dataKey='openClose'
            fill='#8884d8'
            shape={<Candlestick />}
            // label={{ position: 'top' }}
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
          <Tooltip />
          <Legend />
          <Line
            name='Exponential Moving Average 55'
            type='monotone'
            dataKey='ema'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />

          <Line
            name='Exponential Moving Average 10'
            type='monotone'
            dataKey='ema2'
            stroke='#e28743'
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomShapeBarChart;

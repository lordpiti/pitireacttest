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

// const rawData1 = [
//   {
//     high: 100,
//     low: 0,
//     open: 40,
//     close: 60,
//     ts: 1562791020,
//   },
//   {
//     high: 100,
//     low: 0,
//     open: 60,
//     close: 40,
//     ts: 1562792020,
//   },
//   {
//     high: 70,
//     low: 20,
//     open: 25,
//     close: 50,
//     ts: 1562793020,
//   },
// ];

const rawData = [
  {
    high: 7.18811,
    low: 7.18127,
    open: 7.18631,
    close: 7.183,
    ts: 1562790720,
  },
  {
    high: 7.21184,
    low: 7.20139,
    open: 7.20139,
    close: 7.21138,
    ts: 1562790780,
  },
  {
    high: 7.21808,
    low: 7.21524,
    open: 7.2168,
    close: 7.21675,
    ts: 1562790840,
  },
  {
    high: 7.19661,
    low: 7.19343,
    open: 7.19633,
    close: 7.1936,
    ts: 1562790900,
  },
  {
    high: 7.18131,
    low: 7.17473,
    open: 7.17819,
    close: 7.18131,
    ts: 1562790960,
  },
  {
    high: 7.17874,
    low: 7.17475,
    open: 7.17874,
    close: 7.17604,
    ts: 1562791020,
  },
  {
    high: 7.19077,
    low: 7.18493,
    open: 7.18684,
    close: 7.19077,
    ts: 1562791080,
  },
  {
    high: 7.1837,
    low: 7.17899,
    open: 7.1792,
    close: 7.18246,
    ts: 1562791140,
  },
  {
    high: 7.18788,
    low: 7.18098,
    open: 7.18338,
    close: 7.18788,
    ts: 1562791200,
  },
  {
    high: 7.20103,
    low: 7.19715,
    open: 7.19778,
    close: 7.19715,
    ts: 1562791260,
  },
  {
    high: 7.21353,
    low: 7.20752,
    open: 7.20873,
    close: 7.21116,
    ts: 1562791320,
  },
];

// const rawData3 = [
//   {
//     high: 11808.494,
//     low: 11775.101,
//     open: 11790.496,
//     close: 11808.089,
//     ts: 1562791020,
//   },
//   {
//     high: 11846.242,
//     low: 11802.6,
//     open: 11821.585,
//     close: 11843.063,
//     ts: 1562791080,
//   },
//   {
//     high: 11829.147,
//     low: 11803.613,
//     open: 11803.613,
//     close: 11827.385,
//     ts: 1562791140,
//   },
//   {
//     high: 11814.498,
//     low: 11802.755,
//     open: 11814.498,
//     close: 11803.577,
//     ts: 1562791200,
//   },
//   {
//     high: 11829.527,
//     low: 11807.739,
//     open: 11809.03,
//     close: 11829.527,
//     ts: 1562791260,
//   },
//   {
//     high: 11855.419,
//     low: 11825.036,
//     open: 11830.531,
//     close: 11835.936,
//     ts: 1562791320,
//   },
//   {
//     high: 11811.733,
//     low: 11774.447,
//     open: 11803.679,
//     close: 11783.754,
//     ts: 1562791380,
//   },
//   {
//     high: 11790.889,
//     low: 11770.107,
//     open: 11789.994,
//     close: 11787.824,
//     ts: 1562791440,
//   },
//   {
//     high: 11794.769,
//     low: 11757.06,
//     open: 11794.769,
//     close: 11775.199,
//     ts: 1562791500,
//   },
//   {
//     high: 11759.249,
//     low: 11732.995,
//     open: 11759.249,
//     close: 11735.828,
//     ts: 1562791560,
//   },
//   {
//     high: 11734.435,
//     low: 11720.716,
//     open: 11721.952,
//     close: 11722.716,
//     ts: 1562791620,
//   },
// ];

const Candlestick = (props: any) => {
  debugger;
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
  console.log(props);
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

const CustomShapeBarChart = ({ candleData }: any) => {
  const data = prepareData(candleData);
  data.reduce((acc: any, item: any) => console.log(item), 0);
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

  console.log(data);
  console.log(minValue, maxValue);

  return (
    <div style={{ height: '900px' }}>
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
          <Line
            type='monotone'
            dataKey='ema'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />

          <Line
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

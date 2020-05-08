import { scaleLinear, interpolateHcl } from 'd3';

export const backgroundColor = scaleLinear<string>()
  .domain([0, 1])
  .range(['#F3E8F4', '#C58CCA'])
  .interpolate(interpolateHcl);

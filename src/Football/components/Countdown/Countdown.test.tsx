import React from 'react';
import Countdown from './Countdown';
import { shallow } from 'enzyme';

describe('<Countdown /> with all data', () => {
  it(`should render correctly`, () => {
    const date = '2019-04-04';
    const metricsPanel = shallow(<Countdown date={date} />);
    expect(metricsPanel).toMatchSnapshot();
  });
});

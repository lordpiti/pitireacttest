import React from 'react';
import Countdown from './Countdown';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

describe('<Countdown /> with all data', () => {
  it(`should render correctly`, () => {
    //configure({ adapter: new Adapter() });
    const date = '2019-04-04';
    const metricsPanel = shallow(<Countdown date={date} />);
    expect(metricsPanel).toMatchSnapshot();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import Countdown from './Countdown';

describe('<MatchPlayerSingle /> with all data', () => {
	it('renders correctly a player component with the right data', () => {

		const date = '2019-04-04';
		const tree = renderer.create(<Countdown date={date} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
})
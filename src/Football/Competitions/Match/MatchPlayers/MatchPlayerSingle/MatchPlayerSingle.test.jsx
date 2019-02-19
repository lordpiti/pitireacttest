import React from 'react';
import renderer from 'react-test-renderer';

import MatchPlayerSingle from './MatchPlayerSingle';

describe('<MatchPlayerSingle /> with all data', () => {
    it('renders correctly a player component with the right data', () => {
        const playerData = {
            name: 'test name',
            surname: 'test surname',
            dorsal: 9,
            bookings: [{
                type: 'Amarilla',
                minute: 10
            }],
            goals: [{
                minute: 76
            }],
            substitutionIn: {
                minute: 9
            },
            substitutionOut: {
                minute: 19
            },
        };
      const tree = renderer.create(<MatchPlayerSingle player={playerData} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
})
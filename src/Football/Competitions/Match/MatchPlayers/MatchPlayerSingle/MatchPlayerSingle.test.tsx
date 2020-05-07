import React from 'react';

import MatchPlayerSingle, { PlayerMatchSingle } from './MatchPlayerSingle';
import { shallow } from 'enzyme';

describe('MatchPlayerSingle', () => {
  it('renders correctly a player component with the right data', () => {
    const playerData = {
      name: 'test name',
      surname: 'test surname',
      dorsal: '9',
      bookings: [
        {
          type: 'Amarilla',
          minute: 10,
        },
      ],
      goals: [
        {
          minute: 76,
        },
      ],
      substitutionIn: {
        minute: 9,
      },
      substitutionOut: {
        minute: 19,
      },
    } as PlayerMatchSingle;
    const tree = shallow(<MatchPlayerSingle player={playerData} />);
    expect(tree).toMatchSnapshot();
  });
});

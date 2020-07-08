import React from 'react';
import { shallow } from 'enzyme';
import MatchPlayers from './MatchPlayers';
import MatchPlayerSingle from './MatchPlayerSingle/MatchPlayerSingle';

describe('<MatchPlayers />', () => {
  it('should render two MatchPlayerSingle items', () => {
    const playerList = [
      { playerId: 1, teamId: 1, start: true },
      { playerId: 2, teamId: 1, start: false },
    ];
    const team = { id: 1 };
    const wrapper = shallow(
      <MatchPlayers team={team} matchPlayers={playerList} />
    );
    expect(wrapper.find(MatchPlayerSingle)).toHaveLength(2);
  });
});

describe('renders the snapshot', () => {
  it('should render one MatchPlayerSingle', () => {
    const playerList = [
      { playerId: 1, teamId: 1, start: true },
      { playerId: 2, teamId: 1, start: false },
    ];
    const team = { id: 1 };

    const tree = shallow(
      <MatchPlayers team={team} matchPlayers={playerList} />
    );

    expect(tree).toMatchSnapshot();
  });
});

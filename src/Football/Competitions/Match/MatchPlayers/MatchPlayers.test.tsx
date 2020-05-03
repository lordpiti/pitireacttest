import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MatchPlayers from './MatchPlayers';
import MatchPlayerSingle from './MatchPlayerSingle/MatchPlayerSingle';
import ShallowRenderer from 'react-test-renderer/shallow';

configure({ adapter: new Adapter() });

describe('<MatchPlayers />', () => {

  it('should render one MatchPlayerSingle item', () => {
    const playerList = [{ playerId: 1, teamId: 1, start: true }, { playerId: 2, teamId: 1, start: false }];
    const team = { id: 1 };
    const wrapper = shallow(<MatchPlayers team={team} matchPlayers={playerList} />);
    expect(wrapper.find(MatchPlayerSingle)).toHaveLength(2);
  })
});

describe('renders the snapshot', () => {

  it('should render one MatchPlayerSingle', () => {
    const playerList = [{ playerId: 1, teamId: 1, start: true }, { playerId: 2, teamId: 1, start: false }];
    const team = { id: 1 };

    const renderer = new ShallowRenderer();
    renderer.render(<MatchPlayers team={team} matchPlayers={playerList} />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  })
});
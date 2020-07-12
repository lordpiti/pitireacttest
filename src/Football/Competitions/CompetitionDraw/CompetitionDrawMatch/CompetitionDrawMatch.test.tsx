import React from 'react';
import CompetitionDrawMatch from './CompetitionDrawMatch';
import { shallow } from 'enzyme';
import mockDraw from '.././mockDraw.json';

const competitionData = { id: 1 };
const matchData = mockDraw.eightLeft[0];

describe('CompetitionDraw', () => {
  it(`should render correctly`, () => {
    const wrapper = shallow(
      <CompetitionDrawMatch
        competitionData={competitionData}
        match={matchData}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

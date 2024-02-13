import React from 'react';
import CompetitionDraw from './CompetitionDraw';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockDraw from './mockDraw.json';
import { vi } from 'vitest';

const middlewares = [thunk] as any;
const mockStore = configureMockStore(middlewares);
const testState = {
  competitions: {
    competitionList: [],
    currentCompetition: {
      drawData: mockDraw,
    },
  },
  players: { players: [], filteredPlayers: [] },
  teams: {
    teamList: [],
    currentTeam: {},
  },
  global: {
    loading: false,
    dash: {
      message: '',
      open: false,
    },
  },
};

const competitionData = { id: 1 };
let store = null;

describe('CompetitionDraw', () => {
  it(`should render correctly`, () => {
    store = mockStore(testState);
    vi.spyOn(store, 'dispatch');
    const wrapper = shallow(
      <CompetitionDraw competitionData={competitionData} store={store} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

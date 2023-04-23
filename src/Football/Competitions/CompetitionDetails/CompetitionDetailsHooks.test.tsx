import React from 'react';
import CompetitionDetailsHooks from './CompetitionDetailsHooks';
import { shallow } from 'enzyme';
import { match } from 'react-router';
import { createMemoryHistory } from 'history';
import { vi } from 'vitest';

vi.mock('react-redux', () => ({
  useDispatch: () => { },
  useSelector: () => ({
    currentCompetition: {
      logo: {
        url: 'super',
      },
    },
  }),
  connect: () => () => { },
}));

describe('CompetitionDetailsHooks', () => {
  it(`should render correctly`, () => {
    const match: match<{ id: string }> = {
      isExact: false,
      path: '/',
      url: '/',
      params: { id: '1' },
    };
    const history = createMemoryHistory();
    // const location = createLocation(match.url);
    const props = {
      match,
      history: history,
      location: null as any,
    };

    const wrapper = shallow(<CompetitionDetailsHooks {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});

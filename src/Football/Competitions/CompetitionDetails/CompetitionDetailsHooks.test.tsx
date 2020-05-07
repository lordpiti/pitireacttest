import React from 'react';
import CompetitionDetailsHooks from './CompetitionDetailsHooks';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

jest.mock('react-redux', () => ({
  useDispatch: () => {},
  useSelector: () => ({
    currentCompetition: { currentCompetition: {} },
  }),
}));

jest.mock('react-router', () => ({
  Route: jest.fn().mockReturnValue(<div>c</div>),
}));

describe('<SDGDG /> with all data', () => {
  it(`should render correctly`, () => {
    const props = {
      match: {
        id: 2,
        url: '/',
        params: { id: '1' },
        isExact: false,
        path: '/',
      },
      history: {} as any,
      location: {} as any,
    };

    const component = (
      <MemoryRouter initialEntries={['/']}>
        <CompetitionDetailsHooks {...props} />
      </MemoryRouter>
    );
    const metricsPanel = shallow(component as any);
    expect(metricsPanel).toMatchSnapshot();
  });
});

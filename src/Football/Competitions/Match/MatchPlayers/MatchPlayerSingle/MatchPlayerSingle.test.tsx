import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import MatchPlayerSingle, { PlayerMatchSingle } from './MatchPlayerSingle';

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

// https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/

afterEach(cleanup);
describe('MatchPlayerSingle', () => {
  it('renders correctly a player component with the right data', () => {
    const { asFragment } = render(<MatchPlayerSingle player={playerData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // it('should render the name and surname properly', () => {
  //   const { getByTestId } = render(<MatchPlayerSingle player={playerData} />);
  //   expect(getByTestId('playerNameSurname')).toBe(
  //     `${playerData.name} ${playerData.surname}`
  //   );
  // });
});

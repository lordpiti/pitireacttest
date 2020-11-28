import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SideMenu, { MenuItemSideMenu } from './SideMenu';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

const menuData: MenuItemSideMenu[] = [
  { name: 'test1', url: 'test1' },
  { name: 'test2', url: 'test2' },
];

const history = createMemoryHistory();

// https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/

// testing with router:
// https://testing-library.com/docs/example-react-router

afterEach(cleanup);
describe('SideMenu', () => {
  it('renders correctly a sidemenu component with the right data', () => {
    const { asFragment } = render(
      <Router history={history}>
        <SideMenu itemList={menuData} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

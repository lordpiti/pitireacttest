import React from "react";
import CompetitionDetailsHooks from "./CompetitionDetailsHooks";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";

jest.mock("react-redux", () => ({
  useDispatch: () => {},
  useSelector: () => ({
    currentCompetition: {
      logo: {
        url: "super",
      },
    },
  }),
  connect: () => () => {},
}));

describe("<SDGDG /> with all data", () => {
  it(`should render correctly`, () => {
    const props = {
      match: {
        id: 2,
        url: "/",
        params: { id: "1" },
        isExact: false,
        path: "/",
      },
      history: {} as any,
      location: {} as any,
    };

    const wrapper = shallow(<CompetitionDetailsHooks {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});

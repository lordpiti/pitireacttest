import { shallow } from 'enzyme';
import { any } from 'prop-types';
import React from 'react';
import { SunburstBundle } from './SunburstBundle';

describe('SunburstBundle', () => {
  const testProps = {
    data: any,
    diameter: 100,
    selectedProduct: null,
    setSelectedProduct: jest.fn()
  };
  const sunburstBundle = shallow(<SunburstBundle {...testProps} />);

  const instance = sunburstBundle.instance() as SunburstBundle;

  it('should render correctly', () => {
    expect(sunburstBundle).toMatchSnapshot();
  });

  describe('updateToolTip', () => {
    it('should update the state', () => {
      const domElement = {
        nativeEvent: {
          offsetX: 10,
          offsetY: 10
        }
      };
      instance.updateToolTip('test', domElement);

      const expectedState = {
        tooltipCssStyle: {
          left: 10,
          top: 10
        },
        subsLimit: 10,
        tooltipText: 'test',
        tooltipHidden: false
      };

      expect(instance.state).toEqual(expectedState);
    });
  });
});

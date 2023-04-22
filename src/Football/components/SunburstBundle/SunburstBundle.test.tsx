import { shallow } from 'enzyme';
import React from 'react';
import { SunburstBundle, SunburstBundleProps } from './SunburstBundle';

import dataIn from '../Sunburst/Sunburst.data.json';
import { TreeNodeType } from '../../utilities/nest';

describe('SunburstBundle', () => {
  const testProps = {
    data: dataIn as TreeNodeType[],
    diameter: 100,
    selectedProduct: null,
    setSelectedProduct: jest.fn()
  } as SunburstBundleProps;
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

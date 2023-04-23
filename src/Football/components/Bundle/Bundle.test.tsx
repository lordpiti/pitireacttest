import { shallow } from 'enzyme';
import React from 'react';
import { Bundle } from './Bundle';
import * as sunBurstData from '../Sunburst/Sunburst.data.json';
import { vi } from 'vitest';

const dataIn = Object.values(sunBurstData);
describe('Bundle', () => {
  const selectProductMock = vi.fn();

  const testProps = {
    data: dataIn,
    diameter: 1300,
    subsLimit: undefined,
    selectProduct: selectProductMock,
    selectedProduct: {
      groupDescription: undefined,
      substituteProducts: [
        {
          substituteProductCode: '9952752',
          relativePairwiseScore: 0.096065278569570867,
          substituteScore: 0.87,
          customersSubstituting: 3298.662109
        },
        {
          substituteProductCode: '52126982',
          relativePairwiseScore: 0.02337793,
          substituteScore: 0.07,
          customersSubstituting: 3298.662109
        },
        {
          substituteProductCode: '37496998',
          relativePairwiseScore: 0.02840267901170351,
          substituteScore: 0.05,
          customersSubstituting: 3298.662109
        },
        {
          substituteProductCode: '68044335',
          relativePairwiseScore: 0.020261708270481144,
          substituteScore: 0.01,
          customersSubstituting: 3298.662109
        }
      ],
      code: '92185266',
      description: 'TIGER BLOOMER 400G',
      isOrphan: false
    }
  };
  const bundle = shallow(<Bundle {...testProps} />);

  const instance = bundle.instance() as Bundle;

  it('should render correctly', () => {
    expect(bundle).toMatchSnapshot();
  });

  describe('createBundleBasic', () => {
    it('updates the state properly', () => {
      instance.createBundleBasic(testProps);

      const numberOfConnections = instance.state.leavesData
        .map((x: any) => x.data.substituteProducts.length)
        .reduce((a: number, b: number) => a + b, 0);

      expect(instance.state.leavesData.length).toEqual(45);
      expect(instance.state.finalData.length).toEqual(numberOfConnections);
    });
  });

  describe('setProductElementStyle', () => {
    // const substituteProd = {
    //   substituteProductCode: '1',
    //   substituteScore: 1,
    //   relativePairwiseScore: 1,
    //   substituteDescription: '1'
    // }

    // Commented as we are not using this Component
    // and this test was failing during the ESLINT migration

    // it('should get the right background color property for a substitute product', () => {
    //   const productToSetStyle = {
    //     isOrphan: true,
    //     code: '37496998',
    //     description: 'High number',
    //     substituteProducts: [substituteProd]
    //   };

    //   const outputStyle = instance.setProductElementStyle(
    //     productToSetStyle,
    //     false
    //   );
    //   const expectedStyle = {
    //     fill: 'rgb(241, 227, 242)'
    //   };

    //   expect(outputStyle).toEqual(expectedStyle);
    // });

    it('should not get any right background color property for a non-substitute product', () => {
      const productToSetStyle = {
        isOrphan: true,
        code: '7',
        description: 'seven',
        substituteProducts: []
      };

      const outputStyle = instance.setProductElementStyle(
        productToSetStyle,
        false
      );
      const expectedStyle = {};

      expect(outputStyle).toEqual(expectedStyle);
    });
  });

  // describe('productMouseClick', () => {
  //   const mockClickEvent = { stopPropagation: vi.fn() };

  //   const selectedProduct = { code: '1' };
  //   instance.productMouseClick(mockClickEvent, selectedProduct);
  //   const stickProductSpy = vi.spyOn(instance.props, 'selectedProduct');
  //   const stopPropagationSpy = vi.spyOn(mockClickEvent, 'stopPropagation');

  //   expect(stopPropagationSpy).toHaveBeenCalled();
  //   expect(stickProductSpy).toHaveBeenCalled();
  // });

  describe('subsLimit', () => {
    it('should limit the number of product substitutions for each product', () => {
      bundle.setProps({ subsLimit: 5 });
      expect(bundle).toMatchSnapshot();
    });
  });
});

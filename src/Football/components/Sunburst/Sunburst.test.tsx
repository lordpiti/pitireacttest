import { shallow } from 'enzyme';
import React from 'react';
import { TreeNodeType } from '../../utilities/nest';
import { Sunburst, SunburstProps } from './Sunburst';

import dataIn from './Sunburst.data.json';

describe('Sunburst', () => {
    const testProps: SunburstProps = {
        data: dataIn as TreeNodeType[],
        diameter: 1300,
        updateToolTip: (e: any, d: any) => undefined
    };
    const sunburst = shallow(
        <Sunburst {...testProps} />
    );

    const instance = sunburst.instance() as Sunburst;

    it('should render correctly', () => {
        expect(sunburst).toMatchSnapshot();
    });

    describe('createSunburst', () => {

        it('updates the state properly', () => {

            instance.createSunburst(testProps);

            const expectedRootHeight = 2;
            const expectedRootRadius = testProps.diameter / (expectedRootHeight + 1);
            const expectedArcHeight = (expectedRootHeight * expectedRootRadius) / (2 * (expectedRootHeight + 1));

            expect(instance.state.data.height).toEqual(expectedRootHeight);
            expect(instance.state.rootRadius).toEqual(expectedRootRadius);
            expect(instance.state.arcHeight).toEqual(expectedArcHeight);
        });
    })
});

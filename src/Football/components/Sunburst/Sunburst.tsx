import { arc, hierarchy, partition } from 'd3';
import React from 'react';
import { nestData, TreeNodeType } from '../../utilities/nest';
import './Sunburst.scss';

export interface SunburstProps {
  data: TreeNodeType[];
  diameter: number;
  updateToolTip: Function;
}

interface SunburstState {
  data: any;
  rootRadius: number;
  arcHeight: number;
}

const colourSet = [
  '#a1aee3',
  '#9cd9d5',
  '#d2e4aa',
  '#f2af96',
  '#ffe080',
  '#e79ac6',
  '#908aaf',
  '#e2c6e5',
  '#bbe4ec',
  '#c7cacc',
];

export class Sunburst extends React.Component<SunburstProps, SunburstState> {
  constructor(props: SunburstProps) {
    super(props);
    this.state = {
      data: null,
      rootRadius: 0,
      arcHeight: 0,
    };
  }

  arc = arc()
    .startAngle((d: any) => d.x0)
    .endAngle((d: any) => d.x1)
    .innerRadius((d: any) =>
      d.depth === 0 ? 0 : d.depth * this.state.arcHeight
    )
    .outerRadius((d: any) => {
      let oRad: number;

      if (d.children === null && d.depth !== this.state.data.height) {
        oRad = this.state.arcHeight * (this.state.data.height + 1);
      } else {
        oRad =
          d.depth === 0
            ? this.state.rootRadius
            : this.state.arcHeight * (d.depth + 1);
      }

      return oRad;
    });
  componentDidMount() {
    this.createSunburst(this.props);
  }

  componentDidUpdate(prevProps: SunburstProps) {
    if (
      prevProps.data !== this.props.data ||
      prevProps.diameter !== this.props.diameter
    ) {
      this.createSunburst(this.props);
    }
  }

  createSunburst(props: SunburstProps) {
    const validNodes = props.data.filter(
      (x) =>
        !x.needStateId || (x.needStateId && x.products && x.products.length > 0)
    );

    const nestedData = nestData(validNodes, (treeNode: TreeNodeType) => {
      if (treeNode.products) {
        treeNode.value = treeNode.products.length;
      }
    });

    const partitionF = (data: TreeNodeType) => {
      const root = hierarchy(data).sum((d: TreeNodeType) => {
        return d.products && d.products.length;
      });
      // .sort((a: any, b: any) => b.value - a.value);
      return partition().size([2 * Math.PI, root.height + 1])(root);
    };
    const root = partitionF(nestedData);

    root.each((d: any) => (d.current = d));

    const adjustedDiameterForSunburst =
      root.height * (props.diameter / (root.height + 1));

    this.setState({
      data: root,
      arcHeight: adjustedDiameterForSunburst / (2 * (root.height + 1)),
      rootRadius: adjustedDiameterForSunburst / root.height,
    });
  }

  rtnFill = (d: any, i: number) => {
    d.index = i;
    if (!d.depth) {
      return '#ccc';
    }
    while (d.depth > 1) {
      // eslint-disable-next-line no-param-reassign
      d = d.parent;
    }

    return colourSet[d.index % colourSet.length];
  };

  render() {
    const { updateToolTip } = this.props;

    return this.state.data ? (
      <>
        {this.state.data
          .descendants()
          .slice(1)
          .map((element: any, i: number) => (
            <path
              key={`needStateArc-${element.data.id}`}
              id={`axisPath${element.data.id}`}
              fill={this.rtnFill(element, i)}
              d={this.arc(element.current) as string | undefined}
              strokeWidth={0.5}
              stroke='grey'
              onMouseMove={(event) =>
                updateToolTip(element.current.data.name, event)
              }
              onMouseLeave={(event) => updateToolTip(null, event)}
            />
          ))}
      </>
    ) : (
      <></>
    );
  }
}

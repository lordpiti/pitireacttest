import React, { Component } from 'react';
import { SunburstBundle } from '../SunburstBundle/SunburstBundle';
import sunburstData from './Sunburst.data.json';
import { TreeNodeType } from '../../utilities/nest';
import { Product } from '../SunburstBundle/products';

export class GraphicDemo extends Component<any, any> {
  state = {
    scienceFailed: false,
    disableZoom: false,
    minScale: 0.71,
    maxScale: 1.28,
    vertical: true,
    stacked: false,
    highlighted: false,
    disablePan: false,
    diameter: 1170,
    showSubsHighlight: false,
    selectedProductBundle: null,
    newNode: null,
    selectedNodeRightClick: null,
    exportNotificationFailed: null,
  };

  setSelectedProductBundle = (product: Product) => {
    this.setState({
      selectedProductBundle: product,
    });
  };

  render() {
    return (
      <SunburstBundle
        data={sunburstData as TreeNodeType[]}
        diameter={this.state.diameter}
        selectedProduct={this.state.selectedProductBundle}
        setSelectedProduct={this.setSelectedProductBundle}
      />
    );
  }
}

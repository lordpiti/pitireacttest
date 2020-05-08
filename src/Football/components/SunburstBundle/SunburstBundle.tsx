// import { Product } from 'components/TreeNode/TreeNode';
import React from 'react';
import { Bundle } from '../Bundle/Bundle';
import { Sunburst } from '../Sunburst/Sunburst';
import './SunburstBundle.scss';

interface SunburstBundleProps {
  data: any;
  diameter: number;
  selectedProduct?: any;
  setSelectedProduct: Function;
}

interface SunburstBundleState {
  tooltipCssStyle?: any;
  tooltipHidden: boolean;
  tooltipText?: string;
  subsLimit?: number;
}

export class SunburstBundle extends React.Component<
  SunburstBundleProps,
  SunburstBundleState
> {
  state: SunburstBundleState = {
    tooltipHidden: true,
    tooltipCssStyle: {},
    tooltipText: '',
    subsLimit: 10,
  };

  componentDidUpdate(prevProps: SunburstBundleProps) {
    debugger;
    if (prevProps.selectedProduct !== this.props.selectedProduct) {
      this.setSubsLimit(this.props.selectedProduct);
    }
  }

  updateToolTip = (element: string, d: any) => {
    const popupState: SunburstBundleState = {
      tooltipHidden: true,
    };

    if (element) {
      popupState.tooltipCssStyle = {
        left: d.nativeEvent.offsetX,
        top: d.nativeEvent.offsetY,
      };
      popupState.tooltipText = element;
      popupState.tooltipHidden = false;
    }

    this.setState(popupState);
  };

  selectProduct = (d, product: any) => {
    const filteredProduct = product && {
      ...product,
    };
    this.props.setSelectedProduct(filteredProduct);
    this.setSubsLimit(filteredProduct);
  };

  setSubsLimit(product: any) {
    let limit = 10;
    if (product) {
      limit = product.substituteProducts.length;
    }

    this.setState({
      // remove : 10 if subslimit should be persisted...
      subsLimit: limit,
    });
  }

  setSubsLimitEventHandler = (e: any) => {
    this.setState({ subsLimit: parseInt(e.target.value, 10) });
  };

  createSelectOption = (i) => (
    <option value={i + 1} selected={this.state.subsLimit === i + 1}>
      {i + 1}
    </option>
  );

  render() {
    const {
      // Destructure any props you will need
      diameter,
      selectedProduct,
    } = this.props;

    const subsArray: any = selectedProduct
      ? selectedProduct.substituteProducts
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <>
        <div className='text-left'>
          Select maximum number of products:
          <select
            className='subsLimitSelect'
            onClick={() => null}
            onChange={this.setSubsLimitEventHandler}
            value={this.state.subsLimit ? this.state.subsLimit : 10}
          >
            {subsArray.map((a, i) => this.createSelectOption(i))}
          </select>
        </div>
        <div id='sunburstBundle' className='text-center'>
          {!this.state.tooltipHidden && (
            <div
              id='tooltipSunburst'
              className='CDTtooltip'
              style={this.state.tooltipCssStyle}
            >
              {this.state.tooltipText}
            </div>
          )}
          <svg
            width={diameter}
            height={diameter}
            onClick={(e) => this.props.setSelectedProduct(null)}
          >
            <g transform={`translate(${diameter / 2},${diameter / 2})`}>
              <Sunburst
                data={this.props.data}
                diameter={diameter}
                updateToolTip={this.updateToolTip}
              />
              <Bundle
                data={this.props.data}
                diameter={diameter}
                selectedProduct={this.props.selectedProduct}
                selectProduct={this.props.setSelectedProduct}
                subsLimit={this.state.subsLimit}
              />
            </g>
          </svg>
        </div>
      </>
    );
  }
}

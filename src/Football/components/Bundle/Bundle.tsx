// import { Product } from 'components/TreeNode/TreeNode';
import { cluster, curveBundle, hierarchy, lineRadial } from 'd3';
import mapKeys from 'lodash/mapKeys';
import React, { Component } from 'react';
import { backgroundColor } from '../../utilities/colourUtilities';
import { nestData, packageImports } from '../../utilities/nest';
import './Bundle.scss';

interface BundleProps {
  data: any;
  diameter: number;
  selectProduct: Function;
  selectedProduct?: any;
  subsLimit?: number;
}

interface BundleState {
  leavesData: any;
  finalData: any;
  hoverProduct: any;
  textWidth?: number;
  substituteProducts: any;
}

const ellipsisDescription = (text: string) => {
  return text.length <= 25 ? text : `${text.substr(0, 25)}...`;
};

export class Bundle extends Component<BundleProps, BundleState> {
  state: BundleState = {
    leavesData: null,
    finalData: null,
    hoverProduct: null,
    substituteProducts: null,
  };

  line: any = null;
  cluster: any = null;

  componentDidMount() {
    this.createBundleBasic(this.props);
    if (this.props.selectedProduct) {
      this.setSubstituteProducts();
    }
  }

  componentDidUpdate(prevProps: BundleProps) {
    if (prevProps.subsLimit !== this.props.subsLimit) {
      this.setSubstituteProducts();
    }
    if (
      this.props.selectedProduct &&
      prevProps.selectedProduct !== this.props.selectedProduct
    ) {
      this.setSubstituteProducts();
    }
    if (
      !this.props.selectedProduct &&
      prevProps.selectedProduct !== this.props.selectedProduct
    ) {
      this.setState({
        substituteProducts: null,
        hoverProduct: null,
      });
    }
    if (
      this.props.selectedProduct &&
      prevProps.selectedProduct !== this.props.selectedProduct
    ) {
      this.setState({
        substituteProducts: [
          ...this.props.selectedProduct.substituteProducts.slice(
            0,
            this.props.subsLimit
          ),
        ],
        hoverProduct: null,
      });
    }
    if (
      prevProps.data !== this.props.data ||
      prevProps.diameter !== this.props.diameter ||
      prevProps.subsLimit !== this.props.subsLimit
    ) {
      this.createBundleBasic(this.props);
    }
  }

  setSubstituteProducts = () => {
    const slicedData = this.props.selectedProduct && [
      ...this.props.selectedProduct.substituteProducts.slice(
        0,
        this.props.subsLimit
      ),
    ];
    this.setState({
      substituteProducts: mapKeys(
        slicedData && slicedData,
        'substituteProductCode'
      ),
      hoverProduct: null,
    });
  };

  createBundleBasic = (props: BundleProps) => {
    const validNodes = props.data.filter(
      (x: any) =>
        !x.needStateId || (x.needStateId && x.products && x.products.length > 0)
    );
    const nestedData = nestData(validNodes, (treeNode: any) => {
      if (treeNode.products) {
        treeNode.products.forEach((x: any) => {
          x.parentId = treeNode.id;
        });
        treeNode.children = treeNode.products;
      }
    });

    const root = hierarchy(nestedData);

    const diameter = props.diameter,
      radius = diameter / 2,
      innerRadius = (root.height - 1) * (radius / root.height);

    this.cluster = cluster()
      .size([360, innerRadius])
      .separation(() => 1);

    this.line = lineRadial()
      .curve(curveBundle.beta(0.85))
      .radius((d: any) => {
        return d.y;
      })
      .angle((d: any) => {
        return (d.x / 180) * Math.PI;
      });

    const leavesList = root.leaves();

    const finalData = packageImports(leavesList);

    this.setState({
      leavesData: leavesList,
      finalData: finalData,
      textWidth: radius / root.height - 15,
    });

    this.cluster(root);
  };

  mouseovered = (d: any, product: any) => {
    if (!this.props.selectedProduct) {
      this.setState({
        hoverProduct: product,
        substituteProducts: mapKeys(
          product.substituteProducts.slice(0, this.props.subsLimit),
          'substituteProductCode'
        ),
      });
    }
  };

  mouseouted = () => {
    if (!this.props.selectedProduct) {
      this.setState({ hoverProduct: null, substituteProducts: null });
    }
  };

  productMouseClick = (d: any, product: any) => {
    d.stopPropagation();

    this.props.selectProduct(product);
    this.setState({
      hoverProduct: null,
    });
  };

  setProductElementStyle = (product: any, isProductSelected: boolean) => {
    const style: any = {};

    // Set the style of the substitutes for the sticked product (if any)
    // Otherwise, set the style of the substitutes of the hovered product (if any)
    if (this.state.substituteProducts) {
      const substituteFound = this.state.substituteProducts[product.code];
      if (substituteFound) {
        style['fill'] = backgroundColor(substituteFound.substituteScore);
      }
    } else if (!isProductSelected) {
      style['fill'] = 'transparent';
    }

    return style;
  };

  render() {
    let links = null;
    let texts = null;

    if (this.state) {
      if (this.state.finalData) {
        let filteredLinks = null;

        if (this.props.selectedProduct) {
          filteredLinks = this.state.finalData.filter(
            (x: any) => x[0].data.code === this.props.selectedProduct.code
          );
        } else {
          filteredLinks = this.state.hoverProduct
            ? this.state.finalData.filter(
                (x: any) => x[0].data.code === this.state.hoverProduct.code
              )
            : this.state.finalData;
        }

        filteredLinks =
          this.state.hoverProduct || this.props.selectedProduct
            ? filteredLinks.slice(0, this.props.subsLimit)
            : filteredLinks;

        links = filteredLinks.map((element: any, i: number) => (
          <path
            key={`productSubstituteLink${i}`}
            className='link'
            d={this.line(element)}
          />
        ));
      }

      texts =
        this.state.leavesData &&
        this.state.leavesData.map((element: any, i: number) => {
          const isProductSelected =
            (this.state.hoverProduct &&
              !this.props.selectedProduct &&
              this.state.hoverProduct.code === element.data.code) ||
            (this.props.selectedProduct &&
              this.props.selectedProduct.code === element.data.code);

          const isProductSubstitute =
            (this.state.hoverProduct || this.props.selectedProduct) &&
            this.state.substituteProducts &&
            this.state.substituteProducts[element.data.code];

          return (
            <g
              key={`productLabelGroup${element.data.code}`}
              className={`productLabelGroup node ${
                isProductSelected ? 'selectedProductNameBox' : ''
              }`}
              onMouseOver={(e) => this.mouseovered(e, element.data)}
              onMouseOut={this.mouseouted}
              onClick={(e) => this.productMouseClick(e, element.data)}
            >
              <rect
                className='productRectangle'
                textAnchor={element.x < 180 ? 'start' : 'end'}
                transform={`rotate(${element.x - 90})translate(${
                  element.y + 8
                },${element.x < 180 ? -7 : -6})`}
                height='12'
                fill='transparent'
                width={this.state.textWidth}
                style={this.setProductElementStyle(
                  element.data,
                  isProductSelected
                )}
              />
              <text
                className={`productText ${
                  isProductSubstitute ? 'subsProduct' : ''
                }`}
                dy='0.31em'
                textAnchor={element.x < 180 ? 'start' : 'end'}
                transform={
                  'rotate(' +
                  (element.x - 90) +
                  ')translate(' +
                  (element.y + 8) +
                  ',0)' +
                  (element.x < 180 ? '' : 'rotate(180)')
                }
                textLength={this.state.textWidth}
              >
                {element.data.description &&
                  ellipsisDescription(element.data.description)}
              </text>
            </g>
          );
        });
    }

    return (
      <>
        {links}
        {texts}
      </>
    );
  }
}

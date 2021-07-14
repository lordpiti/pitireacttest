// import { Product } from 'components/TreeNode/TreeNode';
import { cluster, curveBundle, hierarchy, HierarchyNode, lineRadial } from 'd3';
import { Dictionary } from 'lodash';
import mapKeys from 'lodash/mapKeys';
import React, { useEffect, useState } from 'react';
import { backgroundColor } from '../../utilities/colourUtilities';
import { nestData, packageImports, TreeNodeType } from '../../utilities/nest';
import './Bundle.scss';

interface BundleProps {
  data: any;
  diameter: number;
  selectProduct: Function;
  selectedProduct?: any;
  subsLimit?: number;
}

const ellipsisDescription = (text: string) => {
  return text.length <= 25 ? text : `${text.substr(0, 25)}...`;
};

export const Bundle = (props: BundleProps) => {

  const [leavesData, setLeavesData] = useState<HierarchyNode<TreeNodeType>[] | null>(null);
  const [finalData, setFinalData] = useState(null as any);
  const [substituteProducts, setSubstituteProducts] = useState<Dictionary<any> | null>(null);
  const [hoverProduct, setHoverProduct] = useState(null as any);
  const [textWidth, setTextWidth] = useState(undefined as number | undefined);

  useEffect(() => {
    const setSubstituteProductsh = () => {
      const slicedData = props.selectedProduct && [
        ...props.selectedProduct.substituteProducts.slice(
          0,
          props.subsLimit
        ),
      ];

      setSubstituteProducts(mapKeys(
        slicedData && slicedData,
        'substituteProductCode'
      ));

      setHoverProduct(null);
    };

    setSubstituteProductsh();
  }, [props.subsLimit, props.selectedProduct]);

  useEffect(() => {
    const createBundleBasic = (data: any, diameter: number) => {
      const validNodes = data.filter(
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

      const
        radius = diameter / 2,
        innerRadius = (root.height - 1) * (radius / root.height);

      let clusterLocal = cluster()
        .size([360, innerRadius])
        .separation(() => 1);

      const leavesList = root.leaves();

      const finalData = packageImports(leavesList);

      setLeavesData(leavesList);
      setFinalData(finalData);
      setTextWidth(radius / root.height - 15);

      clusterLocal(root);
    };
    createBundleBasic(props.data, props.diameter);
  }, [props.data, props.diameter]);


  const mouseovered = (d: any, product: any) => {
    if (!props.selectedProduct) {
      setHoverProduct(product);
      setSubstituteProducts(mapKeys(
        product.substituteProducts.slice(0, props.subsLimit),
        'substituteProductCode'
      ));
    }
  };

  const mouseouted = () => {
    if (!props.selectedProduct) {
      setHoverProduct(null);
      setSubstituteProducts(null);
    }
  };

  const productMouseClick = (d: any, product: any) => {
    d.stopPropagation();

    props.selectProduct(product);
    setHoverProduct(null);
  };

  const setProductElementStyle = (product: any, isProductSelected: boolean) => {
    const style: any = {};

    // Set the style of the substitutes for the sticked product (if any)
    // Otherwise, set the style of the substitutes of the hovered product (if any)
    if (substituteProducts) {
      const substituteFound = substituteProducts[product.code];
      if (substituteFound) {
        style['fill'] = backgroundColor(substituteFound.substituteScore);
      }
    } else if (!isProductSelected) {
      style['fill'] = 'transparent';
    }

    return style;
  };

  const line: any = lineRadial()
    .curve(curveBundle.beta(0.85))
    .radius((d: any) => {
      return d.y;
    })
    .angle((d: any) => {
      return (d.x / 180) * Math.PI;
    });

  let links = null;
  let texts = null;

  if (finalData) {
    let filteredLinks = null;

    if (props.selectedProduct) {
      filteredLinks = finalData.filter(
        (x: any) => x[0].data.code === props.selectedProduct.code
      );
    } else {
      filteredLinks = hoverProduct
        ? finalData.filter(
          (x: any) => x[0].data.code === hoverProduct.code
        )
        : finalData;
    }

    filteredLinks =
      hoverProduct || props.selectedProduct
        ? filteredLinks.slice(0, props.subsLimit)
        : filteredLinks;

    links = filteredLinks.map((element: any, i: number) => (
      <path
        key={`productSubstituteLink${i}`}
        className='link'
        d={line(element)}
      />
    ));
  }

  texts =
    leavesData &&
    leavesData.map((element: any, i: number) => {
      const isProductSelected =
        (hoverProduct &&
          !props.selectedProduct &&
          hoverProduct.code === element.data.code) ||
        (props.selectedProduct &&
          props.selectedProduct.code === element.data.code);

      const isProductSubstitute =
        (hoverProduct || props.selectedProduct) &&
        substituteProducts &&
        substituteProducts[element.data.code];

      return (
        <g
          key={`productLabelGroup${element.data.code}`}
          className={`productLabelGroup node ${isProductSelected ? 'selectedProductNameBox' : ''
            }`}
          onMouseOver={(e) => mouseovered(e, element.data)}
          onMouseOut={mouseouted}
          onClick={(e) => productMouseClick(e, element.data)}
        >
          <rect
            className='productRectangle'
            textAnchor={element.x < 180 ? 'start' : 'end'}
            transform={`rotate(${element.x - 90})translate(${element.y + 8
              },${element.x < 180 ? -7 : -6})`}
            height='12'
            fill='transparent'
            width={textWidth}
            style={setProductElementStyle(
              element.data,
              isProductSelected
            )}
          />
          <text
            className={`productText ${isProductSubstitute ? 'subsProduct' : ''
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
            textLength={textWidth}
          >
            {element.data.description &&
              ellipsisDescription(element.data.description)}
          </text>
        </g>
      );
    });

  return (
    <>
      {links}
      {texts}
    </>
  );
}
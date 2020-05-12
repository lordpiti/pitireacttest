import cloneDeep from 'lodash/cloneDeep';
import mapKeys from 'lodash/mapKeys';
import { Product } from '../components/SunburstBundle/products';
// import { CDTNode } from 'services/CDTService';
// import { Product } from 'components/TreeNode/TreeNode';

export interface TreeNodeType {
  id: number;
  name: string;
  parentId: number;
  products: Product[];
  needStateId?: number;
  children?: TreeNodeType[];
  value?: number;
}

export const nestData = (
  data: any[],
  callback: Function = (treeNode: any) => null
): TreeNodeType => {
  let tree = {} as TreeNodeType;

  const dataMap = mapKeys(cloneDeep(data), 'id');

  const addDataItemToTree = (item: any) => {
    const parentElement = dataMap[item.parentId] as TreeNodeType;
    const treeNode = dataMap[item.id] as TreeNodeType;

    callback(treeNode);

    if (parentElement) {
      if (!parentElement.children) {
        parentElement.children = [];
      }

      parentElement.children.push(treeNode);
    } else {
      tree = treeNode;
    }
  };
  data.map(addDataItemToTree);
  return tree;
};

// Return a list of imports for the given array of nodes.
export const packageImports = (nodes: any[]) => {
  const map = {} as any,
    imports: any[] = [];

  // Compute a map from name to node.
  // eslint-disable-next-line prefer-arrow-callback
  nodes.forEach(function (d: any) {
    map[d.data.description] = d;
  });

  // For each import, construct a link from the source to target node.
  // eslint-disable-next-line prefer-arrow-callback
  nodes.forEach(function (d) {
    d.data.substituteProducts &&
      d.data.substituteProducts.forEach((substituteProduct: any) => {
        const otherNode = nodes.find(
          (x) => x.data.code === substituteProduct.substituteProductCode
        );
        imports.push(map[d.data.description].path(otherNode));
      });
  });

  return imports;
};

export type Product = {
  groupDescription?: string | null;
  code: string;
  description: string;
  substituteProducts: SubsProduct[];
  parentId?: number;
  isOrphan: boolean;
  isExcluded?: boolean;
  highlightGradient?: string;
  measure?: number;
};

export type SubsProduct = {
  substituteProductCode: string;
  substituteScore: number;
  relativePairwiseScore: number;
};

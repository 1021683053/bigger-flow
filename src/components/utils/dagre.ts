import { type Node, type Edge } from '@xyflow/react'
import Dagre, { type GraphLabel } from '@dagrejs/dagre';

export type DagreGraphOptions = {
  direction: 'TB' | 'LR';
  horizontalGap?: number; // 横向间距
  verticalGap?: number; // 纵向间距
  graphLabel?: GraphLabel;
}

export const getDagreElements = (nodes: Node[], edges: Edge[], options: DagreGraphOptions) => {
  const { horizontalGap = 100, verticalGap = 50, direction = 'LR', graphLabel } = options;
  const graph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({})).setGraph({
    rankdir: direction,
    nodesep: verticalGap,
    ...graphLabel
  });
  nodes.forEach(node => {
    graph.setNode(node.id, { width: (node.width || 100) + horizontalGap, height: (node.height || 50) });
  });
  edges.forEach(edge => {
    graph.setEdge(edge.source, edge.target);
  });
  Dagre.layout(graph);
  const elements = {
    nodes: nodes.map((node) => {
      const { x, y } = graph.node(node.id);
      return {
        ...node,
        position: { x, y },
      };
    }),
    edges
  };
  return elements;
}
import { type Node, type Edge } from '@xyflow/react'
import Dagre, { type GraphLabel } from '@dagrejs/dagre';

export type DagreGraphOptions = {
  direction: 'TB' | 'LR';
} & GraphLabel

export const getDagreElements = (nodes: Node[], edges: Edge[], options: DagreGraphOptions) => {
  const { direction = 'LR', nodesep = 50, ranksep = 100, ...graphLabel } = options;
  const graph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({})).setGraph({
    rankdir: direction,
    nodesep,
    ranksep,
    ...graphLabel
  });
  nodes.forEach(node => {
    graph.setNode(node.id, { width: (node.width || 100) , height: (node.height || 50) });
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
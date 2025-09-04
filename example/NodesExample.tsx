import { Background, ReactFlow, type Node, type Edge } from '@xyflow/react'

import { nodeTypes } from '../src/components/Nodes'
import { getDagreElements } from '../src/components/utils'

const nodes: Node[] = [
  {
    id: '1',
    data: { label: 'Sample Node' },
    type: 'sample',
    position: { x: 24, y: 24 },
    ...nodeTypes['sample'].defaultSize,
  },
  {
    id: '2',
    data: { label: 'Sample Node' },
    type: 'sample',
    position: { x: 0, y: 100 },
    ...nodeTypes['sample'].defaultSize,
  },
  {
    id: '3',
    data: { label: 'Sample Node' },
    type: 'sample',
    position: { x: 400, y: 100 },
    ...nodeTypes['sample'].defaultSize,
  },
  
]

const edges: Edge[] = [
  {
    id: 'e1',
    source: '1',
    target: '3',
    type: 'smoothstep'
  },
  {
    id: 'e2',
    source: '2',
    target: '3',
    type: 'smoothstep'
  }
]

export const NodesExample = () => {
  const elements = getDagreElements(nodes, edges, { direction: 'LR' });
  return (
    <ReactFlow nodes={elements.nodes} edges={elements.edges} nodeTypes={nodeTypes} proOptions={{ hideAttribution: true }} fitView>
      <Background />
    </ReactFlow>
  );
};

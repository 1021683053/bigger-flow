import { Background, ReactFlow, type Node, type Edge } from '@xyflow/react'
import { nodeTypes } from '../components/Nodes'

const nodes: Node[] = [
  {
    id: '1',
    data: { label: 'Sample Node' },
    type: 'sample',
    position: { x: 24, y: 24 },
    width: 300,
    height: 100
  },
   {
    id: '2',
    data: { label: 'Sample Node' },
    type: 'sample',
    position: { x: 424, y: 424 },
    width: 300,
    height: 100
  },
]

const edges: Edge[] = [
  {
    id: 'e1',
    source: '1',
    target: '2',
    type: 'smoothstep'
  }
]

export const NodesExample = () => {
  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} proOptions={{ hideAttribution: true }}>
      <Background />
    </ReactFlow>
  );
};

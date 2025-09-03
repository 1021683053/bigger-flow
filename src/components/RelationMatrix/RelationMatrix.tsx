import { ReactFlow, Background, Handle, Position, ReactFlowProvider } from '@xyflow/react'


export const RelationMatrix = ()=>{
  return (
    <ReactFlow
       proOptions={{ hideAttribution: true }}
    >
      <Background />
    </ReactFlow>
  )
  // return <ReactFlowProvider>
  //   <div style={{ width: 100, height: 40, border: '1px solid #333' }}>
  //      <Handle type="target" position={Position.Top} />
  //   </div>
  // </ReactFlowProvider>
}
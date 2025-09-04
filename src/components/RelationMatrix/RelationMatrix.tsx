import { ReactFlow, Background, type Edge, type ReactFlowProps, type Node } from '@xyflow/react'
import { nodeTypes } from '../Nodes'
import { useMemo } from 'react'
import { getDagreElements } from '../utils'
import { type SampleData } from '../Nodes/Sample'

export type RelationMatrixNode = {
  id: string
  type: keyof typeof nodeTypes
  data: SampleData
 } & Pick<Node, 'width' | 'height'>

export type RelationMatrixEdge = Edge

export type RelationMatrixProps = {
  nodes?: RelationMatrixNode[]
  edges?: RelationMatrixEdge[]
  flowProps?: ReactFlowProps
  dagreOptions?: Parameters<typeof getDagreElements>[2]
}

export const RelationMatrix = (props: RelationMatrixProps)=>{
  const { dagreOptions, edges = [] } = props;
  // 解析 node
  const nodes = useMemo(()=>{
    return (props.nodes || []).map(node => {
      const { data = {}} = node
      const width = node.width || nodeTypes[node.type].defaultSize.width
      const height = node.height || nodeTypes[node.type].defaultSize.height
      return {
        id: node.id,
        type: node.type,
        data,
        position: { x: 0, y: 0 },
        width,
        height
      }
    })
  }, [props.nodes])

  // 生成布局
  const elements = useMemo(()=>{
    return getDagreElements(nodes, edges || [], {
      direction: 'LR',
      horizontalGap: 100,
      verticalGap: 50,
      ...dagreOptions
    })
  }, [nodes, edges, dagreOptions])

  return (
    <ReactFlow
      nodes={elements.nodes}
      edges={elements.edges}
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
      {...props.flowProps}
    >
      <Background />
    </ReactFlow>
  )
}
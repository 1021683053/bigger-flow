import { ReactFlow, Background, type Edge, type ReactFlowProps, type Node } from '@xyflow/react'
import { nodeTypes } from '../Nodes'
import { useMemo } from 'react'
import { getDagreElements } from '../utils'
import { type SampleData } from '../Nodes/Sample'
import { type Direction } from '../interface'

export type RelationMatrixNode = {
  id: string
  type: keyof typeof nodeTypes
  data: SampleData
 } & Partial<Omit<Node, 'data' | 'type' | 'id'>>

export type RelationMatrixEdge = Edge

export type RelationMatrixProps = {
  nodes?: RelationMatrixNode[]
  edges?: RelationMatrixEdge[]
  layout?: 'dagre' | false
  direction?: Direction
  flowProps?: ReactFlowProps
  dagreOptions?: Parameters<typeof getDagreElements>[2]
}

export const RelationMatrix = (props: RelationMatrixProps)=>{
  const { dagreOptions, layout = 'dagre', edges = [], direction = 'LR' } = props;
  // 解析 node
  const nodes = useMemo(()=>{
    return (props.nodes || []).map(node => {
      const { data = {}, id, type, ...resetNode } = node
      const width = node.width || nodeTypes[node.type].defaultSize.width
      const height = node.height || nodeTypes[node.type].defaultSize.height
      return {
        id,
        type,
        deleted: false,
        draggable: false,
        data: {
          ...data,
          direction
        },
        position: { x: 0, y: 0 },
        width,
        height,
        ...resetNode
      }
    })
  }, [props.nodes, direction])

  // 生成布局
  const elements = useMemo(()=>{
    if( layout !== 'dagre' ) {
      return {
        nodes,
        edges
      }
    }
    return getDagreElements(nodes, edges || [], {
      direction,
      horizontalGap: 100,
      verticalGap: 50,
      ...dagreOptions
    })
  }, [nodes, edges, layout, direction, dagreOptions])

  return (
    <ReactFlow
      nodes={elements.nodes}
      edges={elements.edges}
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
      draggable={false}
      nodesConnectable={false}
      {...props.flowProps}
    >
      <Background />
    </ReactFlow>
  )
}
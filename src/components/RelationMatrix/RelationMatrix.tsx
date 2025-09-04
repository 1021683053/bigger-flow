import { ReactFlow, Background, useReactFlow, type Edge, type ReactFlowProps, type Node, type BackgroundProps } from '@xyflow/react'
import { nodeTypes } from '../Nodes'
import { useEffect, useMemo, useRef } from 'react'
import { getDagreElements, type DagreGraphOptions } from '../utils'
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
  fitViewOnResize?: boolean
  flowProps?: ReactFlowProps
  backgroundProps?: BackgroundProps
  dagreOptions?: Partial<DagreGraphOptions>
}

export const RelationMatrix = (props: RelationMatrixProps)=>{
  const { dagreOptions, layout = 'dagre', edges = [], direction = 'LR', backgroundProps = {}, flowProps = {}, fitViewOnResize = true } = props;
  const flowRef = useRef<HTMLDivElement>(null);
  const { fitView } = useReactFlow();
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
      ...dagreOptions
    })
  }, [nodes, edges, layout, direction, dagreOptions])

  // 自动适应宽高
  useEffect(()=>{
    if (!flowRef.current || !fitViewOnResize) return;
    const resizeObserver = new ResizeObserver(() => {
      fitView();
    });
    resizeObserver.observe(flowRef.current);
    return () => resizeObserver.disconnect();
  }, [fitView, fitViewOnResize])

  return (
    <ReactFlow
      nodes={elements.nodes}
      edges={elements.edges}
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
      draggable={false}
      fitView
      nodesConnectable={false}
      minZoom={0.2}
      ref={flowRef}
      {...flowProps}
    >
      <Background {...backgroundProps} />
    </ReactFlow>
  )
}

import { Handle, type NodeProps, Position, useReactFlow } from '@xyflow/react'
import { useMemo } from 'react'

export type SampleData = {
  label: string
  style?: React.CSSProperties
  // 动态 handle
  dynamicHandle?: boolean
}

export const Sample = (props: NodeProps)=>{
  const { id } = props
  const data = props.data as SampleData
  const { getEdges } = useReactFlow()
  const { income, outcome } = useMemo(()=>{
    const edges = getEdges()
    return {
      income: edges.some(e => e.target === id),
      outcome: edges.some(e => e.source === id),
    }
  }, [getEdges, id])
  console.log(getEdges())

  console.log(props)
  return (
    <div>
      {
        income ? <Handle type="target" position={Position.Left} /> : null
      }
      {data.label}
      {
        outcome ? <Handle type="source" position={Position.Right} /> : null
      }
    </div>
  )
}
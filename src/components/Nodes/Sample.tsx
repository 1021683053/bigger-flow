import { Handle, type NodeProps, Position, useReactFlow } from '@xyflow/react'
import { useMemo } from 'react'
import { type NodeData } from './interface'
import cx from 'classnames'

export type SampleData = NodeData & {
  marker?: {
    label: string
    color?: string
    backgroundColor?: string
    type?: 'line' | 'outline'
    style?: React.CSSProperties,
    render?: (element: React.ReactNode, node: NodeProps) => React.ReactNode
  }
}

export const Sample = (props: NodeProps)=>{
  const { id, width = Sample.defaultSize.width, height = Sample.defaultSize.height } = props
  const data = props.data as SampleData
  const { label, style = {}, dynamicHandle = true, render, direction = 'LR' } = data

  const { getEdges } = useReactFlow()
  const { income, outcome } = useMemo(()=>{
    const edges = getEdges()
    return {
      income: dynamicHandle ? edges.some(e => e.target === id) : true,
      outcome: dynamicHandle ? edges.some(e => e.source === id) : true,
    }
  }, [getEdges, dynamicHandle, id])

  const marker = useMemo(()=>{
    if( !data.marker ) return null
    const { type = 'outline', label, color, backgroundColor, style={}, render } = data.marker
    const markerStyle = {
      color,
      backgroundColor,
      ...style
    }
    const element = <div className={cx('sample-marker', { [type]: true })} style={markerStyle}>{label}</div>
    if( render ) return render(element, props)
    return element
  }, [props, data.marker])

  const extra = useMemo(()=>{
    if( !data.extraRender ) return null;
    return data.extraRender(null, props)
  }, [data, props])

  const element = (
    <div className='bigger-node-sample' style={{ width, height, ...style }}>
      {
        income ? <Handle type="target" position={ direction === 'LR' ? Position.Left : Position.Top} isConnectable={props.isConnectable} /> : null
      }
      {label}
      {
        outcome ? <Handle type="source" position={direction === 'LR' ? Position.Right : Position.Bottom} isConnectable={props.isConnectable} /> : null
      }
      {marker}
      {extra}
    </div>
  )
  return render ? render(element, props) : element
}

Sample.defaultSize = {
  width: 190,
  height: 80
}
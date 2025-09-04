import type { NodeProps } from '@xyflow/react'
import { type  ReactElement, type ReactNode } from 'react'
export type NodeData = {
  label: string
  style?: React.CSSProperties
  // 动态 handle
  dynamicHandle?: boolean
  // 是否自定义 render
  render?: (element: ReactElement, nodeProps: NodeProps) => ReactNode
  // 扩展渲染
  extraRender?: (element: ReactElement | null, nodeProps: NodeProps) => ReactNode
  // 其他数据
  [index: string]: any
}

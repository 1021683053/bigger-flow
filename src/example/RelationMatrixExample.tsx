import { Tooltip } from 'antd'
import { RelationMatrix, type RelationMatrixNode, type RelationMatrixEdge } from '../components'

const nodes: RelationMatrixNode[] = [
  {
    id: '1',
    data: { label: 'Sample 1' },
    type: 'sample',
  },
  {
    id: '2',
    data: { label: 'Sample 2' },
    type: 'sample',
  },
  {
    id: '3',
    data: { 
      label: '本项目/系统',
      style: { 
        background: "linear-gradient(rgb(20 134 247), rgb(133 190 246))",
        justifyContent: 'center', 
        color: '#FFF',
        fontSize: 20
      },
      render: (element, node) => {
        console.log(element, node)
        return (
          <Tooltip title={node.data.label as string}>
            {element}
          </Tooltip>
        )
      },
      extraRender: (element, node) => {
        return (
          <>
            <div className='example-center-node-before'></div>
            <div className='example-center-node-after'></div>
          </>
        )
      }
    },
    type: 'sample',
    width: 240,
    height: 120,
    
  },
  {
    id: '4',
    data: { 
      label: 'Node 4',
      marker: {
        label: '状态',
      }
    },
    type: 'sample',
  },
  {
    id: '5',
    data: { label: 'Node 5' },
    type: 'sample',
  },
  {
    id: '6',
    data: { 
      label: 'Node 6',
      marker: {
        label: '状态',
        type: 'line',
        color: '#52c41a'
      }
    },
    type: 'sample',
  },
  {
    id: '7',
    data: { 
      label: 'Node 7',
      marker: {
        label: '状态',
        type: 'line',
        color: '#52c41a'
      }
    },
    type: 'sample',
  },
  {
    id: '8',
    data: { label: 'Sample 8' },
    type: 'sample',
  },
  {
    id: '9',
    data: { label: 'Sample 9' },
    type: 'sample',
  },
]

const edges: RelationMatrixEdge[] = [
  {
    id: 'e1',
    source: '1',
    target: '3',
    type: 'smoothstep'
  },
  {
    id: 'e8',
    source: '8',
    target: '1',
    type: 'smoothstep'
  },
  {
    id: 'e9',
    source: '9',
    target: '1',
    type: 'smoothstep'
  },
  {
    id: 'e2',
    source: '2',
    target: '3',
    type: 'smoothstep'
  },
  {
    id: 'e3',
    source: '3',
    target: '4',
    type: 'smoothstep'
  },
  {
    id: 'e4',
    source: '3',
    target: '5',
    type: 'smoothstep'
  },
  {
    id: 'e5',
    source: '5',
    target: '6',
    type: 'smoothstep'
  },
  {
    id: 'e6',
    source: '5',
    target: '7',
    type: 'smoothstep'
  }
]

export const RelationMatrixExample = ()=>{
  return (
    <div className="example-container">
      <h2>Relation Matrix Example</h2>
      <div style={{ width: '100%', height: 400 }}>
        <RelationMatrix edges={edges} nodes={nodes} flowProps={{ fitView: true }} />
      </div>
    </div>
  )
}
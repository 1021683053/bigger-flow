import { useEffect, useState, type CSSProperties } from 'react'
import { flatMap } from 'lodash-es'
import { RelationMatrix, ReactFlowProvider, type RelationMatrixNode, type RelationMatrixEdge } from '../src'
import jsonData from './data/001-data.json'
const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}


const mockApi = async ()=>{
  await sleep(1000)
  return jsonData
}

// 数据转换, 这个类型需要自己替换成实际类型
const transformData = (data: typeof jsonData['data']): { nodes: RelationMatrixNode[], edges: RelationMatrixEdge[] } => {
  const nodes: RelationMatrixNode[] = []
  const edges: RelationMatrixEdge[] = []
  const { inputProjectList, outputModelList, modelTypeList } = data;

  // 模型列表（用于反查模型状态，如果不要可以删除）
  const modelList = flatMap(modelTypeList, model=> model.projectModelList)

  // 中心节点ID
  const centerId = 'center'

  // 箭头图片
  const arrowImage = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzU2OTIwOTU1NDE5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU3NTUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiI+PHBhdGggZD0iTTk5MiA1MTJsLTQ4MC00ODAgMCAyODgtNTEyIDAgMCAzODQgNTEyIDAgMCAyODh6IiBmaWxsPSIjRjk5OTQwIiBwLWlkPSI1NzU2Ij48L3BhdGg+PC9zdmc+';

  // 连接线的样式
  const edgeType = 'smoothstep'

  // Model 状态 Marker样式
  const modelMarkerMap: Record<string, { color: string, backgroundColor: string }> = {
    '已完成': {
      color: '#FFF',
      backgroundColor: '#00AB2B'
    },
    '未完成': {
      color: '#FFF',
      backgroundColor: '#929498'
    },
    '逾期': {
      color: '#FFF',
      backgroundColor: '#E14A50'
    },
    '预警': {
      color: '#FFF',
      backgroundColor: '#F77F0C'
    }
  }
  // Table 状态 Marker样式
  const tableMarkerMap: Record<string, { color: string, backgroundColor?: string }> = {
    '已归集': {
      color: '#00AB2B',
    },
    '未归集': {
      color: '#929498',
    },
    '逾期': {
      color: '#E14A50',
    },
    '临期预警': {
      color: '#F77F0C',
    }
  }

  const arrowStyle: CSSProperties = {
    position: 'absolute',
    display: 'block',
    width: '30px',
    height: '30px',
    backgroundSize: '30px',
    backgroundImage: `url(${arrowImage})`,
    maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0.2) 100%)',
    maskRepeat: 'no-repeat',
    maskSize: '100% 100%',
    zIndex: 9
  }

  // 中心节点
  const centerNode: RelationMatrixNode = {
    id: centerId,
    type: 'sample',
    width: 240,
    height: 120,
    data: {
      // 节点内容
      label: '本项目/系统',
      // 节点div自定义样式
      style: { 
        background: "linear-gradient(rgb(20 134 247), rgb(133 190 246))",
        justifyContent: 'center', 
        color: '#FFF',
        fontSize: 20
      },
      // 节点扩展样式
      extraRender: (element, node) => {
        return (
          <>
            <span style={{...arrowStyle, left: -38 }} />
            <span style={{...arrowStyle, right: -38 }} />
          </>
        )
      }
    }
  }
  nodes.push(centerNode); // 增加到节点列表

  // 循环input项目列表
  inputProjectList.forEach((project)=>{
    const { projectName, inputModelList } = project
    const projectId = `input-project-${projectName}`
    const projectNode:RelationMatrixNode = {
      id: projectId,
      type: 'sample',
      data: { label: projectName }
    }
    nodes.push(projectNode) // 增加到节点列表
    edges.push({ source: projectId, target: centerId, type: edgeType }) // 增加到连线列表

    // 循环 input 模型列表
    inputModelList.forEach((model)=>{
      const { modelId, modelName, tableList } = model
      const modelNode: RelationMatrixNode = {
        id: modelId,
        type: 'sample',
        data: { label: modelName }
      }
      nodes.push(modelNode) // 增加到节点列表
      edges.push({ source: modelId, target: projectId, type: edgeType }) // 增加到连线列表

      // 循环 input 表列表
      tableList.forEach((table)=>{
        const { id: tableId, tableName } = table
        const tableNode: RelationMatrixNode = {
          id: tableId,
          type: 'sample',
          data: { label: tableName }
        }
        nodes.push(tableNode) // 增加到节点列表
        edges.push({ source: tableId, target: modelId, type: edgeType }) // 增加到连线列表
      })
    })

    // 循环output模型列表
    outputModelList.forEach((model)=>{
      const { modelId, modelName, tableList } = model
      
      // 根据 modelId 反查模型状态
      const modelInfo = modelList.find(model=> model.id === modelId)
      const marker = modelInfo && modelInfo.modelStatusName ? {
        label: modelInfo.modelStatusName,
        ...(modelMarkerMap[modelInfo.modelStatusName] || {}),
      } : undefined
      const modelNode: RelationMatrixNode = {
        id: modelId,
        type: 'sample',
        data: { 
          label: modelName,
          marker
        }
      }
      nodes.push(modelNode) // 增加到节点列表
      edges.push({ source: centerId, target: modelId, type: edgeType }) // 增加到连线列表

      // 循环 output 表列表
      tableList.forEach((table)=>{
        const { id: tableId, tableName, tableStatusName } = table
        const marker = tableStatusName ? {
          label: tableStatusName,
          backgroundColor: 'transparent',
          ...(tableMarkerMap[tableStatusName] || {}),
        } : undefined

        const tableNode: RelationMatrixNode = {
          id: tableId,
          type: 'sample',
          data: { 
            label: tableName,
            marker
          }
        }
        nodes.push(tableNode) // 增加到节点列表
        edges.push({ source: modelId, target: tableId, type: edgeType }) // 增加到连线列表
      })
    })
  })

  // 这里进行数据转换
  return {
    nodes,
    edges
  }
}

export const Example001 = ()=>{

  const [ elements, setElements ] = useState<{ nodes: RelationMatrixNode[], edges: RelationMatrixEdge[] }>({
    nodes: [],
    edges: []
  })

  useEffect(()=>{
    mockApi().then((response)=>{
      const { data } = response
      console.log('data', data)
      const elements = transformData(data)
      setElements(elements)
    })
  }, [])

  return (
    <div className="example-001-container">
      <h2>Relation Matrix Example</h2>
      <div style={{ width: '100%', flex: 1}} className='example-001'>
        <ReactFlowProvider>
          <RelationMatrix edges={elements.edges} nodes={elements.nodes} flowProps={{ fitView: true }} layout='dagre' />
        </ReactFlowProvider>
      </div>
    </div>
  )
}
import { createElement } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { NodesExample } from './NodesExample'
import { RelationMatrixExample } from './RelationMatrixExample'

const examples = [
  { path: '/nodes', component: NodesExample },
  { path: '/relation-matrix', component: RelationMatrixExample },
]

const Home = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>Examples</h1>
      {examples.map(({ path }) => {
        return (
          <p>
            <Link to={path}>{path}</Link>
          </p>
        )
      })}
    </div>
  )
}

export const Example = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {examples.map(({ path, component }) => {
        return <Route key={path} path={path} element={createElement(component)} />
      })}
    </Routes>
  )
}

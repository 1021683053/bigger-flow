import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Example } from './Example'
import './global.less';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <Example />
    </BrowserRouter>
  // </StrictMode>,
)

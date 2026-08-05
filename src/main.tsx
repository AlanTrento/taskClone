import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'
import { AppRouter } from './app/router/AppRouter'
import { RepositoryFactory as AuthRF } from './modules/auth/infrastructure/factories/RepositoryFactory'
import { RepositoryFactory as TaskRF } from './modules/task/infrastructure/factories/RepositoryFactory'
import './index.css'

AuthRF.configure('api');
TaskRF.configure('api');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ptBR}>
        <AppRouter />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Página Principal</div>} />
        <Route path="/tasks" element={<div>Tarefas</div>} />
        <Route path="/tasks/starred" element={<div>Tarefas com Estrela</div>} />
        <Route path="/lists/:listId" element={<div>Lista</div>} />
        <Route path="*" element={<div>404 - Não Encontrado</div>} />
      </Routes>
    </BrowserRouter>
  );
}

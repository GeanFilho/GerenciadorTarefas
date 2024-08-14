import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cadastro from './Cadastro';
import Login from './pages/login';
import Register from './pages/register';
import './App.css';

function App() {
  // Estado para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);
  // Estado para armazenar a tarefa que está sendo editada
  const [editingTask, setEditingTask] = useState(null);
  // Estado para controlar a exibição da lista de tarefas ou do formulário de cadastro
  const [showTasks, setShowTasks] = useState(true);
  // Estado para verificar se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função para adicionar ou atualizar uma tarefa
  const handleAddTask = (task) => {
    if (editingTask) {
      // Atualiza a tarefa existente se estiver em modo de edição
      const updatedTasks = tasks.map(t => (t.id === editingTask.id ? task : t));
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Adiciona uma nova tarefa
      setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    }
    setShowTasks(true); // Volta para a exibição da lista de tarefas
  };

  // Função para remover uma tarefa pelo ID
  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Função para agrupar tarefas por mês e ano
  const groupTasksByMonth = (tasks) => {
    const groupedTasks = {};
    tasks.forEach((task) => {
      const taskDate = new Date(task.dueDate);
      const monthYear = taskDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groupedTasks[monthYear]) groupedTasks[monthYear] = [];
      groupedTasks[monthYear].push(task);
    });
    return groupedTasks;
  };

  // Ordena as tarefas pela data de vencimento
  const sortedTasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  // Agrupa as tarefas por mês e ano
  const groupedTasks = groupTasksByMonth(sortedTasks);

  // Função para simular o login do usuário
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Função para simular o logout do usuário
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/* Rota para a página inicial */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/tasks" /> : <Login onLogin={handleLogin} />}
        />
        {/* Rota para a lista de tarefas e formulário de cadastro */}
        <Route
          path="/tasks"
          element={
            isLoggedIn ? (
              <div className="container">
                {showTasks ? (
                  <>
                    <h1>Lista de Tarefas</h1>
                    {Object.keys(groupedTasks).map((monthYear, index) => (
                      <div key={index} className="task-group">
                        <h2>{monthYear}</h2>
                        <ul>
                          {groupedTasks[monthYear].map((task) => (
                            <li key={task.id}>
                              <h3>{task.title}</h3>
                              <p>{task.description}</p>
                              <p>Vencimento: {new Date(task.dueDate).toLocaleDateString()}</p>
                              <div className="task-buttons">
                                <button className="button" onClick={() => {
                                  setEditingTask(task);
                                  setShowTasks(false);
                                }}>Editar</button>
                                <button className="button" onClick={() => handleRemoveTask(task.id)}>Remover</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <button className="button" onClick={() => setShowTasks(false)}>Adicionar Nova Tarefa</button>
                  </>
                ) : (
                  <>
                    <h1>Gerenciador de Tarefas</h1>
                    <Cadastro onAddTask={handleAddTask} editingTask={editingTask} />
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                  </>
                )}
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Rota para registro de usuário */}
        <Route path="/register" element={<Register />} />
        {/* Rota para login do usuário */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;

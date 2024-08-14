import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../config/firebase'; // Importa a instância do Firestore configurada
import Cadastro from '../Cadastro'; // Importa o componente Cadastro

const Tasks = () => {
  // Estado para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);
  // Estado para armazenar a tarefa que está sendo editada
  const [editingTask, setEditingTask] = useState(null);

  // Função para buscar as tarefas do Firestore
  const fetchTasks = async () => {
    try {
      // Obtém os documentos da coleção "tasks"
      const querySnapshot = await getDocs(collection(db, "tasks"));
      // Mapeia os documentos para um array de tarefas
      const tasksArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Atualiza o estado com as tarefas obtidas
      setTasks(tasksArray);
    } catch (error) {
      // Exibe erro no console em caso de falha
      console.error("Erro ao buscar tarefas:", error.message);
    }
  };

  // Função para adicionar ou atualizar uma tarefa
  const handleAddTask = (task) => {
    console.log("Adicionando ou atualizando tarefa:", task);

    // Atualiza a lista de tarefas substituindo a tarefa existente ou adicionando uma nova
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? task : t
    );

    if (!tasks.find(t => t.id === task.id)) {
      updatedTasks.push(task); // Adiciona uma nova tarefa
    }
    setTasks(updatedTasks);
    setEditingTask(null); // Limpa o estado de edição
  };

  // Função para definir a tarefa atual como a que está sendo editada
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Função para remover uma tarefa
  const handleRemoveTask = async (id) => {
    try {
      // Remove o documento da coleção "tasks" no Firestore
      await deleteDoc(doc(db, "tasks", id));
      // Atualiza o estado removendo a tarefa da lista
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      // Exibe erro no console em caso de falha
      console.error("Erro ao remover tarefa:", error.message);
    }
  };

  // UseEffect para buscar tarefas quando o componente é montado
  useEffect(() => {
    fetchTasks();
  }, []); // Dependência vazia significa que o efeito é executado apenas uma vez

  return (
    <div className="tasks-container">
      <h2>Lista de Tarefas</h2>
      {/* Renderiza o componente Cadastro passando as funções de manipulação de tarefas */}
      <Cadastro onAddTask={handleAddTask} editingTask={editingTask} />
      <ul>
        {/* Mapeia e renderiza a lista de tarefas */}
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Vencimento: {new Date(task.dueDate).toLocaleDateString()}</p>
            {/* Botão para iniciar a edição da tarefa */}
            <button onClick={() => handleEditTask(task)}>Editar</button>
            {/* Botão para remover a tarefa */}
            <button onClick={() => handleRemoveTask(task.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
